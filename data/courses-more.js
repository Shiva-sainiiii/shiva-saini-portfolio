// AI aur Local Business courses. Prompt blocks ke liye lang "prompt" use hota hai (copy button ke saath).
const J = (s) => s.replaceAll("§", "`").replaceAll("¤{", "${");

export const moreCourses = [
  {
    slug: "ai-basics", title: "Generative AI and Prompting Basics", short: "AI & Prompting", level: "Beginner", cat: "AI", featured: true, updated: "2026-11-20",
    desc: "Understand how generative AI works, write prompts that get useful answers, use AI safely, apply it to a small business and learn how an AI tool is built.",
    intro: "AI assistants are now part of everyday study and work, but most people use them badly. This course explains how they really work, gives you a simple formula for strong prompts, shows how to check answers and stay safe, and ends with how a small AI tool is built. No coding is needed until the last chapter.",
    outcomes: ["Explain what generative AI and a language model are", "Write clear prompts with role, task, context and format", "Use examples, constraints and step-by-step requests", "Spot hallucinations and verify AI answers", "Protect private data and avoid common risks", "Use AI to save time in a small business", "Understand the parts of an AI-powered app"],
    faq: [
      ["Do I need to know coding to learn prompting?", "No. Chapters one to five need no coding at all. The last chapter shows how an AI tool is built, for people who want to go further."],
      ["Can AI replace my skills?", "AI is a powerful assistant, but you still decide what is true, what is good and what is appropriate. People who understand their subject and use AI well get the best results."],
      ["Is it safe to paste my documents into an AI chat?", "Not always. Do not paste passwords, API keys, private customer data or confidential documents unless you know the tool’s privacy rules. Chapter four covers this in detail."],
    ],
    chapters: [
      {
        slug: "what-is-generative-ai", title: "What Is Generative AI?", mins: 9,
        summary: "Learn what generative AI and large language models are, what they do well and where they fail.",
        body: [
          ["p", "Generative AI creates new content, such as text, images, audio, video or code, based on patterns it learned from huge amounts of examples."],
          ["h", "Large language models (LLMs)"],
          ["p", "A chat assistant is powered by a large language model. At its core, it predicts the next small piece of text, called a token, again and again until a full answer appears. A token is often a word or part of a word."],
          ["ul", ["Training: the model reads enormous amounts of text and learns patterns of language and knowledge.", "Using it: you give a prompt and it generates a reply token by token.", "Context window: the limit on how much text (your messages plus its replies) the model can consider at once.", "Because it predicts likely text, it can sound confident even when it is wrong."]],
          ["h", "Where it helps and where to be careful"],
          ["table", ["Strong at", "Be careful with"], [["Drafting, rewriting and summarising text", "Exact facts, figures, dates and quotes"], ["Explaining ideas at your level", "Recent events unless it can search the web"], ["Brainstorming options", "Maths and logic without checking the steps"], ["Translating and changing tone", "Medical, legal and financial decisions"], ["Explaining and drafting code", "Anything you cannot verify yourself"]]],
          ["h", "Hallucination"],
          ["p", "When a model states something false in a fluent way, it is called a hallucination. It can invent facts, book titles, links and even quotes. This is the single most important limit to remember."],
          ["note", "Think of AI as a fast, well-read assistant who is sometimes confidently wrong. You are the editor."],
          ["task", "Ask an assistant a question about something you know very well and check every claim in its answer."],
        ],
        quiz: [
          ["What does a language model basically do?", ["Predicts the next piece of text", "Searches your computer", "Stores your passwords", "Runs a calculator only"], 0, "It generates text by predicting likely next tokens."],
          ["What is a hallucination?", ["A fluent but false statement", "A slow reply", "A picture", "A password"], 0, "The model states something untrue as if it were fact."],
          ["Which task suits AI best?", ["Drafting and rewriting text", "Making final legal decisions", "Giving exact medical dosing", "Being the only source of facts"], 0, "Drafting and rewriting are strong use cases, and decisions need verification."],
        ],
      },
      {
        slug: "prompting-basics", title: "Prompting Basics: Get Better Answers", mins: 11,
        summary: "Use a simple four-part formula, role, task, context and format, to write prompts that work.",
        body: [
          ["p", "A prompt is the instruction you give an AI. Vague prompts give vague answers. The more clearly you describe what you want, the better the result."],
          ["h", "The formula: Role, Task, Context, Format"],
          ["table", ["Part", "Question it answers", "Example"], [["Role", "Who should the AI act as?", "You are an experienced dentist’s receptionist"], ["Task", "What exactly should it do?", "Write a reply to this patient message"], ["Context", "What does it need to know?", "The clinic opens 10 am to 7 pm, closed Sunday"], ["Format", "How should the answer look?", "Two short sentences, polite and clear"]]],
          ["h", "Weak prompt versus strong prompt"],
          ["code", "prompt", `Write about my gym.`],
          ["code", "prompt", `You are a friendly marketing assistant for a small gym in Sonipat.
Write an Instagram caption to announce our new 6 am batch.
Context: the gym is beginner friendly, the first trial class is free.
Format: under 40 words, 2 emojis, end with a call to action to message us on WhatsApp.`, { out: "Early birds, this one is for you! 🌅 Our new 6 am batch starts Monday. Beginner friendly, and your first trial class is free. 💪 Message us on WhatsApp to book your spot today!", outLabel: "Example reply (yours will vary)" }],
          ["h", "Habits that improve results"],
          ["ul", ["Say who the answer is for: “explain this to a class 8 student”.", "Give the details the AI cannot guess: names, numbers, tone, length.", "Ask for a format: bullets, a table, an email, a step-by-step plan.", "Iterate. If the first answer is not right, say exactly what to change."]],
          ["h", "Iterating"],
          ["code", "prompt", `Good start. Make it shorter, remove the second emoji and add the word “free” twice.`],
          ["task", "Pick something you wrote recently. Ask an assistant to improve it using all four parts of the formula."],
        ],
        quiz: [
          ["What do the four parts of the prompt formula stand for?", ["Role, Task, Context, Format", "Read, Think, Copy, Finish", "Rule, Time, Code, Fun", "Reply, Test, Check, Fix"], 0, "Role, Task, Context and Format."],
          ["Why is “Write about my gym” a weak prompt?", ["It gives no audience, goal or details", "It is too long", "It uses the word gym", "It has a role"], 0, "The AI has to guess everything."],
          ["What should you do if the first answer is not right?", ["Tell the AI exactly what to change", "Give up", "Repeat the same prompt only", "Paste your password"], 0, "Iterating with specific feedback works best."],
        ],
      },
      {
        slug: "advanced-prompting", title: "Advanced Prompting: Examples, Steps and Constraints", mins: 12,
        summary: "Use examples, step-by-step reasoning, clear limits and clarifying questions to get reliable results.",
        body: [
          ["h", "Show an example (few-shot)"],
          ["p", "The fastest way to get the style you want is to show one or two examples."],
          ["code", "prompt", `Rewrite product names into short, catchy labels.

Example:
Input: Stainless steel insulated water bottle 750 ml
Output: SteelSip 750

Now do this one:
Input: Waterproof laptop backpack with USB port`],
          ["h", "Ask for step-by-step thinking"],
          ["p", "For maths, plans and decisions, ask the AI to show its steps. You can check each step, and mistakes are easier to spot."],
          ["code", "prompt", `A shop sells a bag for ₹899.50 and gives 12% discount, then adds 18% GST on the discounted price.
Work this out step by step and show the final price. I will check your steps.`],
          ["h", "Set constraints"],
          ["ul", ["Length: “under 80 words”.", "Tone: “friendly, not pushy”.", "Reading level: “simple English for a beginner”.", "What to avoid: “do not invent prices or offers”.", "Source rule: “use only the text I give you below”."]],
          ["h", "Separate instructions from content"],
          ["p", "When you paste text, mark where it begins and ends so the AI does not mix it up with your instructions."],
          ["code", "prompt", `Summarise the customer review below in one sentence and say whether it is positive, neutral or negative.

"""
The food was good but we waited 40 minutes and nobody told us why.
"""`],
          ["h", "Let the AI ask you questions"],
          ["code", "prompt", `I want to plan a website for my cafe. Before you answer, ask me up to 5 questions you need to give a good plan. Ask them one at a time.`],
          ["h", "Critique and improve"],
          ["code", "prompt", `Here is my draft email. First list its three biggest weaknesses, then rewrite it to fix them.`],
          ["task", "Take a task you do often and write a reusable prompt template for it with placeholders like [NAME] and [TOPIC]."],
        ],
        quiz: [
          ["What is few-shot prompting?", ["Giving the AI a few examples", "Asking very short questions", "Using three prompts", "Turning off the AI"], 0, "Examples show the exact style you expect."],
          ["Why ask for step-by-step working?", ["So you can check each step", "To make it slower", "To avoid reading", "It is required"], 0, "Visible steps make mistakes easier to catch."],
          ["Why separate pasted text with markers like triple quotes?", ["So instructions and content do not get mixed up", "To make it longer", "To hide text", "No reason"], 0, "Clear boundaries reduce confusion."],
        ],
      },
      {
        slug: "using-ai-safely", title: "Using AI Safely and Checking Answers", mins: 11,
        summary: "Protect private data, verify facts, avoid common risks and know when a human must decide.",
        body: [
          ["h", "Protect private information"],
          ["ul", ["Never paste passwords, API keys, OTPs, bank details or ID numbers.", "Remove names, phone numbers and addresses of customers before pasting messages, or replace them with placeholders.", "Do not share confidential documents unless you know the tool’s privacy policy and settings.", "Assume anything you paste could be stored."]],
          ["h", "Verify before you trust"],
          ["ul", ["Check facts, dates, prices and numbers against a reliable source.", "If the AI gives a link or a quote, open it. AI can invent sources that look real.", "Ask for its reasoning or assumptions, then test them.", "For code, run it and test it before using it."]],
          ["code", "prompt", `List the claims in your answer that I should verify, and tell me which ones you are least sure about.`],
          ["h", "Know the other risks"],
          ["table", ["Risk", "What to do"], [["Bias", "AI reflects patterns in its training data. Read answers about people and groups critically."], ["Copyright and honesty", "Do not present AI work as fully yours where honesty matters, such as exams and assignments. Follow your college or employer’s rules."], ["Prompt injection", "Text from a web page or document can contain hidden instructions that try to control the AI. Be careful when AI reads untrusted content and can take actions."], ["Over-reliance", "Keep practising your own skills, or you will not notice when the AI is wrong."]]],
          ["h", "When a human must decide"],
          ["p", "For health, law, money and safety, use AI to understand and prepare questions, then ask a qualified professional. Never let AI make the final decision alone."],
          ["h", "A safe-use checklist"],
          ["ul", ["Did I remove private data?", "Did I verify the important facts?", "Is this decision safe to leave to an assistant?", "Am I following the rules of my school or workplace?"]],
          ["task", "Take a real customer message, remove the private details and ask an assistant to draft a reply. Then check the draft line by line."],
        ],
        quiz: [
          ["Which should you never paste into an AI chat?", ["Passwords and API keys", "A recipe", "A poem you wrote", "A general question"], 0, "Secrets can be stored or leaked."],
          ["What should you do with a link an AI gives you?", ["Open it and check it", "Trust it fully", "Share it immediately", "Ignore all links"], 0, "AI can invent sources."],
          ["Who should make final health or legal decisions?", ["A qualified professional", "Only the AI", "A random website", "Nobody"], 0, "AI can help you prepare, but experts decide."],
        ],
      },
      {
        slug: "ai-for-small-business", title: "AI for a Small Business", mins: 12,
        summary: "Use AI to save hours on replies, descriptions, captions and reviews, while keeping your brand voice and a human check.",
        body: [
          ["p", "A small business owner does everything: sales, replies, posts, accounts. AI can take over the first draft of many of these jobs. You stay in charge of the final version."],
          ["h", "Where AI saves the most time"],
          ["ul", ["Replying to common customer questions on WhatsApp and Instagram.", "Writing product and service descriptions.", "Social media captions and ideas for a month of posts.", "Replying to Google reviews.", "Summarising feedback and spotting repeated complaints.", "Translating between English and Hindi."]],
          ["h", "Create a brand voice prompt once"],
          ["code", "prompt", `You write for [BUSINESS NAME], a [TYPE OF BUSINESS] in [CITY].
Our voice: warm, simple, honest. Short sentences. No hype and no false promises.
We never invent prices, offers or timings. If you need a detail, ask me.
Reply language: simple English unless I say Hindi.`],
          ["p", "Paste it at the start of a chat, and everything after it will sound like your business."],
          ["h", "Ready-made templates"],
          ["code", "prompt", `Write a polite reply to this customer message. Opening hours: 10 am to 7 pm, closed Sunday. Keep it under 40 words and end by offering to book a time.

Customer message: """[PASTE MESSAGE]"""`],
          ["code", "prompt", `Write a reply to this Google review. Thank them, mention one specific thing they liked, and invite them back. If the review is negative, apologise without making excuses and offer to fix it offline. Keep it under 60 words.

Review: """[PASTE REVIEW]"""`],
          ["h", "A safe workflow"],
          ["ul", ["AI writes a draft.", "You read it and fix names, prices, timings and promises.", "You send it.", "For automatic replies, start with simple FAQs and keep a way for the customer to reach a human."]],
          ["note", "Want this set up properly for your business, including WhatsApp replies, lead sorting and reminders? See [AI Automation Setup](/#services)."],
          ["task", "Write your brand voice prompt, then use it to draft replies to your five most common customer questions."],
        ],
        quiz: [
          ["What should you check before sending an AI-written reply?", ["Names, prices, timings and promises", "Nothing", "Only the font", "Only the length"], 0, "The draft can contain wrong details."],
          ["What is a brand voice prompt?", ["A reusable description of how your business writes", "A voice recording", "A paid plan", "A logo"], 0, "It keeps all drafts consistent."],
          ["When automating replies, what should you keep?", ["A way to reach a human", "Nothing else", "Only AI", "No FAQs"], 0, "Customers must be able to talk to a person."],
        ],
      },
      {
        slug: "build-a-small-ai-tool", title: "How an AI Tool Is Built", mins: 13,
        summary: "See the parts of an AI-powered app: interface, your server, the AI API, a system prompt and your own data.",
        body: [
          ["p", "Every AI chatbot you see on a website is built from the same few parts. Understanding them helps you plan one, judge a quote and avoid expensive mistakes."],
          ["h", "The parts"],
          ["table", ["Part", "Job"], [["Interface", "The chat box on your page"], ["Your server", "Receives the question, adds your instructions and calls the AI service"], ["AI API", "A paid or free service that returns the model’s answer"], ["System prompt", "Hidden instructions: who the bot is and what it must never do"], ["Your data", "Business facts such as prices and timings, supplied to the AI so it does not guess"]]],
          ["h", "The golden rule: keep the key on the server"],
          ["p", "An AI API needs a secret key. If you put that key in browser code, anyone can copy it and spend your money. The browser should call your own server, and only the server talks to the AI service."],
          ["h", "A simple browser function"],
          ["code", "javascript", J(`async function askAI(question) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) throw new Error("Request failed");
  const data = await response.json();
  return data.answer;
}`), { skip: true }],
          ["h", "A system prompt for a clinic bot"],
          ["code", "prompt", `You are the virtual assistant of Sunrise Dental Clinic in Rohtak.
Answer only using the clinic facts below. If the answer is not there, say you are not sure and ask the visitor to message us on WhatsApp.
Never give medical diagnoses. Keep answers under 60 words.

Facts:
- Open Monday to Saturday, 10 am to 7 pm. Closed Sunday.
- Services: check-up, cleaning, root canal, braces.
- Appointments are booked on WhatsApp.`],
          ["h", "Giving the AI your own information"],
          ["p", "A model does not know your prices. For a small business, put the facts in the system prompt. For larger knowledge bases, a technique called retrieval augmented generation (RAG) searches your documents, finds the relevant parts and gives only those to the AI along with the question. This greatly reduces guessing."],
          ["h", "Things that go wrong, and fixes"],
          ["ul", ["Costs grow: limit message length and add a daily limit per visitor.", "Abuse: add rate limiting so one person cannot flood the bot.", "Wrong answers: tell the bot to say “I am not sure” and hand over to a human.", "Privacy: do not log or send sensitive customer details unless you must."]],
          ["note", "Interested in a chatbot for your business? See [AI Chatbot](/#services). Or learn the web basics first in [JavaScript for Beginners](/courses/javascript)."],
          ["task", "Write the system prompt for a bot for your own business or an imaginary shop, with at least five facts and three rules."],
        ],
        quiz: [
          ["Where should an AI API key live?", ["On your server", "In the page’s JavaScript", "In the HTML", "In a public post"], 0, "Browser code can be read by anyone."],
          ["What does a system prompt do?", ["Gives the bot its role and rules", "Stores passwords", "Draws the page", "Sends emails"], 0, "It sets the bot’s identity and limits."],
          ["What is RAG used for?", ["Giving the AI relevant parts of your own documents", "Making images", "Speeding up the internet", "Encrypting files"], 0, "It retrieves facts and supplies them to the model."],
        ],
      },
    ],
  },
  {
    slug: "local-business-online", title: "Get Your Local Business Online", short: "Local Business Online", level: "Beginner", cat: "Business Online", featured: true, updated: "2026-11-20",
    desc: "A practical guide for shop and clinic owners: Google Business Profile, local SEO, WhatsApp Business and reviews, so nearby customers can find you.",
    intro: "Most customers now look you up on their phone before they visit. This course is for owners of clinics, gyms, cafes, shops and service businesses. It shows what to set up, in what order, and how to check that it works. You can do most of it yourself, for free.",
    outcomes: ["Know what customers see when they search for you", "Set up and improve your Google Business Profile", "Apply simple local SEO to your website", "Use WhatsApp Business properly", "Collect reviews the right way and reply to them", "Track results with free Google tools", "Follow a simple monthly routine"],
    faq: [
      ["Do I need a website if I have a Google Business Profile?", "A profile is the most important first step, but a website gives you control, trust and a place to explain your services. The best results come from having both."],
      ["Is Google Business Profile free?", "Yes. Creating and managing a Business Profile is free. Be careful of anyone who asks you to pay to be listed."],
      ["How long does local SEO take to work?", "Small improvements such as a complete profile can help within weeks. Ranking higher for competitive searches takes months of steady work, and nobody can guarantee a position."],
    ],
    chapters: [
      {
        slug: "online-presence-checklist", title: "What Customers See When They Search for You", mins: 9,
        summary: "Understand the customer journey and the five things every local business needs online.",
        body: [
          ["p", "When someone needs a dentist, a gym or a cafe nearby, they usually pick up their phone and search. In a few seconds they look at the map results, the reviews, the photos and maybe your website. Then they call, message or visit."],
          ["h", "The five essentials"],
          ["table", ["Essential", "Why it matters"], [["Google Business Profile", "Puts you on Google Maps and local search results"], ["A simple website", "Explains your services, builds trust and works as your home online"], ["WhatsApp Business", "Lets customers message you in the app they already use"], ["Reviews", "Show new customers that real people trust you"], ["Consistent details", "Same name, address and phone number everywhere"]]],
          ["h", "Your details must match everywhere"],
          ["p", "Search engines compare your business name, address and phone number (often called NAP) across your website, Google profile, Instagram and directories. If they differ, Google trusts them less and customers get confused. Choose one exact version and use it everywhere."],
          ["code", "text", `Business name: Fit Zone Gym
Address: Shop 12, Main Market, Sonipat, Haryana 131001
Phone: +91 98765 43210
Hours: Mon-Sat 6 am - 10 pm`],
          ["h", "Do a 10-minute audit"],
          ["ul", ["Search your business name on your phone. What appears first?", "Search for what you sell plus your city, such as “dentist in Rohtak”. Are you there?", "Look at your Google profile: are the hours, photos and phone number correct?", "Click your own website on mobile. Does it load quickly and show your phone number clearly?"]],
          ["task", "Write your exact name, address, phone and hours in a note. This is your master copy for the whole course."],
        ],
        quiz: [
          ["What does NAP stand for in local SEO?", ["Name, Address, Phone", "News, Ads, Posts", "Nearby, Active, Popular", "Network, App, Page"], 0, "Consistency of these details builds trust."],
          ["Why do customers check reviews?", ["To see if others trust the business", "To find your password", "To download an app", "For fun only"], 0, "Reviews act as proof."],
          ["What is the first step of the audit?", ["Search your business name on your phone", "Buy ads", "Change your logo", "Close the shop"], 0, "See what customers see."],
        ],
      },
      {
        slug: "google-business-profile", title: "Google Business Profile: Set It Up Properly", mins: 13,
        summary: "Create, verify and complete your Google Business Profile so you appear on Search and Maps.",
        body: [
          ["p", "Your Google Business Profile (formerly Google My Business) is the free listing that appears in Google Search and Google Maps when people look for you. Google says local results are based mainly on relevance, distance and prominence."],
          ["h", "Create and verify"],
          ["ul", ["Search for your business to see whether a listing already exists. Claim it rather than creating a duplicate.", "Use your real business name exactly as it appears on your signboard. Do not add keywords or locations to the name.", "Choose your main category carefully. It is one of the most important choices. Add secondary categories only if they truly apply.", "Verify your profile. Options such as phone, email, video or postcard depend on your business and what Google offers you."]],
          ["h", "Complete every section"],
          ["table", ["Section", "Tips"], [["Hours", "Keep them accurate, and update for festivals and holidays"], ["Phone and website", "Use a number you answer, and link your main website page"], ["Services or products", "List what you really offer, with short clear descriptions"], ["Photos", "Add the signboard, the entrance, the inside, your team and your work. Real photos beat stock photos"], ["Description", "Say what you do, for whom and where, in plain words"], ["Attributes", "Parking, wheelchair access, online booking and so on, where offered"]]],
          ["h", "Keep it alive"],
          ["ul", ["Post updates and offers regularly.", "Answer questions and messages quickly.", "Add new photos every month.", "Update hours before every festival or holiday."]],
          ["note", "Do not buy fake reviews, and do not create several profiles for one location. Both break Google’s rules and can get your profile suspended."],
          ["task", "Complete every field of your profile and upload at least eight real photos."],
        ],
        quiz: [
          ["What should your business name be on the profile?", ["Exactly as on your signboard", "Packed with keywords", "Your phone number", "Anything you like"], 0, "Keyword stuffing can get a profile suspended."],
          ["What should you do if a listing already exists?", ["Claim it", "Create a duplicate", "Ignore it", "Delete Google Maps"], 0, "Duplicates cause confusion and break the rules."],
          ["Which photos work best?", ["Real photos of your place and work", "Random stock images", "Only your logo", "No photos"], 0, "Real photos build trust."],
        ],
      },
      {
        slug: "local-seo-basics", title: "Local SEO for Your Website", mins: 13,
        summary: "Help Google connect your website to your city with titles, content, schema markup and mobile speed.",
        body: [
          ["p", "Local SEO helps people near you find you. The website side is simple: be clear about who you are, what you offer and where you are."],
          ["h", "On-page basics"],
          ["ul", ["A clear title for each page, for example “Dental Clinic in Rohtak | Dr. Sapna”.", "One H1 heading that says what the page is about.", "A meta description of about 150 characters with the service and city.", "Your address and phone number as plain text, not only inside an image.", "An embedded Google Map and clear directions.", "A page for each important service, with real, useful content."]],
          ["code", "html", `<title>Dental Clinic in Rohtak | Sunrise Dental</title>
<meta name="description" content="Root canal, braces and check-ups in Rohtak. Open Monday to Saturday. Book on WhatsApp.">`, { noPreview: true }],
          ["h", "Write for people, mention your city naturally"],
          ["p", "Use your city and neighbourhood where it makes sense, such as in a heading or a sentence about where you are. Do not repeat it in every line. Writing the same phrase over and over looks spammy and hurts the experience."],
          ["h", "Add LocalBusiness structured data"],
          ["p", "Structured data is code that tells search engines the facts about your business in a standard format. Paste it into your page inside a script tag of type application/ld+json. Replace the sample details with your real ones."],
          ["code", "json", `{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Sunrise Dental Clinic",
  "url": "https://example.com",
  "telephone": "+91 98765 43210",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop 12, Main Market",
    "addressLocality": "Rohtak",
    "addressRegion": "Haryana",
    "postalCode": "124001",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 10:00-19:00"
}`],
          ["note", "Use a more specific type than LocalBusiness when one exists, such as Dentist, Restaurant or HealthClub. Make sure the details match your Google profile exactly."],
          ["h", "Speed and mobile"],
          ["ul", ["Test your site on a phone with a normal mobile connection.", "Compress images before uploading.", "Make the phone number a tap-to-call link: `<a href=\"tel:+919876543210\">`.", "Keep forms short."]],
          ["task", "Check your homepage: does the title include your service and city, and is your phone number text on the page?"],
        ],
        quiz: [
          ["Why write your address as text on the page?", ["Search engines and people can read it", "It looks nicer", "It is required for images", "It speeds the site"], 0, "Text in an image cannot be read reliably."],
          ["What is structured data?", ["Code that tells search engines facts about your business", "A type of image", "A phone plan", "A review"], 0, "It describes your business in a standard format."],
          ["How should you use your city name?", ["Naturally, where it makes sense", "In every sentence", "Never", "Only in the footer"], 0, "Repeating it everywhere looks spammy."],
        ],
      },
      {
        slug: "whatsapp-business", title: "WhatsApp Business: Reply Faster and Look Professional", mins: 11,
        summary: "Set up the WhatsApp Business app with a profile, catalog, quick replies and a click-to-chat link.",
        body: [
          ["p", "In India most customers prefer to message rather than call. The free WhatsApp Business app is built for small businesses and keeps your business separate from your personal chats."],
          ["h", "Set it up"],
          ["ul", ["Install WhatsApp Business and use a number dedicated to your business.", "Complete the business profile: name, category, address, hours, website and email.", "Add a catalog of products or services with photos, descriptions and prices.", "Use a clear profile picture such as your logo or signboard."]],
          ["h", "Features that save time"],
          ["table", ["Feature", "What it does"], [["Quick replies", "Saved answers you insert by typing a shortcut, for timings, prices or directions"], ["Greeting message", "Automatically welcomes a new customer"], ["Away message", "Tells customers when you will reply outside working hours"], ["Labels", "Mark chats such as New enquiry, Booked or Paid"], ["Catalog", "Shows your products or services inside WhatsApp"]]],
          ["h", "A click-to-chat link"],
          ["p", "A `wa.me` link opens a chat with your number, and you can prefill the message. Put it on your website, Google profile and Instagram bio. Use the country code without a plus sign or zeros."],
          ["code", "text", `https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20an%20appointment`],
          ["h", "Rules for using it well"],
          ["ul", ["Message only people who contacted you or agreed to hear from you. Spamming gets numbers blocked.", "Reply quickly and politely, and keep messages short.", "Do not collect or share customer details without need.", "For automation across many customers, the WhatsApp Business Platform (API) is available through providers. It has its own rules, such as approved message templates and customer opt-in."]],
          ["task", "Create three quick replies: opening hours, location and how to book."],
        ],
        quiz: [
          ["What does a quick reply do?", ["Inserts a saved answer from a shortcut", "Deletes chats", "Calls the customer", "Changes your number"], 0, "It saves time on repeated questions."],
          ["How should the number in a wa.me link be written?", ["Country code without a plus sign", "With spaces", "Without the country code", "In words"], 0, "For India, start with 91."],
          ["Who should you message on WhatsApp for marketing?", ["People who contacted you or agreed", "Everyone in your contacts", "Random numbers", "Nobody"], 0, "Unwanted messages lead to blocks and bans."],
        ],
      },
      {
        slug: "reviews-and-reputation", title: "Reviews and Reputation", mins: 10,
        summary: "Ask for reviews the right way, reply to every one and handle negative feedback professionally.",
        body: [
          ["p", "Reviews are one of the strongest trust signals for a local business, and they also influence how prominent you are in local results."],
          ["h", "How to get more reviews, honestly"],
          ["ul", ["Ask happy customers right after good service, in person or on WhatsApp.", "Make it easy: share the direct review link or QR code from your Google Business Profile.", "Ask for honest feedback, not a five-star rating.", "Never offer money, discounts or gifts in exchange for reviews. Google’s policy does not allow incentivised reviews.", "Never post fake reviews or ask friends who were not customers."]],
          ["code", "text", `Hi Ravi, thank you for visiting Sunrise Dental today. If you were happy with your visit, it would help us a lot if you could share a short review here: [REVIEW LINK]. Your honest feedback means a lot.`],
          ["h", "Reply to every review"],
          ["ul", ["Thank the customer by name and mention something specific.", "Keep replies short, warm and human, not copy-pasted.", "Reply within a day or two when you can."]],
          ["h", "Handling a negative review"],
          ["ul", ["Pause before you answer, and never argue in public.", "Thank them for the feedback and apologise for the experience.", "Offer to fix it offline with a phone number or email.", "Do not share their private details or accuse them.", "Fix the real problem. Reviews often show what to improve."]],
          ["code", "text", `Hello Neha, we are sorry about the long wait you faced. That is not the experience we want for you. Please call us on +91 98765 43210 so we can make it right. Thank you for telling us.`],
          ["task", "Write your own review request message and save it as a WhatsApp quick reply."],
        ],
        quiz: [
          ["Is it allowed to give discounts in exchange for reviews?", ["No, incentivised reviews are against Google’s policy", "Yes, always", "Only on weekends", "Only for five stars"], 0, "Incentives for reviews are not allowed."],
          ["How should you reply to a negative review?", ["Politely, and offer to fix it offline", "Argue publicly", "Ignore it forever", "Delete your profile"], 0, "A calm reply shows other customers how you treat people."],
          ["What makes a review request easy?", ["A direct review link or QR code", "A long form", "Asking by post", "Asking after a month"], 0, "Fewer steps mean more reviews."],
        ],
      },
      {
        slug: "measure-and-improve", title: "Measure, Improve and Keep a Monthly Routine", mins: 11,
        summary: "Use Google Search Console and your profile insights to see what works, and follow a simple monthly routine.",
        body: [
          ["p", "You cannot improve what you do not measure. Two free tools cover most needs: your Google Business Profile performance and Google Search Console."],
          ["h", "Google Business Profile performance"],
          ["p", "The performance section of your profile shows how people found you and what they did next, such as calls, direction requests and website visits. Check it once a month to see trends."],
          ["h", "Google Search Console"],
          ["ul", ["Add your website as a property and verify ownership.", "Submit your sitemap (usually at yourwebsite.com/sitemap.xml) so Google can discover your pages.", "Use the URL Inspection tool to check whether a page is indexed and to request indexing for new or updated pages.", "Read the Performance report: queries, clicks, impressions and average position."]],
          ["table", ["Metric", "What it tells you"], [["Impressions", "How often your page appeared in search"], ["Clicks", "How many people visited from Google"], ["Average position", "Where you appear on average (lower is better)"], ["Queries", "The searches that brought people to you"]]],
          ["h", "A simple monthly routine (30 minutes)"],
          ["ul", ["Add three new photos and one update or offer to your Google profile.", "Reply to every new review and message.", "Check hours for upcoming holidays.", "Look at Search Console: which searches bring visitors? Improve those pages.", "Ask five happy customers for a review.", "Update your website with a new offer, post or photo."]],
          ["note", "Be patient. Local SEO is steady work, and small habits repeated every month beat one big push. Nobody can honestly promise you the first position."],
          ["h", "Want help?"],
          ["p", "If you would rather have this done for you, see [Google Business Setup](/#services), [Local SEO](/#services) and [Website Development](/#services)."],
          ["task", "Set a recurring reminder on your phone for the monthly routine and do the first one today."],
        ],
        quiz: [
          ["Which free tool shows the searches that bring people to your website?", ["Google Search Console", "A calculator", "Google Translate", "A spreadsheet only"], 0, "The Performance report lists queries, clicks and impressions."],
          ["What does submitting a sitemap do?", ["Helps Google discover your pages", "Guarantees first position", "Deletes old pages", "Buys ads"], 0, "It lists your pages for Google to crawl."],
          ["How often should you review your results?", ["Monthly", "Never", "Every minute", "Once in five years"], 0, "A regular routine keeps improvements steady."],
        ],
      },
    ],
  },
];
