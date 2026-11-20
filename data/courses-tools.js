// Developer tools courses: Git and GitHub, SQL. Outputs real commands ko chala kar generate hote hain (data/outputs.json).
const SETUP = `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL, stock INTEGER NOT NULL);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO customers VALUES (1, 'Asha', 'Rohtak'), (2, 'Ravi', 'Sonipat'), (3, 'Meena', 'Rohtak'), (4, 'Karan', 'Delhi'), (5, 'Neha', NULL);
INSERT INTO products VALUES (1, 'Notebook', 60, 120), (2, 'Pen', 10, 500), (3, 'Bag', 899.5, 15), (4, 'Water Bottle', 250, 40);
INSERT INTO orders VALUES (1, 1, 1, 3), (2, 1, 2, 10), (3, 2, 3, 1), (4, 3, 1, 2), (5, 3, 4, 1), (6, 2, 2, 5);`;

const REPO = `mkdir demo && cd demo && git init && echo "Hello" > notes.txt && git add . && git commit -m "First commit"`;

export const toolsCourses = [
  {
    slug: "git-github", title: "Git and GitHub for Beginners", short: "Git & GitHub", level: "Beginner", cat: "Developer Tools and Cloud", featured: false, updated: "2026-11-20",
    desc: "Learn Git and GitHub from scratch: commits, history, undoing mistakes, branches, merging, pull requests and good team habits, with real command outputs.",
    intro: "Git saves every version of your project so you can go back, compare and work with others. GitHub is where those projects live online. This course shows each command with its real output, so you know exactly what to expect.",
    outcomes: ["Explain what Git and GitHub are and how they differ", "Create a repository and make commits", "Read history and undo mistakes safely", "Work with branches and merge them", "Push, pull and clone with GitHub", "Open and review pull requests", "Keep secrets out of your repository"],
    faq: [
      ["What is the difference between Git and GitHub?", "Git is the tool on your computer that tracks changes. GitHub is a website that stores Git repositories online and adds teamwork features like pull requests."],
      ["Do I need to use the command line for Git?", "It is the best way to learn what Git really does. Later you can use a graphical app or editor integration if you prefer."],
      ["Is GitHub free?", "GitHub has a free plan that is enough for learning and personal projects. Check GitHub’s current plan page for exact limits."],
    ],
    chapters: [
      {
        slug: "first-repository", title: "What Is Git? Your First Repository", mins: 12,
        summary: "Understand version control and make your first commit with git init, add and commit.",
        body: [
          ["p", "Version control records the history of your files. Instead of copies named `final`, `final2` and `final-really`, Git keeps clean snapshots called commits that you can compare or return to at any time."],
          ["note", "Git is a tool on your computer. GitHub is a website that hosts Git projects online. You can use Git without GitHub."],
          ["h", "One-time setup"],
          ["p", "Tell Git who you are. This name and email are saved in every commit."],
          ["code", "bash", `git config --global user.name "Asha Verma"
git config --global user.email "asha@example.com"`, { skip: true }],
          ["h", "Create a repository"],
          ["p", "A repository (repo) is a folder that Git is watching. The `git init` command creates the hidden `.git` folder that stores the history."],
          ["code", "bash", `mkdir my-project
cd my-project
git init`],
          ["h", "Check the status"],
          ["code", "bash", `echo "# My Project" > README.md
git status`],
          ["h", "The three areas"],
          ["table", ["Area", "What it is", "Command to move forward"], [["Working folder", "Your files as you edit them", "git add"], ["Staging area", "Changes you chose for the next commit", "git commit"], ["Repository", "Saved history of commits", "git push (to GitHub)"]]],
          ["code", "bash", `git add README.md
git status`],
          ["code", "bash", `git commit -m "Add README"`],
          ["code", "bash", `git log --oneline`],
          ["note", "The short code at the start of each line is the commit’s ID. Yours will be different, and that is normal."],
          ["task", "Create a repository, add two files, commit each one separately with a clear message and check `git log --oneline`."],
        ],
        quiz: [
          ["What is GitHub?", ["A website that hosts Git repositories", "The same thing as Git", "A text editor", "A programming language"], 0, "Git is the tool; GitHub is an online home for repositories."],
          ["Which command starts tracking a folder?", ["git init", "git start", "git commit", "git push"], 0, "git init creates the repository."],
          ["What does git add do?", ["Saves a commit", "Puts changes in the staging area", "Uploads to GitHub", "Deletes a file"], 1, "It stages changes for the next commit."],
        ],
      },
      {
        slug: "history-and-undo", title: "Seeing Changes and Undoing Mistakes", mins: 13,
        summary: "Use git diff, restore, revert and .gitignore to inspect changes and undo mistakes safely.",
        body: [
          ["p", "Git’s superpower is safety. You can see exactly what changed and undo it. We start with a tiny repository."],
          ["code", "bash", REPO],
          ["h", "See what changed with git diff"],
          ["code", "bash", `echo "Second line" >> notes.txt
git diff`],
          ["p", "Lines starting with `+` were added and lines starting with `-` were removed."],
          ["h", "Throw away an unsaved change"],
          ["p", "`git restore` brings a file back to how it was in the last commit. The unsaved change is gone for good, so be sure."],
          ["code", "bash", `git restore notes.txt
cat notes.txt`],
          ["h", "Undo a commit safely with git revert"],
          ["p", "`git revert` creates a new commit that cancels an old one. History is kept, so it is safe even on shared projects."],
          ["code", "bash", `echo "Mistake" >> notes.txt
git commit -am "Add a mistake"
git revert HEAD --no-edit
git log --oneline`],
          ["h", "Keep files out of Git"],
          ["p", "A `.gitignore` file lists files Git should not track, such as secrets and downloaded packages."],
          ["code", "bash", `echo ".env" > .gitignore
echo "SECRET_KEY=abc123" > .env
git status --short`],
          ["note", "`.env` is not listed, so Git ignores it. Only `.gitignore` itself shows up as new."],
          ["h", "Be careful with"],
          ["ul", ["`git reset --hard` deletes uncommitted work and moves history. Do not use it until you understand it.", "Never rewrite history that others already have.", "When unsure, make a new branch first. It costs nothing."]],
          ["task", "Edit a file, look at `git diff`, commit it, then undo that commit with `git revert`."],
        ],
        quiz: [
          ["What does a line starting with + mean in git diff?", ["Added line", "Removed line", "Error", "Comment"], 0, "+ is an addition and - is a removal."],
          ["Which command safely cancels an old commit by adding a new one?", ["git revert", "git delete", "git erase", "git cut"], 0, "revert keeps history intact."],
          ["What is .gitignore for?", ["Listing files Git should not track", "Deleting history", "Logging in", "Merging branches"], 0, "It keeps secrets and junk out of the repository."],
        ],
      },
      {
        slug: "branches-and-merging", title: "Branches and Merging", mins: 13,
        summary: "Work on features safely in branches and merge them back into main.",
        body: [
          ["p", "A branch is a separate line of work. You can build a new feature without touching the working version on `main`, and merge it back when it is ready."],
          ["code", "bash", REPO],
          ["h", "Create a branch and commit on it"],
          ["code", "bash", `git branch
git switch -c feature/contact
echo "Contact page" > contact.txt
git add contact.txt
git commit -m "Add contact page"
git log --oneline`],
          ["h", "Go back to main and merge"],
          ["code", "bash", `git switch main
ls
git merge feature/contact
ls`],
          ["p", "The first `ls` shows no `contact.txt` because `main` did not have it yet. After the merge it appears."],
          ["code", "bash", `git branch -d feature/contact
git branch`],
          ["h", "Merge conflicts"],
          ["p", "A conflict happens when two branches change the same lines. Git cannot decide, so it marks the file and asks you:"],
          ["code", "text", `<<<<<<< HEAD
Opening hours: 9 am to 6 pm
=======
Opening hours: 10 am to 7 pm
>>>>>>> feature/hours`],
          ["ul", ["Open the file and choose the correct text (or combine both).", "Delete the three marker lines.", "Run `git add` on the file and then `git commit`."]],
          ["h", "Branch habits"],
          ["ul", ["Keep `main` always working.", "One branch per feature or fix, with a clear name like `fix/login-bug`.", "Merge small and often to avoid big conflicts."]],
          ["task", "Create a branch called `feature/about`, add a file, commit it and merge it into `main`."],
        ],
        quiz: [
          ["Which command creates and switches to a new branch?", ["git switch -c name", "git new name", "git branch -x", "git go name"], 0, "git switch -c creates and switches in one step."],
          ["When does a merge conflict happen?", ["Two branches change the same lines", "When you commit twice", "When the internet is slow", "Never"], 0, "Git cannot choose between competing edits."],
          ["Why keep main always working?", ["Others and your live site depend on it", "It is faster", "Git requires it", "To save space"], 0, "main is the stable version of the project."],
        ],
      },
      {
        slug: "github-remote", title: "GitHub: Push, Pull and Clone", mins: 12,
        summary: "Connect your local repository to GitHub, then push, pull and clone projects.",
        body: [
          ["p", "A remote is a copy of your repository on another computer, usually GitHub. By convention the main remote is named `origin`."],
          ["h", "Put a local project on GitHub"],
          ["ul", ["Create an empty repository on GitHub (no README yet).", "Copy its URL.", "Connect it and push your commits."]],
          ["code", "bash", `git remote add origin https://github.com/YOUR-NAME/my-project.git
git branch -M main
git push -u origin main`, { skip: true }],
          ["code", "bash", `git remote -v`, { out: "origin  https://github.com/YOUR-NAME/my-project.git (fetch)\norigin  https://github.com/YOUR-NAME/my-project.git (push)" }],
          ["h", "Get changes from GitHub"],
          ["code", "bash", `git pull`, { skip: true }],
          ["h", "Copy someone else’s project"],
          ["code", "bash", `git clone https://github.com/YOUR-NAME/my-project.git`, { skip: true }],
          ["h", "Signing in"],
          ["p", "GitHub does not accept your account password for Git over HTTPS. Use either a personal access token (paste it when Git asks for a password) or an SSH key. Treat both like passwords and never put them in code."],
          ["table", ["Command", "What it does"], [["git clone URL", "Downloads a full copy of a repository"], ["git push", "Sends your commits to GitHub"], ["git pull", "Downloads and merges new commits from GitHub"], ["git fetch", "Downloads new commits without merging"]]],
          ["h", "A healthy daily rhythm"],
          ["ul", ["`git pull` before you start.", "Commit small, clear changes.", "`git push` when a piece of work is done, so your work is backed up."]],
          ["task", "Create a new repository on GitHub, connect your local project to it and push."],
        ],
        quiz: [
          ["What is origin?", ["The usual name for the main remote", "A branch", "A file", "A password"], 0, "origin is just the default name for the remote."],
          ["Which command sends commits to GitHub?", ["git push", "git pull", "git clone", "git status"], 0, "push uploads your commits."],
          ["What should you do with access tokens?", ["Keep them secret", "Put them in your README", "Share them in chats", "Commit them"], 0, "Tokens give access to your account."],
        ],
      },
      {
        slug: "pull-requests", title: "Pull Requests and Teamwork", mins: 10,
        summary: "Learn the pull request workflow used by teams and open source projects.",
        body: [
          ["p", "A pull request (PR) asks the project owner to merge your branch into theirs. It is also a place for review and discussion before the code goes live."],
          ["h", "The workflow"],
          ["ul", ["Create a branch (or fork the project if it is not yours).", "Make your commits and push the branch to GitHub.", "Open a pull request and explain what and why.", "Teammates review, comment and request changes.", "When approved, merge the PR and delete the branch."]],
          ["h", "A good pull request"],
          ["ul", ["Small and focused: one idea per PR.", "A clear title such as “Fix price rounding in the invoice”.", "A short description: what changed, why, and how to test it.", "Screenshots for visual changes.", "Respond to feedback politely, and give feedback kindly."]],
          ["h", "Protect main"],
          ["p", "In the repository settings you can require a pull request and a review before anything reaches `main`. This stops accidents."],
          ["note", "Tools can help with this workflow. For example, [Easy DevOps](https://easydevops.vercel.app) can create branches and open, compare and merge pull requests from a chat message."],
          ["task", "Create a small repository with a friend (or a second account), make a branch with one change and open a pull request."],
        ],
        quiz: [
          ["What is a pull request?", ["A request to merge your branch after review", "A way to delete a repo", "A type of commit", "A download"], 0, "It proposes changes and invites review."],
          ["What makes a good PR?", ["Small and focused with a clear description", "Huge with many unrelated changes", "No explanation", "Pushed straight to main"], 0, "Small PRs are easier to review."],
          ["What should happen after a PR is merged?", ["Delete the branch", "Delete main", "Rename the repo", "Nothing is allowed"], 0, "Old branches only add clutter."],
        ],
      },
      {
        slug: "good-habits-and-security", title: "Good Habits and Keeping Secrets Safe", mins: 10,
        summary: "Write useful commit messages, use .gitignore properly and never leak passwords or API keys.",
        body: [
          ["h", "Commit messages"],
          ["p", "A commit message is a note to your future self. Keep the first line short and say what the commit does."],
          ["code", "text", `Good:
Add contact form validation
Fix wrong price on the invoice page
Update opening hours

Not helpful:
changes
fix
asdf`],
          ["h", "A starter .gitignore"],
          ["code", "text", `node_modules/
.env
.env.local
.DS_Store
*.log
dist/`],
          ["h", "Secrets and Git"],
          ["ul", ["Never commit passwords, API keys or tokens.", "If you commit one by mistake, deleting the file is not enough, because it stays in history. Revoke the key and create a new one immediately.", "Keep secrets in environment variables and add `.env` to `.gitignore` before the first commit.", "Public repositories can be scanned by bots within minutes."]],
          ["h", "A README is your front door"],
          ["ul", ["What the project does, in one or two lines.", "How to install and run it.", "A screenshot or a link to the live site.", "How to contact you."]],
          ["h", "Habits checklist"],
          ["ul", ["Commit small and often.", "One branch per task.", "Pull before you push.", "Read `git status` and `git diff` before every commit.", "Never commit secrets."]],
          ["note", "A well-kept GitHub profile with a few real projects and clear READMEs speaks louder than a long CV."],
          ["task", "Open one of your repositories and improve its README and `.gitignore`."],
        ],
        quiz: [
          ["You committed an API key by mistake. What should you do first?", ["Revoke and replace the key", "Delete the file only", "Ignore it", "Rename the repo"], 0, "The key remains in history, so it must be treated as leaked."],
          ["Which commit message is best?", ["Fix wrong price on invoice page", "stuff", "changes", "asdf"], 0, "It says what the commit does."],
          ["Where should secrets be kept?", ["In environment variables, not in Git", "In the README", "In the commit message", "In a public file"], 0, "Keep them out of the repository."],
        ],
      },
    ],
  },
  {
    slug: "sql", title: "SQL for Beginners", short: "SQL", level: "Beginner", cat: "Databases", featured: false, updated: "2026-11-20",
    desc: "Learn SQL from scratch with a small shop database: SELECT, WHERE, sorting, GROUP BY, INSERT, UPDATE, DELETE and JOINs, with the real result of every query.",
    intro: "SQL is the language for asking questions of data, and it is used almost everywhere that data is stored. We use one small shop database (customers, products and orders) throughout, and every query shows its real result. The examples run in SQLite, and MySQL and PostgreSQL work almost the same way.",
    outcomes: ["Explain tables, rows, columns and keys", "Read data with SELECT, WHERE, ORDER BY and LIMIT", "Search with LIKE, IN, BETWEEN and NULL", "Count and total data with GROUP BY", "Add, change and delete rows safely", "Combine tables with JOIN", "Design tables and avoid SQL injection"],
    faq: [
      ["Which database should I install to practise SQL?", "SQLite is the easiest because it needs no server, and many online SQL playgrounds use it. The ideas transfer directly to MySQL and PostgreSQL."],
      ["Is SQL a programming language?", "It is a query language for databases. You describe what data you want, and the database works out how to get it."],
      ["Do I need to learn SQL if I use an ORM or a no-code tool?", "Yes. Understanding SQL helps you debug slow or wrong results and makes you better at any data tool."],
    ],
    chapters: [
      {
        slug: "tables-rows-columns", title: "What Is a Database? Tables, Rows and Columns", mins: 11,
        summary: "Understand relational databases and create a small shop database to practise with.",
        body: [
          ["p", "A database stores data so it can be searched and changed quickly and safely. A relational database stores it in tables, like spreadsheets that are linked together."],
          ["ul", ["A table holds one kind of thing, such as customers.", "A column is one property of it, such as name or city.", "A row is one record, such as one customer.", "A primary key is a column that uniquely identifies each row, such as id."]],
          ["h", "Create the shop database"],
          ["p", "We will use these three tables in every chapter. `customers` and `products` stand alone, and `orders` points to both of them using foreign keys. Run this once:"],
          ["code", "sql", SETUP],
          ["h", "Look at the data"],
          ["p", "`SELECT *` means every column. The semicolon ends a statement."],
          ["code", "sql", `SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM orders;`],
          ["note", "`NULL` means “no value”. Neha has no city, so her city is NULL. It is not an empty text and not zero."],
          ["h", "Data types you will see"],
          ["table", ["Type", "Used for", "Example"], [["INTEGER", "Whole numbers", "42"], ["REAL (or DECIMAL)", "Numbers with decimals", "899.5"], ["TEXT (or VARCHAR)", "Text", "'Asha'"], ["DATE", "Dates", "'2026-11-20'"]]],
          ["task", "Run `SELECT name FROM products;` and then `SELECT name, stock FROM products;`."],
        ],
        quiz: [
          ["What is a row?", ["One record in a table", "One column", "A database", "A key"], 0, "Each row is one record, like one customer."],
          ["What does NULL mean?", ["No value", "Zero", "An empty string", "Error"], 0, "NULL is the absence of a value."],
          ["What does a primary key do?", ["Uniquely identifies each row", "Encrypts data", "Sorts data", "Deletes data"], 0, "It makes every row identifiable."],
        ],
      },
      {
        slug: "select-and-where", title: "SELECT and WHERE: Asking Questions", mins: 12,
        summary: "Choose columns and filter rows with WHERE, AND, OR, IN and BETWEEN.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["p", "`SELECT` chooses columns. `FROM` chooses the table. `WHERE` keeps only the rows that match a condition."],
          ["code", "sql", `SELECT name, city FROM customers;`],
          ["h", "Filtering with WHERE"],
          ["p", "Text values go in single quotes. Numbers do not."],
          ["code", "sql", `SELECT * FROM customers WHERE city = 'Rohtak';
SELECT name, price FROM products WHERE price > 100;`],
          ["h", "Combining conditions"],
          ["code", "sql", `SELECT name, price, stock FROM products
WHERE price BETWEEN 50 AND 300 AND stock > 30;`],
          ["code", "sql", `SELECT name FROM customers WHERE city IN ('Rohtak', 'Delhi');`],
          ["h", "Renaming columns"],
          ["p", "`AS` gives a column a friendlier name in the result."],
          ["code", "sql", `SELECT name AS product, price AS rupees FROM products WHERE price < 100;`],
          ["table", ["Operator", "Meaning"], [["=  !=  <  >  <=  >=", "Compare values"], ["AND  OR  NOT", "Combine conditions"], ["IN (...)", "Matches any value in the list"], ["BETWEEN a AND b", "Within a range, ends included"]]],
          ["task", "Write a query that shows products with stock below 50."],
        ],
        quiz: [
          ["Which clause filters rows?", ["WHERE", "FROM", "AS", "SELECT"], 0, "WHERE keeps only matching rows."],
          ["How do you write text in a condition?", ["In single quotes", "Without quotes", "In brackets", "With a hash"], 0, "For example city = 'Rohtak'."],
          ["What does AS do?", ["Renames a column in the result", "Deletes a column", "Sorts data", "Adds rows"], 0, "It creates an alias."],
        ],
      },
      {
        slug: "sorting-and-searching", title: "Sorting, Limiting and Searching", mins: 11,
        summary: "Use ORDER BY, LIMIT, DISTINCT, LIKE and IS NULL to find exactly what you need.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["h", "ORDER BY and LIMIT"],
          ["p", "`ORDER BY` sorts (ascending by default, `DESC` for highest first). `LIMIT` keeps only the first rows, which is perfect for “top 2” questions."],
          ["code", "sql", `SELECT name, price FROM products ORDER BY price DESC;
SELECT name, price FROM products ORDER BY price DESC LIMIT 2;`],
          ["h", "DISTINCT"],
          ["code", "sql", `SELECT DISTINCT city FROM customers;`],
          ["h", "Searching text with LIKE"],
          ["p", "`%` matches any number of characters. `'M%'` means starts with M, and `'%a'` means ends with a."],
          ["code", "sql", `SELECT name FROM customers WHERE name LIKE 'M%';
SELECT name FROM customers WHERE name LIKE '%a';`],
          ["h", "NULL needs IS NULL"],
          ["p", "NULL is never equal to anything, not even to NULL. Use `IS NULL` and `IS NOT NULL`."],
          ["code", "sql", `SELECT name FROM customers WHERE city = NULL;
SELECT name FROM customers WHERE city IS NULL;`],
          ["task", "Show the three cheapest products, cheapest first."],
        ],
        quiz: [
          ["Which keyword sorts highest to lowest?", ["ORDER BY ... DESC", "SORT UP", "LIMIT DESC", "GROUP DOWN"], 0, "DESC reverses the sort."],
          ["What does LIKE 'M%' match?", ["Text starting with M", "Text ending with M", "Only the letter M", "Numbers"], 0, "% stands for any characters after M."],
          ["How do you find rows with no value?", ["IS NULL", "= NULL", "= ''", "= 0"], 0, "Comparing with = never matches NULL."],
        ],
      },
      {
        slug: "aggregates-and-group-by", title: "Counting and Summing: Aggregates and GROUP BY", mins: 12,
        summary: "Answer business questions with COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["h", "Aggregate functions"],
          ["p", "These functions turn many rows into one number."],
          ["table", ["Function", "Gives"], [["COUNT(*)", "Number of rows"], ["SUM(col)", "Total"], ["AVG(col)", "Average"], ["MIN(col) / MAX(col)", "Smallest / largest"]]],
          ["code", "sql", `SELECT COUNT(*) AS total_customers FROM customers;
SELECT SUM(quantity) AS items_sold FROM orders;
SELECT ROUND(AVG(price), 2) AS average_price, MIN(price) AS cheapest, MAX(price) AS dearest FROM products;`],
          ["h", "GROUP BY"],
          ["p", "`GROUP BY` makes one result row per group. This is how you answer questions like “how many customers per city?”"],
          ["code", "sql", `SELECT city, COUNT(*) AS customers FROM customers GROUP BY city;`],
          ["h", "HAVING filters groups"],
          ["p", "`WHERE` filters rows before grouping. `HAVING` filters the groups afterwards."],
          ["code", "sql", `SELECT product_id, SUM(quantity) AS sold
FROM orders
GROUP BY product_id
HAVING SUM(quantity) >= 5;`],
          ["note", "COUNT(city) counts only rows where city is not NULL, while COUNT(*) counts all rows."],
          ["task", "Find the total quantity ordered by each customer_id."],
        ],
        quiz: [
          ["Which function counts rows?", ["COUNT(*)", "TOTAL()", "ROWS()", "NUMBER()"], 0, "COUNT(*) counts every row."],
          ["What does GROUP BY do?", ["Makes one result row per group", "Sorts rows", "Deletes duplicates", "Joins tables"], 0, "It collapses rows into groups."],
          ["What is the difference between WHERE and HAVING?", ["WHERE filters rows, HAVING filters groups", "They are identical", "HAVING filters rows first", "WHERE filters groups"], 0, "WHERE runs before grouping, HAVING after."],
        ],
      },
      {
        slug: "insert-update-delete", title: "Changing Data: INSERT, UPDATE and DELETE", mins: 12,
        summary: "Add, change and remove rows safely, and use transactions to undo mistakes.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["h", "INSERT"],
          ["code", "sql", `INSERT INTO customers (id, name, city) VALUES (6, 'Pooja', 'Panipat');
SELECT * FROM customers WHERE id = 6;`],
          ["h", "UPDATE"],
          ["code", "sql", `UPDATE products SET price = 65 WHERE name = 'Notebook';
SELECT name, price FROM products WHERE name = 'Notebook';`],
          ["h", "DELETE"],
          ["code", "sql", `DELETE FROM customers WHERE id = 6;
SELECT COUNT(*) AS customers FROM customers;`],
          ["note", "Always write the WHERE. `UPDATE products SET price = 65;` changes every row, and `DELETE FROM customers;` removes every row. Run a SELECT with the same WHERE first to see which rows you will touch."],
          ["h", "Transactions"],
          ["p", "A transaction groups changes so they all happen or none do. `ROLLBACK` cancels everything since `BEGIN`, and `COMMIT` saves it."],
          ["code", "sql", `BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 3;
SELECT name, stock FROM products WHERE id = 3;
ROLLBACK;
SELECT name, stock FROM products WHERE id = 3;`],
          ["task", "Insert a new product, update its price and then delete it, checking with a SELECT after each step."],
        ],
        quiz: [
          ["Which statement changes existing rows?", ["UPDATE", "INSERT", "SELECT", "CREATE"], 0, "UPDATE modifies rows."],
          ["What happens if you forget WHERE in a DELETE?", ["Every row is deleted", "Nothing happens", "One row is deleted", "An error always appears"], 0, "Without WHERE it applies to the whole table."],
          ["What does ROLLBACK do?", ["Cancels changes since BEGIN", "Saves changes", "Deletes the table", "Sorts rows"], 0, "It undoes the transaction."],
        ],
      },
      {
        slug: "joins", title: "Joins: Combining Tables", mins: 13,
        summary: "Connect customers, products and orders with INNER JOIN and LEFT JOIN, and calculate real totals.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["p", "Data is split across tables to avoid repetition. A join puts it back together using a matching column, usually a foreign key such as `orders.customer_id` which points to `customers.id`."],
          ["h", "INNER JOIN"],
          ["p", "Returns only rows that have a match on both sides."],
          ["code", "sql", `SELECT customers.name, products.name AS product, orders.quantity
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;`],
          ["h", "LEFT JOIN"],
          ["p", "Keeps every row from the left table, even with no match. Karan and Neha have no orders, and a left join still shows them."],
          ["code", "sql", `SELECT customers.name, COUNT(orders.id) AS orders
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id
GROUP BY customers.id;`],
          ["h", "A real business question"],
          ["p", "How much has each customer spent? Multiply quantity by price, add it up per customer and sort."],
          ["code", "sql", `SELECT customers.name, SUM(orders.quantity * products.price) AS spent
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id
GROUP BY customers.id
ORDER BY spent DESC;`],
          ["task", "Show each product name with the total quantity ordered, including products nobody has ordered."],
        ],
        quiz: [
          ["What does INNER JOIN return?", ["Only rows with a match on both sides", "All rows from both tables", "Only the left table", "Nothing"], 0, "Unmatched rows are dropped."],
          ["Which join keeps all rows from the left table?", ["LEFT JOIN", "INNER JOIN", "SELF JOIN", "CROSS JOIN"], 0, "LEFT JOIN keeps unmatched left rows too."],
          ["What links orders to customers?", ["customer_id, a foreign key", "name", "price", "city"], 0, "customer_id points to customers.id."],
        ],
      },
      {
        slug: "design-keys-and-safe-sql", title: "Table Design, Keys and Safe SQL", mins: 13,
        summary: "Design clean tables, use foreign keys and indexes, and protect your app from SQL injection.",
        body: [
          ["code", "sql", SETUP, { hide: true }],
          ["h", "Good table design"],
          ["ul", ["One table per kind of thing: customers, products, orders.", "Do not repeat data. Store a customer’s city once and refer to the customer by id.", "Give every table a primary key.", "Use foreign keys so orders can only point to customers and products that exist.", "Choose the right data types and mark required columns NOT NULL."]],
          ["h", "Foreign keys protect your data"],
          ["p", "In SQLite you switch enforcement on with `PRAGMA foreign_keys = ON`. MySQL and PostgreSQL enforce it by default, and the error message differs by database."],
          ["code", "sql", `PRAGMA foreign_keys = ON;
INSERT INTO orders VALUES (99, 42, 1, 1);`, { err: true }],
          ["h", "Indexes make searches fast"],
          ["p", "An index works like the index of a book. It helps the database find rows without reading the whole table, which matters when a table has thousands of rows. Add them on columns you filter or join on often. Too many indexes slow down writes."],
          ["code", "sql", `CREATE INDEX idx_orders_customer ON orders(customer_id);`],
          ["h", "SQL injection: the most important safety rule"],
          ["p", "If you build a query by pasting user input into text, an attacker can type SQL instead of a name and read or destroy your data. Always use parameters (placeholders) and let the database library insert the values safely."],
          ["code", "python", `# DANGEROUS: never build SQL from user input
query = "SELECT * FROM customers WHERE name = '" + user_input + "'"

# SAFE: use a placeholder and pass the value separately
cursor.execute("SELECT * FROM customers WHERE name = ?", (user_input,))`, { skip: true }],
          ["h", "Quick reference"],
          ["table", ["Task", "SQL"], [["Read rows", "SELECT ... FROM ... WHERE ..."], ["Sort and limit", "ORDER BY ... DESC LIMIT n"], ["Summarise", "GROUP BY ... HAVING ..."], ["Combine tables", "JOIN ... ON ..."], ["Add", "INSERT INTO ... VALUES (...)"], ["Change", "UPDATE ... SET ... WHERE ..."], ["Remove", "DELETE FROM ... WHERE ..."]]],
          ["note", "Take backups of any real database, and test that you can restore them."],
          ["task", "Design tables for a gym: members, plans and payments. Decide the primary and foreign keys on paper first."],
        ],
        quiz: [
          ["How do you prevent SQL injection?", ["Use parameters (placeholders)", "Hide the database", "Use shorter names", "Add more indexes"], 0, "Parameters keep user input as data, never as SQL."],
          ["What does an index do?", ["Speeds up searching", "Deletes duplicates", "Encrypts the table", "Adds rows"], 0, "It lets the database find rows faster."],
          ["Why use a foreign key?", ["To keep references valid", "To sort rows", "To hide columns", "To count rows"], 0, "It stops orders from pointing at missing customers."],
        ],
      },
    ],
  },
];
