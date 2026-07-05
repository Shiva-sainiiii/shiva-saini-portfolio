/* ============================================================
   admin.js — Portfolio Admin Panel
   Handles: Supabase auth, dynamic content rendering,
   add/edit/delete for projects, certificates, skills,
   and Cloudinary image uploads.

   Requires config.js to be loaded BEFORE this file.
   Requires Supabase JS client (loaded via CDN in index.html).
   ============================================================ */

(function () {
  const CFG = window.PORTFOLIO_CONFIG;
  if (!CFG || CFG.SUPABASE_URL.includes("PASTE_")) {
    console.warn("Portfolio admin: config.js not filled in yet.");
    return;
  }

  const supabase = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
  let currentSession = null;

  /* ---------- Utility: toast (reuses existing #toast element) ---------- */
  function toast(msg) {
    if (typeof window.showToast === "function") {
      window.showToast(msg);
      return;
    }
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ============================================================
     AUTH
     ============================================================ */

  async function initAuth() {
    const { data } = await supabase.auth.getSession();
    currentSession = data.session;
    updateAdminUI();

    supabase.auth.onAuthStateChange((_event, session) => {
      currentSession = session;
      updateAdminUI();
    });
  }

  function isLoggedIn() {
    return !!currentSession && currentSession.user?.email === CFG.ADMIN_EMAIL;
  }

  function updateAdminUI() {
    const fab = document.getElementById("admin-fab");
    if (!fab) return;
    fab.classList.toggle("admin-fab-active", isLoggedIn());
    fab.setAttribute("aria-label", isLoggedIn() ? "Open admin panel" : "Admin login");
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast("Login failed: " + error.message);
      return false;
    }
    if (data.user.email !== CFG.ADMIN_EMAIL) {
      await supabase.auth.signOut();
      toast("This account is not authorized.");
      return false;
    }
    toast("Logged in ✓");
    return true;
  }

  async function logout() {
    await supabase.auth.signOut();
    toast("Logged out");
    closeAdminPanel();
  }

  /* ============================================================
     CLOUDINARY UPLOAD (unsigned)
     ============================================================ */

  async function uploadToCloudinary(file, onProgress) {
    const url = `https://api.cloudinary.com/v1_1/${CFG.CLOUDINARY_CLOUD_NAME}/auto/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CFG.CLOUDINARY_UPLOAD_PRESET);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) resolve(res.secure_url);
          else reject(new Error(res.error?.message || "Upload failed"));
        } catch (err) {
          reject(err);
        }
      };
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(formData);
    });
  }

  /* ============================================================
     DATA FETCHING + RENDERING
     ============================================================ */

  async function fetchAll() {
    const [projects, certs, skills] = await Promise.all([
      supabase.from("portfolio_projects").select("*").order("sort_order"),
      supabase.from("portfolio_certificates").select("*").order("sort_order"),
      supabase.from("portfolio_skills").select("*").order("sort_order"),
    ]);
    return {
      projects: projects.data || [],
      certificates: certs.data || [],
      skills: skills.data || [],
    };
  }

  function renderProjects(projects) {
    const container = document.querySelector(".project-container");
    if (!container) return;
    container.innerHTML = projects.map(p => `
      <article class="project-card" data-id="${p.id}">
        <div class="project-img-wrap">
          <img src="${p.image_url || ''}" alt="${escapeHtml(p.title)}" loading="lazy"
            onerror="this.parentElement.classList.add('img-fallback')" />
          <div class="project-img-placeholder"><span>💻</span></div>
        </div>
        <div class="project-info">
          <div class="project-top">
            <h3>${escapeHtml(p.title)}</h3>
            <div class="project-badge">${escapeHtml(p.badge || 'Web')}</div>
          </div>
          <p>${escapeHtml(p.description)}</p>
          <div class="project-tech">
            ${(p.tech_tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="project-buttons">
            ${p.live_url ? `<a href="${p.live_url}" target="_blank" class="btn-proj">🔗 Live Demo</a>` : ''}
            ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="btn-proj btn-proj-ghost">⌥ GitHub</a>` : ''}
          </div>
          <div class="admin-card-controls" data-admin-only>
            <button class="admin-edit-btn" onclick="PortfolioAdmin.editProject('${p.id}')">✎ Edit</button>
            <button class="admin-delete-btn" onclick="PortfolioAdmin.deleteItem('portfolio_projects','${p.id}','project')">🗑</button>
          </div>
        </div>
      </article>
    `).join('');
    refreshAdminVisibility();
  }

  function renderCertificates(certs) {
    const container = document.querySelector(".cert-grid");
    if (!container) return;
    container.innerHTML = certs.map(c => `
      <div class="certificate-card" data-id="${c.id}" onclick="openImg(this)" role="button" tabindex="0" aria-label="View ${escapeHtml(c.label)}">
        <img src="${c.image_url}" alt="${escapeHtml(c.label)}" loading="lazy"
          onerror="this.src=''; this.parentElement.classList.add('cert-fallback')" />
        <div class="cert-label">${escapeHtml(c.label)}</div>
        <div class="admin-card-controls" data-admin-only onclick="event.stopPropagation()">
          <button class="admin-edit-btn" onclick="PortfolioAdmin.editCertificate('${c.id}')">✎ Edit</button>
          <button class="admin-delete-btn" onclick="PortfolioAdmin.deleteItem('portfolio_certificates','${c.id}','certificate')">🗑</button>
        </div>
      </div>
    `).join('');
    refreshAdminVisibility();
  }

  function renderSkills(skills) {
    const wrapper = document.querySelector(".skills-wrapper");
    if (!wrapper) return;
    const groups = {};
    skills.forEach(s => {
      if (!groups[s.group_name]) groups[s.group_name] = { icon: s.group_icon, tags: [] };
      groups[s.group_name].tags.push(s);
    });
    wrapper.innerHTML = Object.entries(groups).map(([name, g]) => `
      <div class="skill-group">
        <div class="skill-group-header">
          <span class="skill-group-icon">${g.icon || '⚙️'}</span>
          <h3>${escapeHtml(name)}</h3>
        </div>
        <div class="skill-tags">
          ${g.tags.map(t => `
            <span class="skill-tag" data-id="${t.id}">
              ${escapeHtml(t.tag)}
              <button class="admin-tag-delete" data-admin-only onclick="PortfolioAdmin.deleteItem('portfolio_skills','${t.id}','skill')">✕</button>
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
    refreshAdminVisibility();
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function refreshAdminVisibility() {
    document.querySelectorAll('[data-admin-only]').forEach(el => {
      el.style.display = isLoggedIn() ? '' : 'none';
    });
  }

  async function refreshData() {
    const data = await fetchAll();
    renderProjects(data.projects);
    renderCertificates(data.certificates);
    renderSkills(data.skills);
  }

  /* ============================================================
     ADMIN PANEL UI (modal-based forms)
     ============================================================ */

  function openLoginModal() {
    if (isLoggedIn()) {
      openAdminPanel();
      return;
    }
    const modal = buildModal('login-modal', `
      <h3>Admin Login</h3>
      <form id="admin-login-form">
        <input type="email" id="admin-email" placeholder="Email" required autocomplete="username" />
        <input type="password" id="admin-password" placeholder="Password" required autocomplete="current-password" />
        <button type="submit" class="btn">Log In</button>
      </form>
    `);
    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;
      const ok = await login(email, password);
      if (ok) {
        closeModal(modal);
        openAdminPanel();
      }
    });
  }

  function openAdminPanel() {
    const modal = buildModal('admin-panel-modal', `
      <div class="admin-panel-header">
        <h3>Manage Portfolio</h3>
        <button class="admin-logout-btn" id="admin-logout-btn">Log Out</button>
      </div>
      <div class="admin-tabs">
        <button class="admin-tab active" data-tab="projects">Projects</button>
        <button class="admin-tab" data-tab="certificates">Certificates</button>
        <button class="admin-tab" data-tab="skills">Skills</button>
      </div>
      <div class="admin-tab-content" id="admin-tab-content"></div>
    `, 'admin-panel-large');

    document.getElementById('admin-logout-btn').onclick = logout;
    modal.querySelectorAll('.admin-tab').forEach(btn => {
      btn.onclick = () => {
        modal.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTabContent(btn.dataset.tab);
      };
    });
    renderTabContent('projects');
  }

  function closeAdminPanel() {
    const m = document.getElementById('admin-panel-modal');
    if (m) closeModal(m);
  }

  function renderTabContent(tab) {
    const el = document.getElementById('admin-tab-content');
    if (tab === 'projects') el.innerHTML = projectFormHtml();
    if (tab === 'certificates') el.innerHTML = certificateFormHtml();
    if (tab === 'skills') el.innerHTML = skillFormHtml();
    attachFormHandlers(tab);
  }

  function projectFormHtml(existing = {}) {
    return `
      <form id="project-form" class="admin-form">
        <input type="hidden" id="pf-id" value="${existing.id || ''}" />
        <input type="text" id="pf-title" placeholder="Project title" value="${existing.title || ''}" required />
        <textarea id="pf-desc" placeholder="Description" rows="3" required>${existing.description || ''}</textarea>
        <input type="text" id="pf-badge" placeholder="Badge (AI / Web / Game)" value="${existing.badge || 'Web'}" />
        <input type="text" id="pf-tech" placeholder="Tech tags, comma separated" value="${(existing.tech_tags || []).join(', ')}" />
        <input type="url" id="pf-live" placeholder="Live demo URL" value="${existing.live_url || ''}" />
        <input type="url" id="pf-github" placeholder="GitHub URL" value="${existing.github_url || ''}" />
        <label class="admin-file-label">
          Project image <input type="file" id="pf-image" accept="image/*" />
        </label>
        <div class="admin-upload-progress" id="pf-progress" style="display:none;"></div>
        <button type="submit" class="btn">${existing.id ? 'Update' : 'Add'} Project</button>
      </form>
    `;
  }

  function certificateFormHtml(existing = {}) {
    return `
      <form id="cert-form" class="admin-form">
        <input type="hidden" id="cf-id" value="${existing.id || ''}" />
        <input type="text" id="cf-label" placeholder="Certificate label" value="${existing.label || ''}" required />
        <label class="admin-file-label">
          Certificate image <input type="file" id="cf-image" accept="image/*" ${existing.id ? '' : 'required'} />
        </label>
        <div class="admin-upload-progress" id="cf-progress" style="display:none;"></div>
        <button type="submit" class="btn">${existing.id ? 'Update' : 'Add'} Certificate</button>
      </form>
    `;
  }

  function skillFormHtml() {
    return `
      <form id="skill-form" class="admin-form">
        <input type="text" id="sf-group" placeholder="Group (e.g. Frontend)" required />
        <input type="text" id="sf-icon" placeholder="Group icon emoji (e.g. 🎨)" value="⚙️" />
        <input type="text" id="sf-tag" placeholder="Skill name (e.g. React)" required />
        <button type="submit" class="btn">Add Skill</button>
      </form>
      <p class="admin-hint">Tip: use the same group name to add multiple skills under one group. Click ✕ on any tag (in the main Skills section) to remove it.</p>
    `;
  }

  function attachFormHandlers(tab) {
    if (tab === 'projects') {
      document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
    }
    if (tab === 'certificates') {
      document.getElementById('cert-form').addEventListener('submit', handleCertSubmit);
    }
    if (tab === 'skills') {
      document.getElementById('skill-form').addEventListener('submit', handleSkillSubmit);
    }
  }

  async function handleProjectSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('pf-id').value;
    const fileInput = document.getElementById('pf-image');
    const progressEl = document.getElementById('pf-progress');

    let image_url = undefined;
    if (fileInput.files[0]) {
      progressEl.style.display = 'block';
      progressEl.textContent = 'Uploading image... 0%';
      try {
        image_url = await uploadToCloudinary(fileInput.files[0], (pct) => {
          progressEl.textContent = `Uploading image... ${pct}%`;
        });
      } catch (err) {
        toast('Image upload failed: ' + err.message);
        progressEl.style.display = 'none';
        return;
      }
      progressEl.style.display = 'none';
    }

    const payload = {
      title: document.getElementById('pf-title').value.trim(),
      description: document.getElementById('pf-desc').value.trim(),
      badge: document.getElementById('pf-badge').value.trim() || 'Web',
      tech_tags: document.getElementById('pf-tech').value.split(',').map(s => s.trim()).filter(Boolean),
      live_url: document.getElementById('pf-live').value.trim() || null,
      github_url: document.getElementById('pf-github').value.trim() || null,
    };
    if (image_url) payload.image_url = image_url;

    const query = id
      ? supabase.from('portfolio_projects').update(payload).eq('id', id)
      : supabase.from('portfolio_projects').insert(payload);

    const { error } = await query;
    if (error) { toast('Save failed: ' + error.message); return; }
    toast(id ? 'Project updated ✓' : 'Project added ✓');
    e.target.reset();
    document.getElementById('pf-id').value = '';
    await refreshData();
  }

  async function handleCertSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('cf-id').value;
    const fileInput = document.getElementById('cf-image');
    const progressEl = document.getElementById('cf-progress');

    let image_url = undefined;
    if (fileInput.files[0]) {
      progressEl.style.display = 'block';
      progressEl.textContent = 'Uploading image... 0%';
      try {
        image_url = await uploadToCloudinary(fileInput.files[0], (pct) => {
          progressEl.textContent = `Uploading image... ${pct}%`;
        });
      } catch (err) {
        toast('Image upload failed: ' + err.message);
        progressEl.style.display = 'none';
        return;
      }
      progressEl.style.display = 'none';
    }

    const payload = { label: document.getElementById('cf-label').value.trim() };
    if (image_url) payload.image_url = image_url;

    const query = id
      ? supabase.from('portfolio_certificates').update(payload).eq('id', id)
      : supabase.from('portfolio_certificates').insert(payload);

    const { error } = await query;
    if (error) { toast('Save failed: ' + error.message); return; }
    toast(id ? 'Certificate updated ✓' : 'Certificate added ✓');
    e.target.reset();
    await refreshData();
  }

  async function handleSkillSubmit(e) {
    e.preventDefault();
    const payload = {
      group_name: document.getElementById('sf-group').value.trim(),
      group_icon: document.getElementById('sf-icon').value.trim() || '⚙️',
      tag: document.getElementById('sf-tag').value.trim(),
    };
    const { error } = await supabase.from('portfolio_skills').insert(payload);
    if (error) { toast('Save failed: ' + error.message); return; }
    toast('Skill added ✓');
    e.target.reset();
    document.getElementById('sf-icon').value = '⚙️';
    await refreshData();
  }

  async function editProject(id) {
    const { data } = await supabase.from('portfolio_projects').select('*').eq('id', id).single();
    if (!data) return;
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === 'projects'));
    document.getElementById('admin-tab-content').innerHTML = projectFormHtml(data);
    attachFormHandlers('projects');
    document.getElementById('admin-panel-modal').scrollIntoView({ behavior: 'smooth' });
  }

  async function editCertificate(id) {
    const { data } = await supabase.from('portfolio_certificates').select('*').eq('id', id).single();
    if (!data) return;
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === 'certificates'));
    document.getElementById('admin-tab-content').innerHTML = certificateFormHtml(data);
    attachFormHandlers('certificates');
  }

  async function deleteItem(table, id, label) {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { toast('Delete failed: ' + error.message); return; }
    toast(`${label[0].toUpperCase() + label.slice(1)} deleted`);
    await refreshData();
  }

  /* ============================================================
     MODAL HELPERS
     ============================================================ */

  function buildModal(id, innerHtml, extraClass = '') {
    let modal = document.getElementById(id);
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = id;
    modal.className = `admin-modal-overlay ${extraClass}`;
    modal.innerHTML = `<div class="admin-modal-box glass">
      <button class="admin-modal-close" aria-label="Close">✕</button>
      ${innerHtml}
    </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.admin-modal-close').onclick = () => closeModal(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
    requestAnimationFrame(() => modal.classList.add('show'));
    return modal;
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 250);
  }

  /* ============================================================
     INIT
     ============================================================ */

  function createFab() {
    if (document.getElementById('admin-fab')) return;
    const fab = document.createElement('button');
    fab.id = 'admin-fab';
    fab.className = 'admin-fab';
    fab.setAttribute('aria-label', 'Admin login');
    fab.innerHTML = '+';
    fab.onclick = openLoginModal;
    document.body.appendChild(fab);
  }

  window.PortfolioAdmin = { editProject, editCertificate, deleteItem };

  document.addEventListener('DOMContentLoaded', async () => {
    createFab();
    await initAuth();
    await refreshData();
  });
})();
