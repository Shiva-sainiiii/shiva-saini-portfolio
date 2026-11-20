// Web courses. Code me backtick ke liye § aur ${ ke liye ¤{ likho (J() unhe wapas badal deta hai).
const J = (s) => s.replaceAll("§", "`").replaceAll("¤{", "${");

export const webCourses = [
  {
    slug: "html-css", title: "HTML and CSS for Beginners", short: "HTML & CSS", level: "Beginner", cat: "Web Development", featured: true, updated: "2026-11-20",
    desc: "Build your first website with HTML and CSS: text, links, images, forms, the box model, Flexbox and responsive design, with a live preview for every example.",
    intro: "HTML and CSS are the foundation of every website. In seven chapters you will go from an empty file to a responsive business landing page. Every code example has a live preview, so you see the result right away.",
    outcomes: ["Explain how a browser loads a web page", "Write clean, semantic HTML with links, images, lists and forms", "Style pages with CSS selectors, colours, spacing and fonts", "Understand the box model", "Build layouts with Flexbox", "Make a page work on phones and laptops", "Follow the basic SEO and accessibility rules for a page"],
    faq: [
      ["Do I need to install anything to learn HTML and CSS?", "No. A text editor and a browser are enough, and even a phone with a code editor app works. Every example here has a live preview in the page."],
      ["How long does it take to learn HTML and CSS?", "The basics in this course take about four hours to read and practise. Getting comfortable takes a few small projects, so build something after every chapter."],
      ["Should I learn HTML and CSS before JavaScript?", "Yes. JavaScript changes web pages, so you need to understand the page first. Finish this course and then start JavaScript for Beginners."],
    ],
    chapters: [
      {
        slug: "how-the-web-works", title: "How the Web Works and Your First Page", mins: 9,
        summary: "See what happens when you open a website, then write and view your first HTML page.",
        body: [
          ["h", "What happens when you open a website"],
          ["ul", ["You type a web address (URL) such as example.com.", "The browser asks DNS, the internet’s phone book, for the server’s address.", "It sends a request to that server over HTTPS.", "The server replies with files: HTML, CSS, JavaScript and images.", "The browser reads them and draws the page."]],
          ["h", "The three languages of the web"],
          ["table", ["Language", "Its job", "House analogy"], [["HTML", "Structure and content", "Walls, doors and rooms"], ["CSS", "Looks and layout", "Paint and furniture"], ["JavaScript", "Behaviour and interaction", "Electricity and switches"]]],
          ["h", "Your first web page"],
          ["p", "You only need a text editor and a browser. Create a file named `index.html`, paste the code below, save it and open it in your browser. The preview shows what you will see."],
          ["code", "html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first page</title>
</head>
<body>
  <h1>Hello, web!</h1>
  <p>This is my first page.</p>
</body>
</html>`],
          ["h", "What each part does"],
          ["ul", ["`<!DOCTYPE html>` tells the browser this is modern HTML.", "`<html lang=\"en\">` wraps the page and states its language.", "`<head>` holds information about the page that is not shown on it, like the `<title>`.", "`<body>` holds everything the visitor sees."]],
          ["note", "The `<title>` appears in the browser tab and as the blue headline in Google results. Make it clear and keep it under about 60 characters."],
          ["task", "Change the heading to your name, add a second paragraph about your hobby, and reload the page."],
        ],
        quiz: [
          ["Which language controls how a page looks?", ["HTML", "CSS", "DNS", "HTTP"], 1, "CSS handles colours, fonts and layout."],
          ["Where is the page title defined?", ["In the body", "In a footer", "In the head with the title tag", "In the URL"], 2, "The title tag lives inside head and shows in the tab."],
          ["What does the server send back to the browser?", ["Only images", "HTML, CSS, JavaScript and other files", "Only text messages", "Nothing"], 1, "The browser builds the page from these files."],
        ],
      },
      {
        slug: "text-links-images-lists", title: "Text, Links, Images and Lists", mins: 11,
        summary: "Use headings, paragraphs, links, images and lists, and write the alt text that helps users and Google.",
        body: [
          ["h", "Headings and paragraphs"],
          ["p", "Use `<h1>` to `<h6>` for headings, from most to least important. A page should have one `<h1>`. Use `<p>` for paragraphs, `<strong>` for important text and `<em>` for emphasis."],
          ["h", "Links"],
          ["p", "The `<a>` tag creates a link. The `href` attribute holds the destination."],
          ["h", "Images"],
          ["p", "The `<img>` tag shows an image. Always write the `alt` text. It describes the image for screen readers, shows when the image fails to load and helps search engines understand it."],
          ["h", "Lists"],
          ["p", "Use `<ul>` for a bulleted list, `<ol>` for a numbered list, and `<li>` for each item."],
          ["code", "html", `<h1>Fit Zone Gym</h1>
<p>We train <strong>beginners</strong> and <em>serious lifters</em> alike.</p>

<img alt="A dumbbell icon" width="64" height="64"
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='6' y='26' width='52' height='12' rx='4' fill='%230b6bcb'/%3E%3Crect x='2' y='18' width='10' height='28' rx='3' fill='%23333'/%3E%3Crect x='52' y='18' width='10' height='28' rx='3' fill='%23333'/%3E%3C/svg%3E">

<h2>Our plans</h2>
<ul>
  <li>Monthly</li>
  <li>Quarterly</li>
  <li>Yearly</li>
</ul>

<h2>How to join</h2>
<ol>
  <li>Visit the gym</li>
  <li>Take a free trial</li>
  <li>Pick a plan</li>
</ol>

<p><a href="https://example.com">Read our blog</a></p>`],
          ["h", "Link tips"],
          ["ul", ["A link to another page of your own site is called a relative link: `<a href=\"/contact.html\">`.", "To open a link in a new tab use `target=\"_blank\"` together with `rel=\"noopener\"`.", "Write link text that makes sense alone. “Read our pricing” is better than “click here”."]],
          ["task", "Build a short page about your favourite place: one heading, two paragraphs, a list of three things to do there and a link to its website."],
        ],
        quiz: [
          ["Which attribute holds a link’s destination?", ["src", "href", "alt", "link"], 1, "href stands for hypertext reference."],
          ["Why is alt text important?", ["It makes images bigger", "It helps screen readers and search engines", "It adds a border", "It is only decoration"], 1, "Alt text describes the image for people who cannot see it and for search engines."],
          ["Which tag makes a numbered list?", ["ul", "ol", "li", "nl"], 1, "ol is an ordered list."],
        ],
      },
      {
        slug: "semantic-structure-and-forms", title: "Page Structure and Forms", mins: 12,
        summary: "Organise a page with semantic tags and collect information with accessible forms.",
        body: [
          ["h", "Semantic tags"],
          ["p", "Semantic tags describe what a section is, not just how it looks. Screen readers and search engines use them to understand your page."],
          ["table", ["Tag", "Use it for"], [["header", "Top of the page or a section, often the logo and menu"], ["nav", "A group of main navigation links"], ["main", "The main content of the page (use once)"], ["section", "A themed group of content, usually with a heading"], ["article", "Content that stands alone, like a blog post"], ["footer", "Bottom of the page: contact, links, copyright"]]],
          ["h", "Forms"],
          ["p", "A form collects information. Every input needs a `<label>` connected with `for` and `id`. A placeholder is not a replacement for a label."],
          ["code", "html", `<form>
  <label for="name">Your name</label><br>
  <input id="name" name="name" type="text" required><br><br>

  <label for="email">Email</label><br>
  <input id="email" name="email" type="email" required><br><br>

  <label for="plan">Plan</label><br>
  <select id="plan" name="plan">
    <option>Monthly</option>
    <option>Quarterly</option>
    <option>Yearly</option>
  </select><br><br>

  <label for="msg">Message</label><br>
  <textarea id="msg" name="msg" rows="3"></textarea><br><br>

  <button type="submit">Send enquiry</button>
</form>`],
          ["ul", ["`type=\"email\"`, `tel`, `number` and `date` give the right keyboard on phones and basic validation.", "`required` stops the form from being sent when the field is empty.", "`name` is the key under which the value is sent. Without it the field is ignored.", "A real form needs a place to send the data, for example the `action` attribute or JavaScript. This preview does not send anything."]],
          ["task", "Create a contact form with name, phone (type tel) and a message, all with labels."],
        ],
        quiz: [
          ["Which tag should wrap the main content of a page?", ["header", "main", "footer", "nav"], 1, "main holds the primary content, once per page."],
          ["How do you connect a label to an input?", ["With for and id", "With class", "With href", "With alt"], 0, "The for value must match the input id."],
          ["What does the required attribute do?", ["Makes text bold", "Blocks sending an empty field", "Hides the input", "Adds a label"], 1, "The browser asks the user to fill it in first."],
        ],
      },
      {
        slug: "css-basics", title: "CSS Basics: Selectors, Colours and Units", mins: 12,
        summary: "Style your page with CSS rules, selectors, colours, units and CSS variables.",
        body: [
          ["h", "Three ways to add CSS"],
          ["ul", ["Inline, in the tag: `<p style=\"color:red\">` (use rarely).", "In a `<style>` block inside `<head>` (fine for small pages).", "In a separate file linked with `<link rel=\"stylesheet\" href=\"style.css\">` (best for real sites)."]],
          ["h", "Anatomy of a rule"],
          ["p", "A rule has a selector and a block of declarations. Each declaration is a property, a colon, a value and a semicolon."],
          ["h", "Common selectors"],
          ["ul", ["`p` selects every paragraph.", "`.card` selects elements with class=\"card\". Classes are the most useful selector.", "`#top` selects the element with id=\"top\". An id must be unique.", "`nav a` selects links inside nav.", "`a:hover` selects a link while the mouse is over it."]],
          ["h", "Colours and units"],
          ["p", "Colours can be names (`tomato`), hex codes (`#0b6bcb`) or `rgb(11 107 203)`. For sizes, `px` is fixed, `rem` scales with the base font size, `%` is relative to the parent and `vw` is a percentage of the screen width."],
          ["code", "html", `<style>
  :root { --brand: #0b6bcb; }
  body { font-family: system-ui, sans-serif; }
  h1 { color: var(--brand); }
  .highlight { background: #fff3bf; padding: 4px 8px; }
  a { color: var(--brand); }
  a:hover { color: tomato; }
</style>

<h1>Welcome</h1>
<p>This is a normal paragraph with a <span class="highlight">highlighted phrase</span>.</p>
<p><a href="#">Hover over this link</a></p>`],
          ["note", "`--brand` is a CSS variable. Change it in one place and every colour that uses `var(--brand)` updates. This is how real design systems work."],
          ["h", "When rules clash"],
          ["p", "If two rules target the same element, the more specific selector wins (id beats class, class beats element). If they are equally specific, the one written later wins."],
          ["task", "Add a class called `warning` that gives text a red colour and a light red background, and use it on one paragraph."],
        ],
        quiz: [
          ["Which selector targets class=\"card\"?", [".card", "#card", "card", "*card"], 0, "A dot selects a class."],
          ["Where do the best real websites keep CSS?", ["Inline in every tag", "In a separate .css file", "In the title", "Inside images"], 1, "One stylesheet can be reused by every page."],
          ["What is --brand in :root?", ["A tag", "A CSS variable", "A script", "A comment"], 1, "Custom properties start with two dashes and are read with var()."],
        ],
      },
      {
        slug: "box-model-and-text", title: "The Box Model, Text and Backgrounds", mins: 12,
        summary: "Understand padding, border and margin, and style text, backgrounds and cards.",
        body: [
          ["h", "Every element is a box"],
          ["p", "The browser treats each element as a rectangle made of four layers, from inside to outside: content, padding (space inside the border), border and margin (space outside)."],
          ["code", "html", `<style>
  * { box-sizing: border-box; }
  .card {
    width: 260px;
    padding: 20px;
    border: 2px solid #0b6bcb;
    border-radius: 14px;
    margin: 16px auto;
    background: #f1f7ff;
    box-shadow: 0 4px 12px rgba(0,0,0,.12);
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    text-align: center;
  }
  .card h2 { margin: 0 0 8px; color: #0b6bcb; }
</style>

<div class="card">
  <h2>Monthly plan</h2>
  <p>Full gym access, every day of the month.</p>
</div>`],
          ["ul", ["`box-sizing: border-box` makes the width include padding and border. Almost every site starts with it.", "`margin: 16px auto` centres a block that has a width.", "`border-radius` rounds corners and `box-shadow` adds depth.", "`line-height: 1.5` makes paragraphs much easier to read."]],
          ["h", "Block and inline"],
          ["p", "Block elements such as `div`, `p` and `h1` start on a new line and take the full width. Inline elements such as `a`, `span` and `strong` sit inside the text line. Use `display` to change this."],
          ["h", "Text styling"],
          ["ul", ["`font-family`, `font-size`, `font-weight`", "`color` for text and `background` for the box behind it", "`text-align: left | center | right`", "`max-width: 65ch` keeps long text easy to read"]],
          ["task", "Make three cards in a row of text (one under the other is fine) with different titles, using the same class."],
        ],
        quiz: [
          ["Which layer is outside the border?", ["Content", "Padding", "Margin", "Text"], 2, "Margin is the space outside the border."],
          ["What does box-sizing: border-box do?", ["Adds a border", "Includes padding and border in the width", "Hides the box", "Makes text bold"], 1, "Sizes become predictable."],
          ["Which centres a block with a width?", ["margin: 0 auto", "text-align: top", "float: middle", "padding: auto"], 0, "Automatic left and right margins centre the block."],
        ],
      },
      {
        slug: "flexbox-layout", title: "Flexbox Layout", mins: 13,
        summary: "Lay out navigation bars and card rows with Flexbox, the modern way to arrange elements.",
        body: [
          ["p", "Flexbox arranges items in a row or a column and handles spacing and alignment for you. Add `display: flex` to the parent and its children become flex items."],
          ["table", ["Property (on the parent)", "What it does"], [["flex-direction", "row (default) or column"], ["justify-content", "Spacing along the main axis: flex-start, center, space-between, space-around"], ["align-items", "Alignment across the other axis: stretch, center, flex-start"], ["gap", "Space between items"], ["flex-wrap", "Lets items move to the next line when there is no room"]]],
          ["code", "html", `<style>
  * { box-sizing: border-box; }
  body { font-family: system-ui, sans-serif; margin: 0; }
  .bar { display: flex; justify-content: space-between; align-items: center;
         padding: 12px 20px; background: #0b6bcb; color: #fff; }
  .bar nav { display: flex; gap: 16px; }
  .bar a { color: #fff; text-decoration: none; }
  .cards { display: flex; flex-wrap: wrap; gap: 16px; padding: 20px; }
  .cards div { flex: 1 1 140px; padding: 16px; border: 1px solid #ccd; border-radius: 12px; }
</style>

<div class="bar">
  <strong>Fit Zone</strong>
  <nav><a href="#">Home</a><a href="#">Plans</a><a href="#">Contact</a></nav>
</div>
<div class="cards">
  <div>Strength</div>
  <div>Cardio</div>
  <div>Yoga</div>
</div>`],
          ["ul", ["`justify-content: space-between` pushes the logo left and the menu right.", "`flex: 1 1 140px` means: grow, shrink, and start at 140px. Cards share the row and wrap on small screens.", "Use Flexbox for one direction (a row or a column). For full page grids, CSS Grid is the next thing to learn."]],
          ["task", "Change `.cards` to `flex-direction: column` and see what happens. Then change it back and add a fourth card."],
        ],
        quiz: [
          ["Which property turns on Flexbox?", ["display: flex", "position: flex", "flex: on", "layout: flex"], 0, "Put display flex on the parent."],
          ["Which pushes items to opposite ends of the row?", ["justify-content: space-between", "align-items: end", "gap: 100%", "flex-wrap: wrap"], 0, "space-between puts the free space between items."],
          ["What does gap do?", ["Adds space between items", "Hides items", "Adds a border", "Changes the font"], 0, "gap controls the space between flex items."],
        ],
      },
      {
        slug: "responsive-design-landing-page", title: "Responsive Design and a Business Landing Page", mins: 16,
        summary: "Make a page work on phones and laptops, then build a complete landing page with an SEO checklist.",
        body: [
          ["p", "Most visitors open websites on a phone, so your page must adapt to every screen width. That is responsive design."],
          ["h", "The three essentials"],
          ["ul", ["The viewport meta tag: `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`. Without it, phones show a tiny zoomed-out page.", "Flexible layouts: percentages, `max-width`, Flexbox with wrapping, and `img { max-width: 100%; }`.", "Media queries, which apply CSS only above or below a screen width."]],
          ["h", "Mobile first"],
          ["p", "Write the CSS for small screens first, then add `@media (min-width: 700px) { ... }` to enhance it for bigger screens. It keeps your code simple and your phone version fast."],
          ["h", "Project: a landing page"],
          ["p", "This page uses everything from the course: semantic tags, a link, Flexbox, CSS variables and a media query. Shrink your browser window (or look at it on a phone) to see the layout change."],
          ["code", "html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fit Zone Gym in Sonipat</title>
  <meta name="description" content="Strength, cardio and yoga classes in Sonipat. Book a free trial.">
  <style>
    :root { --brand: #0b6bcb; --ink: #14213d; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; color: var(--ink); line-height: 1.6; }
    header { background: var(--brand); color: #fff; padding: 40px 20px; text-align: center; }
    header h1 { margin: 0 0 8px; font-size: 2rem; }
    .btn { display: inline-block; margin-top: 12px; padding: 12px 22px; background: #fff;
           color: var(--brand); border-radius: 999px; text-decoration: none; font-weight: 700; }
    main { max-width: 900px; margin: 0 auto; padding: 24px 20px; }
    .plans { display: grid; gap: 16px; }
    .plan { padding: 20px; border: 1px solid #d6dbe6; border-radius: 14px; }
    footer { padding: 20px; text-align: center; background: #f1f4fa; }
    @media (min-width: 700px) {
      header h1 { font-size: 3rem; }
      .plans { grid-template-columns: repeat(3, 1fr); }
    }
  </style>
</head>
<body>
  <header>
    <h1>Fit Zone Gym</h1>
    <p>Strength, cardio and yoga in Sonipat.</p>
    <a class="btn" href="#plans">See plans</a>
  </header>
  <main id="plans">
    <h2>Choose your plan</h2>
    <div class="plans">
      <div class="plan"><h3>Monthly</h3><p>Flexible and simple.</p></div>
      <div class="plan"><h3>Quarterly</h3><p>Best for building a habit.</p></div>
      <div class="plan"><h3>Yearly</h3><p>Lowest cost per month.</p></div>
    </div>
  </main>
  <footer>Open 6 am to 10 pm · Sonipat, Haryana</footer>
</body>
</html>`, { height: 520 }],
          ["h", "Page SEO and quality checklist"],
          ["ul", ["One clear `<h1>` and a descriptive `<title>`.", "A `<meta name=\"description\">` of about 150 characters. It often becomes the text under your Google result.", "Alt text on every meaningful image.", "Correct heading order (h1, then h2, then h3).", "Readable on mobile and fast to load (compress images).", "Real contact details, written as text so people and search engines can read them."]],
          ["note", "Ready to put it online? Follow [Deploy Your First Site to the Internet](/courses/cloud-computing/deploy-your-first-site) in the Cloud Computing course."],
          ["task", "Turn this page into a landing page for your own business or an imaginary one. Change the name, colours and plans, and add a contact section."],
        ],
        quiz: [
          ["Why is the viewport meta tag needed?", ["For colours", "So phones show the page at the right width", "For images", "To speed up the server"], 1, "Without it, mobile browsers shrink the desktop layout."],
          ["What is a media query used for?", ["Playing media", "Applying CSS only at certain screen sizes", "Loading videos", "Adding comments"], 1, "It lets the layout change at breakpoints."],
          ["What does mobile first mean?", ["Design for phones first, then enhance for large screens", "Only support phones", "Use mobile data", "Hide desktop content"], 0, "Start with the small layout, then add min-width media queries."],
        ],
      },
    ],
  },
  {
    slug: "javascript", title: "JavaScript for Beginners", short: "JavaScript", level: "Beginner", cat: "Programming", featured: true, updated: "2026-11-20",
    desc: "Learn modern JavaScript step by step: variables, functions, arrays, objects, the DOM, events, async code and fetch, with real outputs and a small project.",
    intro: "JavaScript makes web pages interactive, and with Node.js it also runs on servers. This course teaches modern JavaScript (ES6 and later) from zero. Every example shows its real output, and the DOM chapters have live previews.",
    outcomes: ["Write JavaScript with let, const and template strings", "Make decisions and reuse code with functions", "Work with arrays and objects", "Use map, filter and reduce", "Change a web page and react to clicks", "Understand async code, promises and fetch", "Debug errors and build a small tool"],
    faq: [
      ["Do I need to know HTML and CSS before JavaScript?", "It helps a lot for the browser chapters. Start with the HTML and CSS course if you are new to web pages."],
      ["Is JavaScript the same as Java?", "No. They are different languages with similar names. JavaScript runs in browsers and on servers with Node.js."],
      ["Where do I run these examples?", "In your browser’s Developer Tools console (press F12), in an online editor, or with Node.js. The outputs shown here are what the examples print."],
    ],
    chapters: [
      {
        slug: "first-javascript", title: "Your First JavaScript: Variables and Types", mins: 10,
        summary: "Print to the console, store values with let and const, and learn the basic data types.",
        body: [
          ["p", "JavaScript is the programming language of the web. Browsers run it, and Node.js runs it on your computer or a server."],
          ["h", "Where to run it"],
          ["ul", ["In the browser: press F12, open the Console tab and type code.", "In a file: save `app.js` and run `node app.js` if Node.js is installed.", "In an HTML page with a script tag, which you will see in the DOM chapter."]],
          ["h", "console.log"],
          ["code", "javascript", `console.log("Hello, JavaScript!");
console.log(2 + 3);`],
          ["h", "Variables: let and const"],
          ["p", "Use `const` for values that will not be reassigned and `let` for values that will change. Avoid the old `var`."],
          ["code", "javascript", J(`const name = "Asha";
let age = 19;
age = age + 1;

console.log(name, age);
console.log(§My name is ¤{name} and I am ¤{age}.§);`)],
          ["h", "Basic types"],
          ["table", ["Type", "Example"], [["string", "\"hello\" or 'hello'"], ["number", "42 or 3.14 (integers and decimals are both numbers)"], ["boolean", "true or false"], ["undefined", "A variable with no value yet"], ["null", "An intentional empty value"]]],
          ["code", "javascript", `console.log(typeof "hi");
console.log(typeof 42);
console.log(typeof true);
let x;
console.log(typeof x);`],
          ["note", "Text inside backticks with `${ }` is called a template literal. It is the cleanest way to put variables inside text."],
          ["task", "Create `const` variables for your name and city and print one sentence using a template literal."],
        ],
        quiz: [
          ["Which keyword declares a variable you can change later?", ["const", "let", "fixed", "static"], 1, "let can be reassigned; const cannot."],
          ["What does typeof 42 return?", ["\"integer\"", "\"number\"", "\"digit\"", "\"float\""], 1, "JavaScript has a single number type."],
          ["What are backtick strings with ${} called?", ["Template literals", "Comments", "Arrays", "Tags"], 0, "They let you embed expressions in text."],
        ],
      },
      {
        slug: "operators-and-conditions", title: "Operators, Comparison and Conditions", mins: 11,
        summary: "Compare values correctly with ===, combine conditions and make decisions with if and the ternary operator.",
        body: [
          ["h", "Arithmetic"],
          ["code", "javascript", `console.log(7 + 2);
console.log(7 - 2);
console.log(7 * 2);
console.log(7 / 2);
console.log(7 % 2);
console.log(2 ** 3);`],
          ["h", "Comparison: always prefer ==="],
          ["p", "`===` checks value and type. `==` converts types first and gives surprising results. Use `===` and `!==` by default."],
          ["code", "javascript", `console.log(5 === 5);
console.log(5 === "5");
console.log(5 == "5");
console.log(5 !== 6);`],
          ["h", "Logical operators"],
          ["code", "javascript", `const age = 20;
console.log(age >= 18 && age < 25);
console.log(age < 18 || age > 60);
console.log(!(age === 20));`],
          ["h", "if, else if, else"],
          ["code", "javascript", `const marks = 72;
if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 50) {
  console.log("Grade C");
} else {
  console.log("Fail");
}`],
          ["h", "The ternary operator"],
          ["code", "javascript", `const isOpen = true;
console.log(isOpen ? "We are open" : "We are closed");`],
          ["h", "Truthy and falsy"],
          ["p", "In conditions, these values count as false: `false`, `0`, `\"\"` (empty string), `null`, `undefined` and `NaN`. Everything else counts as true."],
          ["code", "javascript", `const name = "";
if (name) {
  console.log("Hello " + name);
} else {
  console.log("Please enter your name");
}`],
          ["task", "Write code that checks a number and prints “even” or “odd” using `%` and a ternary operator."],
        ],
        quiz: [
          ["What does 5 === \"5\" give?", ["true", "false", "error", "undefined"], 1, "The types differ, so strict equality is false."],
          ["Which of these is falsy?", ["\"hello\"", "1", "0", "[]"], 2, "0 is falsy. An empty array is truthy."],
          ["What does the ternary operator do?", ["Loops three times", "Picks one of two values", "Declares a variable", "Adds numbers"], 1, "condition ? a : b gives a or b."],
        ],
      },
      {
        slug: "functions", title: "Functions and Scope", mins: 11,
        summary: "Write reusable functions, use arrow functions and understand where variables live.",
        body: [
          ["p", "A function packages code so you can reuse it. It can take inputs (parameters) and give back an output with `return`."],
          ["code", "javascript", `function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Asha"));
console.log(greet("Ravi"));`],
          ["h", "Default parameters"],
          ["code", "javascript", `function addGst(amount, rate = 18) {
  return amount + (amount * rate) / 100;
}
console.log(addGst(1000));
console.log(addGst(1000, 5));`],
          ["h", "Arrow functions"],
          ["p", "Arrow functions are a shorter way to write functions. You will see them everywhere in modern code."],
          ["code", "javascript", `const square = (n) => n * n;
const full = (first, last) => {
  return first + " " + last;
};
console.log(square(6));
console.log(full("Shiva", "Saini"));`],
          ["h", "Scope"],
          ["p", "A variable declared with `let` or `const` exists only inside the braces `{ }` where it was created. This is called block scope."],
          ["code", "javascript", `let total = 10;
function demo() {
  let secret = 99;
  return total + secret;
}
console.log(demo());
console.log(typeof secret);`],
          ["note", "Functions are values. You can store them in variables and pass them to other functions. You will use this a lot with array methods and events."],
          ["task", "Write a function `isAdult(age)` that returns true for 18 or more, and test it with three ages."],
        ],
        quiz: [
          ["What does return do?", ["Prints text", "Sends a value back to the caller", "Stops the browser", "Creates a variable"], 1, "return hands a value back to where the function was called."],
          ["Which is an arrow function?", ["function f() {}", "const f = () => 1", "def f(): 1", "f => function"], 1, "Arrow functions use =>."],
          ["Where is a let variable available?", ["Everywhere", "Only inside its block", "Only in other files", "Nowhere"], 1, "let and const are block scoped."],
        ],
      },
      {
        slug: "arrays-and-objects", title: "Arrays and Objects", mins: 13,
        summary: "Store lists with arrays and structured data with objects, the two data shapes behind almost every app.",
        body: [
          ["h", "Arrays"],
          ["p", "An array is an ordered list. Indexes start at 0."],
          ["code", "javascript", `const fruits = ["apple", "banana", "mango"];
console.log(fruits[0]);
console.log(fruits.length);
fruits.push("grapes");
console.log(fruits.join(", "));
console.log(fruits.includes("mango"));
console.log(fruits.slice(1, 3).join(", "));`],
          ["h", "Objects"],
          ["p", "An object stores related values under names (keys). It is how you describe a thing like a customer or a product."],
          ["code", "javascript", `const student = { name: "Asha", age: 19, city: "Rohtak" };
console.log(student.name);
student.age = 20;
student.course = "BCA";
console.log(JSON.stringify(student));
console.log(Object.keys(student).join(", "));`],
          ["h", "Arrays of objects"],
          ["p", "Real data is usually a list of objects. This is exactly the shape that APIs and databases give you."],
          ["code", "javascript", `const products = [
  { name: "Notebook", price: 60 },
  { name: "Pen", price: 10 },
  { name: "Bag", price: 900 },
];
console.log(products[2].name);
for (const p of products) {
  console.log(p.name + " costs " + p.price);
}`],
          ["h", "Destructuring"],
          ["code", "javascript", `const { name, city } = { name: "Ravi", city: "Sonipat" };
const [first, second] = ["red", "green", "blue"];
console.log(name, city);
console.log(first, second);`],
          ["task", "Create an array of three student objects with name and marks, then print each name with its marks."],
        ],
        quiz: [
          ["What is the index of the first array item?", ["0", "1", "-1", "first"], 0, "Arrays are zero-based."],
          ["How do you read the name from the object student?", ["student.name", "student->name", "student[name]()", "name.student"], 0, "Use dot notation or student[\"name\"]."],
          ["Which method adds an item to the end of an array?", ["push", "pop", "join", "slice"], 0, "push adds to the end."],
        ],
      },
      {
        slug: "loops-and-array-methods", title: "Loops and Array Methods: map, filter, reduce", mins: 13,
        summary: "Repeat work with loops and transform data with map, filter, find and reduce.",
        body: [
          ["h", "Loops"],
          ["code", "javascript", `for (let i = 1; i <= 3; i++) {
  console.log("Round " + i);
}

let n = 3;
while (n > 0) {
  console.log("Countdown " + n);
  n--;
}

for (const letter of "Hi!") {
  console.log(letter);
}`],
          ["h", "Array methods"],
          ["p", "Most JavaScript developers prefer array methods to manual loops. They are short and clear. We will use this list of prices:"],
          ["code", "javascript", `const prices = [100, 250, 40, 900, 15];

const withGst = prices.map((p) => (p * 1.18).toFixed(2));
console.log(withGst.join(", "));

const expensive = prices.filter((p) => p > 90);
console.log(expensive.join(", "));

const firstCheap = prices.find((p) => p < 50);
console.log(firstCheap);

const total = prices.reduce((sum, p) => sum + p, 0);
console.log(total);`],
          ["table", ["Method", "What it gives back"], [["map", "A new array with each item transformed"], ["filter", "A new array with only the items that pass a test"], ["find", "The first item that passes a test"], ["reduce", "A single value built from all items (a sum, a count, an object)"], ["forEach", "Nothing. It just runs code for each item"]]],
          ["h", "Chaining"],
          ["code", "javascript", `const orders = [
  { item: "Notebook", qty: 3, price: 60 },
  { item: "Pen", qty: 10, price: 10 },
  { item: "Bag", qty: 1, price: 900 },
];

const bill = orders
  .map((o) => o.qty * o.price)
  .reduce((sum, x) => sum + x, 0);
console.log("Total bill: " + bill);`],
          ["task", "From the list `[3, 8, 12, 5, 20]`, print only the numbers above 6, doubled."],
        ],
        quiz: [
          ["Which method returns a new array of transformed items?", ["map", "find", "forEach", "push"], 0, "map transforms every item."],
          ["What does reduce usually produce?", ["A single value", "Always an array", "Nothing", "A string"], 0, "It combines all items into one result."],
          ["Which method returns only the items that pass a test?", ["filter", "map", "reduce", "join"], 0, "filter keeps matching items."],
        ],
      },
      {
        slug: "dom-and-events", title: "The DOM and Events: Make Pages Interactive", mins: 14,
        summary: "Select elements, change them with JavaScript and react to clicks, with a live working example.",
        body: [
          ["p", "When a browser loads HTML it builds a tree of objects called the DOM (Document Object Model). JavaScript can read and change that tree, which changes what the user sees."],
          ["h", "The key tools"],
          ["ul", ["`document.querySelector(\"#id\")` finds the first element matching a CSS selector.", "`element.textContent = \"...\"` changes its text.", "`element.classList.toggle(\"name\")` adds or removes a class.", "`element.addEventListener(\"click\", fn)` runs a function when the user clicks."]],
          ["h", "A live example"],
          ["p", "This counter changes the page when you click. Try the buttons in the preview."],
          ["code", "html", `<h2>Clicks: <span id="count">0</span></h2>
<button id="plus">Add one</button>
<button id="reset">Reset</button>

<script>
  let count = 0;
  const label = document.querySelector("#count");

  document.querySelector("#plus").addEventListener("click", () => {
    count++;
    label.textContent = count;
  });

  document.querySelector("#reset").addEventListener("click", () => {
    count = 0;
    label.textContent = count;
  });
</script>`],
          ["note", "Put the script at the end of the body, or use the `defer` attribute, so the elements exist before the code looks for them."],
          ["h", "Reading user input"],
          ["code", "html", `<input id="name" placeholder="Type your name">
<button id="go">Greet</button>
<p id="out"></p>

<script>
  document.querySelector("#go").addEventListener("click", () => {
    const name = document.querySelector("#name").value.trim();
    document.querySelector("#out").textContent =
      name ? "Hello, " + name + "!" : "Please type your name.";
  });
</script>`],
          ["task", "Add a third button to the counter that subtracts one but never goes below zero."],
        ],
        quiz: [
          ["What does querySelector return?", ["The first matching element", "All elements", "Only ids", "A number"], 0, "It returns the first element that matches the selector."],
          ["Which method runs code on a click?", ["addEventListener", "textContent", "classList", "typeof"], 0, "addEventListener attaches a handler for an event."],
          ["Why put the script at the end of the body?", ["So the elements already exist", "It runs faster always", "It is required", "To hide it"], 0, "The script can only find elements that are already loaded."],
        ],
      },
      {
        slug: "async-and-fetch", title: "Asynchronous JavaScript: Promises, async/await and fetch", mins: 14,
        summary: "Understand code that waits, use async/await and fetch data from an API safely.",
        body: [
          ["p", "Some tasks take time: loading data from a server, reading a file, waiting for a timer. JavaScript does not freeze while it waits. It continues and comes back when the result is ready. That is asynchronous code."],
          ["h", "Order of execution"],
          ["code", "javascript", `console.log("1. start");
setTimeout(() => console.log("3. after the timer"), 100);
console.log("2. end of the script");`],
          ["h", "Promises and async/await"],
          ["p", "A promise is a value that will arrive later. `async` and `await` let you write code that waits, in a clear top to bottom style."],
          ["code", "javascript", `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Preparing order...");
  await wait(100);
  console.log("Order ready!");
}
main();`],
          ["h", "fetch: getting data from an API"],
          ["p", "`fetch` requests data from a URL. Check `response.ok` and wrap the code in `try` and `catch`, because networks fail."],
          ["code", "javascript", `async function loadUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!response.ok) {
      throw new Error("Server said " + response.status);
    }
    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.log("Could not load: " + error.message);
  }
}
loadUser();`, { out: "Leanne Graham" }],
          ["note", "The output above is what a working network request prints. Run it in your browser console, because it needs internet access."],
          ["h", "Rules to remember"],
          ["ul", ["`await` works only inside an `async` function (or at the top of a module).", "Always handle errors with `try` and `catch`.", "Never put secret API keys in browser code. Call your own server, which holds the key."]],
          ["task", "Write an async function that waits one second, prints “done” and returns the number 42."],
        ],
        quiz: [
          ["What does await do?", ["Pauses the async function until the promise finishes", "Deletes the promise", "Makes code run twice", "Closes the page"], 0, "Execution of that function waits for the result."],
          ["Why check response.ok?", ["To see whether the server returned a success status", "To change the colour", "To log in", "It is optional decoration"], 0, "A 404 or 500 does not throw by itself."],
          ["Where must secret API keys stay?", ["On your server", "In the browser code", "In the HTML", "In a public GitHub repo"], 0, "Anything sent to the browser can be read by the user."],
        ],
      },
      {
        slug: "debugging-and-project", title: "Errors, Debugging and a Mini Project", mins: 16,
        summary: "Read error messages, debug with the console and build a working tip calculator.",
        body: [
          ["h", "Errors you will meet"],
          ["table", ["Error", "Usually means"], [["ReferenceError", "You used a variable that does not exist (often a typo)"], ["TypeError", "You used a value the wrong way, like calling something that is not a function"], ["SyntaxError", "A missing bracket, quote or comma"]]],
          ["h", "try, catch and throw"],
          ["code", "javascript", `function divide(a, b) {
  if (b === 0) {
    throw new Error("You cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(5, 0));
} catch (error) {
  console.log("Error: " + error.message);
}`],
          ["h", "How to debug"],
          ["ul", ["Read the whole error message. It names the file and line.", "Use `console.log` to see the value of variables at each step.", "Open DevTools (F12), go to Sources and set a breakpoint to pause the code and inspect values.", "Make the problem smaller until the bug has nowhere to hide.", "Change one thing at a time."]],
          ["h", "Project: a tip calculator"],
          ["p", "This small tool uses everything from this course: a function, DOM selection, events, number conversion and a check for invalid input."],
          ["code", "html", `<style>
  body { font-family: system-ui, sans-serif; max-width: 320px; margin: 20px auto; }
  input, button { width: 100%; padding: 10px; margin: 6px 0; font-size: 16px; box-sizing: border-box; }
  #result { font-size: 20px; font-weight: 700; }
</style>

<h2>Tip calculator</h2>
<input id="bill" type="number" placeholder="Bill amount">
<input id="percent" type="number" placeholder="Tip percent" value="10">
<button id="calc">Calculate</button>
<p id="result"></p>

<script>
  function calculateTip(bill, percent) {
    const tip = (bill * percent) / 100;
    return { tip: tip, total: bill + tip };
  }

  document.querySelector("#calc").addEventListener("click", () => {
    const bill = Number(document.querySelector("#bill").value);
    const percent = Number(document.querySelector("#percent").value);
    const result = document.querySelector("#result");

    if (!bill || bill < 0) {
      result.textContent = "Enter a valid bill amount.";
      return;
    }
    const r = calculateTip(bill, percent);
    result.textContent = "Tip: " + r.tip.toFixed(2) + " | Total: " + r.total.toFixed(2);
  });
</script>`],
          ["h", "Where to go next"],
          ["ul", ["Build three small projects: a to-do list, a quiz and a weather app using a free API.", "Learn Git and GitHub to save and share your work: [Git and GitHub for Beginners](/courses/git-github).", "Then learn a framework such as React or Next.js."]],
          ["task", "Add a field for the number of people and show the amount each person pays."],
        ],
        quiz: [
          ["What does a ReferenceError usually mean?", ["A variable does not exist", "A missing bracket", "The internet is down", "A slow computer"], 0, "Often a typo in a variable name."],
          ["What is a good first debugging step?", ["Read the full error message", "Delete everything", "Restart the computer", "Ignore it"], 0, "The message tells you what and where."],
          ["Which statement creates your own error?", ["throw new Error(...)", "print error", "catch error", "stop"], 0, "throw raises an error you can catch."],
        ],
      },
    ],
  },
];
