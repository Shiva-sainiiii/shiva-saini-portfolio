const S = ({ size = 22, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);
export const Video = (p) => <S {...p}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></S>;
export const Phone = (p) => <S {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></S>;
export const Dots = (p) => <S {...p}><circle cx="12" cy="5" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="19" r="1.4" fill="currentColor" /></S>;
export const Back = (p) => <S {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></S>;
export const Smile = (p) => <S {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></S>;
export const Clip = (p) => <S {...p}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></S>;
export const Camera = (p) => <S {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></S>;
export const Mic = (p) => <S {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /></S>;
export const Send = (p) => <S {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></S>;
export const Mail = (p) => <S {...p}><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><polyline points="22 6 12 13 2 6" /></S>;
export const Pin = (p) => <S {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></S>;
export const Ticks = (p) => <S {...p} strokeWidth="2.4"><polyline points="1 13 5 17 13 7" /><polyline points="9 15 11 17 19 7" /></S>;
// Gear ke andar infinity (EasyDevOps heading ke saath)
export const GearInfinity = (p) => (
  <S {...p} strokeWidth="1.7">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <path strokeWidth="1.5" d="M12 12c1.2-1.7 2.2-2.4 3.2-2.4 1.4 0 2.4 1 2.4 2.4s-1 2.4-2.4 2.4c-1 0-2-.7-3.2-2.4-1.2-1.7-2.2-2.4-3.2-2.4-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4c1 0 2-.7 3.2-2.4z" />
  </S>
);
// Brand icons (asli colours)
const B = ({ size = 20, children, ...p }) => (<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>{children}</svg>);
export const LinkedIn = (p) => <B {...p}><rect width="24" height="24" rx="4.5" fill="#0A66C2" /><path fill="#fff" d="M6.94 9.5H4.1V19h2.84V9.5zM5.52 5a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3zM19.9 13.6c0-2.6-1.4-4.3-3.6-4.3-1.2 0-2.1.6-2.5 1.3V9.5H11V19h2.8v-5c0-1.3.6-2.2 1.8-2.2 1.1 0 1.5.8 1.5 2.2V19h2.8v-5.4z" /></B>;
export const GitHub = (p) => <B {...p}><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#181717" d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.46v-1.7c-2.65.58-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.58.07-.58.96.07 1.47 1 1.47 1 .85 1.46 2.24 1.04 2.78.8.09-.62.33-1.04.6-1.28-2.1-.24-4.34-1.05-4.34-4.7 0-1.04.37-1.9.98-2.56-.1-.24-.43-1.2.1-2.54 0 0 .8-.26 2.6.98a9 9 0 0 1 4.74 0c1.8-1.24 2.6-.98 2.6-.98.52 1.34.2 2.3.1 2.54.6.66.98 1.52.98 2.56 0 3.66-2.25 4.46-4.35 4.7.34.3.65.88.65 1.77v2.62c0 .26.16.56.66.46A9.5 9.5 0 0 0 12 2.5z" /></B>;
export const WhatsApp = (p) => <B {...p}><circle cx="12" cy="12" r="12" fill="#25D366" /><path fill="#fff" d="M17.5 14.4c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.12-1.03-.38-1.96-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.25-.02-.38.1-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.52c.12.16 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.5.58.18 1.1.16 1.52.1.46-.07 1.45-.6 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28zM12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5z" /></B>;
export const Instagram = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <defs><linearGradient id="igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FEDA75" /><stop offset=".3" stopColor="#FA7E1E" /><stop offset=".55" stopColor="#D62976" /><stop offset=".8" stopColor="#962FBF" /><stop offset="1" stopColor="#4F5BD5" /></linearGradient></defs>
    <rect width="24" height="24" rx="6.5" fill="url(#igg)" />
    <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="16.4" cy="7.6" r="1.1" fill="#fff" />
  </svg>
);
export const Google = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="#4285F4" d="M23 12.27c0-.8-.07-1.56-.2-2.3H12v4.35h6.17a5.28 5.28 0 0 1-2.29 3.47v2.88h3.7C21.74 18.7 23 15.7 23 12.27z" />
    <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1.03 7.6-2.8l-3.7-2.88c-1.03.7-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.74v2.97A11.5 11.5 0 0 0 12 23.5z" />
    <path fill="#FBBC05" d="M5.55 14.18a6.9 6.9 0 0 1 0-4.36V6.85H1.74a11.5 11.5 0 0 0 0 10.3l3.81-2.97z" />
    <path fill="#EA4335" d="M12 5.08c1.69 0 3.2.58 4.4 1.72l3.3-3.3C17.7 1.64 15.1.5 12 .5A11.5 11.5 0 0 0 1.74 6.85l3.81 2.97C6.46 7.1 9 5.08 12 5.08z" />
  </svg>
);
export const WebsiteIcon = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <rect x="1.5" y="3.5" width="21" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M1.5 8.5h21" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="5" cy="6" r=".9" fill="currentColor" /><circle cx="8" cy="6" r=".9" fill="currentColor" />
    <path d="m10 13-2.2 2.2L10 17.4M14 13l2.2 2.2L14 17.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
