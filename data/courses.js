// Free courses. Naya course ya chapter add karna ho to yahin object jodo: page, sitemap aur links apne aap ban jaate hain.
// Block types: ["h", text] ["p", text] ["ul", [items]] ["code", lang, code] ["note", text] ["task", text] ["table", [headers], [[row]...]]
// Text me `backtick` se inline code ban jaata hai. quiz = [sawal, [options], sahi_index, kyun]
export const courses = [
  {
    slug: "python", title: "Python for Beginners", short: "Python", level: "Beginner",
    desc: "Learn Python from your first program to a number guessing game, chapter by chapter, in simple English. Free, with code examples, tasks and quizzes.",
    intro: "You do not need any coding experience. Each chapter is short, has code you can copy and run, one task to try yourself and a small quiz to check what you learned. By the end you will have built a real game.",
    outcomes: ["Write and run Python programs", "Use variables, numbers, text and user input", "Make decisions with if and repeat work with loops", "Store data in lists, dictionaries and sets", "Write your own functions", "Read and write files and handle errors", "Build a complete number guessing game"],
    chapters: [
      {
        slug: "first-program", title: "What Is Python and Your First Program", mins: 8,
        summary: "Install Python, run your first program with print() and learn the three rules every beginner needs.",
        body: [
          ["p", "Python is a popular programming language that is easy to read, which is why many people start with it. It is free, and it is used for websites, automation, data analysis and AI."],
          ["h", "What you need"],
          ["p", "A computer or phone with Python installed. On a laptop, download it from python.org and, on Windows, tick “Add Python to PATH” during setup. On Android, an app like Pydroid 3 works. You can also start in any online Python editor in your browser."],
          ["p", "To check that Python is installed, open a terminal (Command Prompt on Windows) and type:"],
          ["code", "bash", "python --version"],
          ["note", "On Mac and Linux the command is often `python3 --version`."],
          ["h", "Your first program"],
          ["code", "python", `print("Hello, world!")`],
          ["p", "`print()` shows text on the screen. Text inside quotes is called a string. Save the line in a file named `hello.py` and run it:"],
          ["code", "bash", "python hello.py"],
          ["h", "Comments and more lines"],
          ["code", "python", `# This is a comment. Python ignores it.
print("My name is Shiva")  # a comment can also sit after code
print("I am learning Python")`],
          ["h", "Three rules to remember"],
          ["ul", ["Python is case sensitive: `Print` and `print` are different.", "Indentation (the spaces at the start of a line) is part of the syntax. You will see why in the chapter on decisions.", "A string starts and ends with the same kind of quote, single or double."]],
          ["task", "Write a program that prints your name on the first line and your city on the second line. Add a comment above each line."],
        ],
        quiz: [
          ["Which function shows text on the screen?", ["print", "show", "echo", "write"], 0, "print() is the built-in function that displays output."],
          ["Which symbol starts a comment in Python?", ["#", "//", "--", "/*"], 0, "Everything after # on that line is ignored by Python."],
          ["What is the usual file extension of a Python program?", [".py", ".python", ".pt", ".pyt"], 0, "Python files end with .py, for example hello.py."],
        ],
      },
      {
        slug: "variables-and-data-types", title: "Variables and Data Types", mins: 10,
        summary: "Store values in variables and learn the four basic types: int, float, str and bool.",
        body: [
          ["p", "A variable is a name that stores a value, like a labelled box. You create one with `=`."],
          ["code", "python", `name = "Asha"
age = 19
height = 5.4
is_student = True
print(name, age, height, is_student)`],
          ["h", "The four basic data types"],
          ["ul", ["`int`: whole numbers like 19 or -3", "`float`: numbers with a decimal point like 5.4", "`str`: text like “Asha”", "`bool`: only `True` or `False`"]],
          ["p", "Use `type()` to see what type a value has:"],
          ["code", "python", `print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(name))        # <class 'str'>
print(type(is_student))  # <class 'bool'>`],
          ["h", "Naming rules"],
          ["ul", ["Use letters, digits and underscores, and never start with a digit.", "No spaces. Write `my_age`, not `my age`.", "Do not use Python keywords such as `if` or `for` as names.", "By habit, use lowercase with underscores (snake_case)."]],
          ["h", "Changing a value"],
          ["code", "python", `age = 19
age = age + 1
print(age)  # 20`],
          ["h", "Working with strings"],
          ["code", "python", `city = "  Sonipat "
print(city.strip())          # Sonipat
print(city.strip().upper())  # SONIPAT
print(len("Python"))         # 6
print("Hi " + "there")       # Hi there
print("ha" * 3)              # hahaha`],
          ["task", "Store your name, age and favourite number in three variables and print them in one `print()` line, separated by commas."],
        ],
        quiz: [
          ["What type is the value 3.5?", ["int", "float", "str", "bool"], 1, "A number with a decimal point is a float."],
          ["Which is a valid variable name?", ["my age", "2name", "my_age", "for"], 2, "Names cannot have spaces, start with a digit or be keywords."],
          ["What does \"ha\" * 3 give?", ["hahaha", "ha3", "error", "ha ha ha"], 0, "Multiplying a string repeats it."],
        ],
      },
      {
        slug: "operators-input-and-conversion", title: "Operators, Input and Type Conversion", mins: 12,
        summary: "Do maths, compare values, take input from the user and convert between types.",
        body: [
          ["h", "Arithmetic operators"],
          ["table", ["Operator", "Meaning", "Example", "Result"], [["+", "Add", "7 + 2", "9"], ["-", "Subtract", "7 - 2", "5"], ["*", "Multiply", "7 * 2", "14"], ["/", "Divide (always a float)", "7 / 2", "3.5"], ["//", "Floor division", "7 // 2", "3"], ["%", "Remainder", "7 % 2", "1"], ["**", "Power", "7 ** 2", "49"]]],
          ["h", "Comparison and logic"],
          ["p", "Comparisons give `True` or `False`: `==` (equal), `!=` (not equal), `>`, `<`, `>=`, `<=`. Remember that `=` stores a value and `==` compares two values. Combine conditions with `and`, `or` and `not`."],
          ["code", "python", `age = 20
print(age >= 18)             # True
print(age > 18 and age < 25) # True
print(not (age == 20))       # False`],
          ["h", "Taking input"],
          ["p", "`input()` asks the user to type something. It always returns text, even if the user types a number."],
          ["code", "python", `name = input("What is your name? ")
print("Hello", name)`],
          ["h", "Converting types"],
          ["p", "Use `int()`, `float()` and `str()` to convert. Here is a tiny bill calculator that also uses an f-string, which puts values inside text with `{ }`:"],
          ["code", "python", `price = float(input("Price: "))
qty = int(input("Quantity: "))
total = price * qty
print(f"Total bill: {total:.2f}")`],
          ["note", "`{total:.2f}` shows the number with exactly two decimal places."],
          ["h", "A common beginner mistake"],
          ["code", "python", `print("5" + "3")      # 53  (text joined together)
print(int("5") + 3)    # 8   (real addition)`],
          ["task", "Ask the user for two numbers and print their sum, difference and product."],
        ],
        quiz: [
          ["What is 7 // 2 in Python?", ["3.5", "3", "4", "1"], 1, "// is floor division, so it drops the decimal part."],
          ["What type does input() return?", ["int", "float", "str", "bool"], 2, "input() always returns a string. Convert it if you need a number."],
          ["What is 7 % 2?", ["3", "1", "0", "2"], 1, "% gives the remainder: 7 divided by 2 leaves 1."],
        ],
      },
      {
        slug: "if-elif-else", title: "Making Decisions with if, elif and else", mins: 10,
        summary: "Make your program choose between actions using conditions and indentation.",
        body: [
          ["p", "A program often needs to choose. `if` runs a block of code only when a condition is `True`. The block is the indented lines under it, and the line ends with a colon."],
          ["code", "python", `age = 17
if age >= 18:
    print("You can vote")
else:
    print("Not old enough yet")`],
          ["h", "More than two choices with elif"],
          ["code", "python", `marks = 72
if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "Fail"
print("Grade:", grade)   # Grade: C`],
          ["p", "Python checks from the top and runs only the first block that matches."],
          ["h", "Combining conditions and using in"],
          ["code", "python", `day = "Sunday"
if day == "Saturday" or day == "Sunday":
    print("Weekend")

fruit = "mango"
if fruit in ["apple", "mango", "banana"]:
    print("We have it")`],
          ["h", "Empty means False"],
          ["p", "Empty values count as false in a condition: an empty string, `0`, and an empty list. So `if name:` is true only when `name` is not empty."],
          ["h", "Mistakes to avoid"],
          ["ul", ["Writing `=` when you mean `==`.", "Forgetting the colon at the end of the line.", "Wrong indentation. Use 4 spaces for every line in the block."]],
          ["task", "Ask the user for a number and print whether it is even or odd. Hint: use `%`."],
        ],
        quiz: [
          ["Which operator checks if two values are equal?", ["=", "==", "=>", "!"], 1, "== compares. A single = stores a value."],
          ["What must come at the end of an if line?", ["A semicolon", "A colon", "A bracket", "Nothing"], 1, "Python needs a colon, then an indented block."],
          ["With marks = 60 in the grade example, what is the grade?", ["A", "B", "C", "Fail"], 2, "60 is not above 75, but it is at least 50, so the answer is C."],
        ],
      },
      {
        slug: "loops", title: "Loops: Repeat Work with for and while", mins: 11,
        summary: "Repeat code with for and while, and control loops with break and continue.",
        body: [
          ["p", "A loop repeats code so you do not have to write it again and again."],
          ["h", "The for loop and range()"],
          ["p", "`range(1, 6)` gives the numbers 1 to 5. The end number is not included."],
          ["code", "python", `for i in range(1, 6):
    print(i)`],
          ["p", "`range(5)` gives 0 to 4, and `range(0, 10, 2)` gives 0, 2, 4, 6, 8. A for loop also works on text and lists:"],
          ["code", "python", `for letter in "Hi!":
    print(letter)`],
          ["h", "The while loop"],
          ["p", "A while loop keeps going as long as its condition is true. Make sure something inside changes the condition, or the loop never ends."],
          ["code", "python", `count = 1
while count <= 3:
    print("Round", count)
    count += 1`],
          ["h", "break and continue"],
          ["p", "`break` leaves the loop. `continue` skips to the next round."],
          ["code", "python", `for n in range(1, 11):
    if n == 3:
        continue
    if n == 6:
        break
    print(n)   # prints 1 2 4 5`],
          ["h", "Two small examples"],
          ["code", "python", `# Multiplication table of 7
for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")

# Sum of 1 to 100
total = 0
for n in range(1, 101):
    total += n
print(total)   # 5050`],
          ["task", "Print all even numbers from 1 to 50 and then print their total."],
        ],
        quiz: [
          ["What does range(3) produce?", ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3"], 1, "range(3) starts at 0 and stops before 3."],
          ["What does break do?", ["Skips one round", "Leaves the loop", "Restarts the loop", "Stops the program"], 1, "break ends the loop immediately."],
          ["What is the sum of 1 to 100?", ["5000", "5050", "5100", "4950"], 1, "1 + 2 + ... + 100 = 5050."],
        ],
      },
      {
        slug: "lists-tuples-dicts-sets", title: "Lists, Tuples, Dictionaries and Sets", mins: 14,
        summary: "Store many values together and pick the right collection for the job.",
        body: [
          ["h", "Lists"],
          ["p", "A list holds many items in order. Counting starts at 0, and a negative index counts from the end."],
          ["code", "python", `fruits = ["apple", "banana", "mango"]
print(fruits[0])      # apple
print(fruits[-1])     # mango
fruits.append("grapes")
fruits.remove("banana")
print(fruits)         # ['apple', 'mango', 'grapes']
print(len(fruits))    # 3
print(fruits[0:2])    # ['apple', 'mango']`],
          ["h", "Tuples"],
          ["p", "A tuple is like a list that cannot be changed after you create it. Use it for fixed data such as a point."],
          ["code", "python", `point = (10, 20)
x, y = point
print(x, y)   # 10 20`],
          ["h", "Dictionaries"],
          ["p", "A dictionary stores key-value pairs. You look up a value by its key."],
          ["code", "python", `student = {"name": "Asha", "age": 19, "city": "Rohtak"}
print(student["name"])        # Asha
student["age"] = 20
student["course"] = "BCA"
print(student.get("phone", "not given"))  # not given
for key, value in student.items():
    print(key, ":", value)`],
          ["h", "Sets"],
          ["p", "A set keeps only unique values. It is a quick way to remove duplicates."],
          ["code", "python", `numbers = [1, 2, 2, 3, 3, 3]
unique = set(numbers)
print(unique)   # {1, 2, 3}`],
          ["h", "Which one to use?"],
          ["table", ["Type", "Ordered", "Changeable", "Use it for"], [["list", "Yes", "Yes", "A collection that grows or shrinks"], ["tuple", "Yes", "No", "Fixed data"], ["dict", "Yes (by insertion)", "Yes", "Looking things up by name"], ["set", "No", "Yes", "Unique values"]]],
          ["task", "Make a list of five marks. Print the highest, the lowest and the average using `max()`, `min()` and `sum()` divided by `len()`."],
        ],
        quiz: [
          ["What is the index of the first item in a list?", ["0", "1", "-1", "first"], 0, "Python counts from 0."],
          ["Which collection removes duplicates?", ["list", "tuple", "set", "dict"], 2, "A set stores each value only once."],
          ["How do you read a value from a dictionary?", ["By its key", "By its colour", "Only by loop", "By its length"], 0, "student[\"name\"] looks up the value with the key “name”."],
        ],
      },
      {
        slug: "functions", title: "Functions: Reuse Your Code", mins: 12,
        summary: "Write your own functions with parameters, return values and default arguments.",
        body: [
          ["p", "A function is a named block of code you can run whenever you need it. You define it with `def`."],
          ["code", "python", `def greet(name):
    print("Hello,", name)

greet("Asha")
greet("Ravi")`],
          ["h", "Returning a value"],
          ["p", "`return` sends a value back to the place that called the function."],
          ["code", "python", `def add(a, b):
    return a + b

result = add(3, 4)
print(result)   # 7`],
          ["note", "`print()` only shows something on the screen. `return` gives the value back so you can use it again."],
          ["h", "Default values"],
          ["code", "python", `def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25
print(power(2, 3))   # 8`],
          ["h", "Scope"],
          ["p", "A variable created inside a function exists only inside that function. This keeps functions independent and easy to test."],
          ["h", "A realistic example"],
          ["code", "python", `def bill_with_gst(amount, rate=18):
    """Return the total after adding GST."""
    return amount + amount * rate / 100

print(bill_with_gst(1000))      # 1180.0
print(bill_with_gst(1000, 5))   # 1050.0`],
          ["p", "The text in triple quotes is a docstring. It explains what the function does."],
          ["task", "Write a function `max_of_three(a, b, c)` that returns the largest number without using `max()`."],
        ],
        quiz: [
          ["Which keyword defines a function?", ["func", "def", "function", "define"], 1, "Python uses def."],
          ["What is the difference between print and return?", ["No difference", "print shows output, return gives a value back", "return shows output", "print stops the function"], 1, "return hands a value to the caller; print only displays it."],
          ["With the power function above, what is power(4)?", ["8", "16", "4", "Error"], 1, "The default exponent is 2, so 4 ** 2 is 16."],
        ],
      },
      {
        slug: "files-and-errors", title: "Files and Handling Errors", mins: 13,
        summary: "Read and write text files, and stop your program from crashing with try and except.",
        body: [
          ["h", "Writing a file"],
          ["p", "Use `with open(...)`. It closes the file for you automatically, even if something goes wrong."],
          ["code", "python", `with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Line one\\n")
    f.write("Line two\\n")`],
          ["h", "Reading a file"],
          ["code", "python", `with open("notes.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())`],
          ["table", ["Mode", "Meaning"], [["\"r\"", "Read (the default)"], ["\"w\"", "Write, and erase the old content"], ["\"a\"", "Append to the end"]]],
          ["h", "Handling errors"],
          ["p", "When something goes wrong, Python raises an error and stops. With `try` and `except` you can catch it and carry on."],
          ["code", "python", `try:
    number = int(input("Enter a number: "))
    print(10 / number)
except ValueError:
    print("That was not a number.")
except ZeroDivisionError:
    print("You cannot divide by zero.")`],
          ["h", "A file that may not exist"],
          ["code", "python", `try:
    with open("missing.txt") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found.")`],
          ["note", "Catch the specific error you expect, not every error. That way real bugs are not hidden."],
          ["task", "Write a program that asks for a note, appends it to `notes.txt` and then prints every note in the file."],
        ],
        quiz: [
          ["Which file mode adds text to the end?", ["\"r\"", "\"w\"", "\"a\"", "\"x\""], 2, "\"a\" means append. \"w\" would erase the old content."],
          ["Why use with open(...)?", ["It runs faster", "It closes the file automatically", "It encrypts the file", "It is required for reading"], 1, "with closes the file for you, even after an error."],
          ["Which error does int(\"abc\") raise?", ["TypeError", "ValueError", "NameError", "IndexError"], 1, "The type is right (a string) but the value cannot become a number."],
        ],
      },
      {
        slug: "project-number-guessing-game", title: "Mini Project: Number Guessing Game", mins: 15,
        summary: "Put everything together and build a number guessing game with functions, loops and error handling.",
        body: [
          ["p", "Time to use what you learned. The computer picks a secret number from 1 to 100 and you keep guessing. After every guess it says “Too low” or “Too high”."],
          ["code", "python", `import random

def get_guess():
    while True:
        text = input("Your guess (1-100): ")
        try:
            return int(text)
        except ValueError:
            print("Please type a whole number.")

def play():
    secret = random.randint(1, 100)
    tries = 0
    while True:
        guess = get_guess()
        tries += 1
        if guess < secret:
            print("Too low")
        elif guess > secret:
            print("Too high")
        else:
            print(f"Correct! You took {tries} tries.")
            break

play()`],
          ["h", "How it works"],
          ["ul", ["`import random` lets us use `random.randint(1, 100)`, which picks a whole number from 1 to 100, both ends included.", "`get_guess()` keeps asking until the user types a valid whole number. This is where `try` and `except` protect the game from crashing.", "`play()` holds the main loop. `if`, `elif` and `else` compare the guess with the secret.", "`break` leaves the loop when the guess is right."]],
          ["h", "Challenges"],
          ["ul", ["Allow only 7 tries and print the secret number if the player loses.", "Ask “Play again? (y/n)” after each game.", "Let the player choose the range: easy 1 to 10, hard 1 to 1000.", "Save the best score in a file."]],
          ["p", "Finished? Put your project on GitHub. A real project in your profile says more than any certificate."],
          ["task", "Add the 7-tries limit from the first challenge."],
        ],
        quiz: [
          ["Does random.randint(1, 100) include 100?", ["Yes", "No", "Only sometimes", "Only 1"], 0, "randint includes both end values."],
          ["Why is int(text) inside try and except?", ["To make it faster", "So typing letters does not crash the game", "To hide the secret number", "It is not needed"], 1, "Without it, typing letters would raise a ValueError and stop the program."],
          ["What does break do in play()?", ["Restarts the game", "Leaves the loop after a correct guess", "Deletes the secret", "Prints the answer"], 1, "It ends the while loop when the guess is correct."],
        ],
      },
    ],
  },
  {
    slug: "cloud-computing", title: "Cloud Computing Basics", short: "Cloud Computing", level: "Beginner",
    desc: "Understand cloud computing from scratch: IaaS, PaaS, SaaS, regions, security, costs and your first deployment. Free, chapter by chapter, in simple English.",
    intro: "No cloud account or coding needed to follow the ideas. Each chapter explains one concept with everyday examples, compares AWS, Azure and Google Cloud where it helps, and ends with a short quiz. The last chapter walks you through putting a real page on the internet.",
    outcomes: ["Explain what cloud computing is and why it is used", "Tell IaaS, PaaS, SaaS and serverless apart", "Know public, private and hybrid cloud", "Name the core building blocks and their AWS, Azure and Google Cloud equivalents", "Understand regions, zones and reliability", "Follow basic cloud security habits", "Avoid surprise bills and deploy your first site"],
    chapters: [
      {
        slug: "what-is-cloud-computing", title: "What Is Cloud Computing?", mins: 8,
        summary: "Understand cloud computing in simple words, with everyday examples and its five key traits.",
        body: [
          ["p", "Cloud computing means using computing resources such as servers, storage, databases and software over the internet, instead of owning and running them yourself. You rent what you need and pay for what you use."],
          ["h", "A simple comparison"],
          ["p", "Think of electricity. You do not build a power plant at home. You plug in, use power and pay the bill. Cloud computing works the same way for computing power."],
          ["h", "Cloud services you already use"],
          ["ul", ["Gmail and Google Drive keep your mail and files on Google’s servers.", "Netflix streams videos from servers around the world.", "UPI apps run on servers that process millions of payments."]],
          ["h", "Five key traits"],
          ["p", "The US standards body NIST describes cloud computing with five traits:"],
          ["table", ["Trait", "What it means"], [["On-demand self-service", "You create resources yourself, in minutes, without calling anyone"], ["Broad network access", "You reach them over the internet from any device"], ["Resource pooling", "Many customers share the same large pool of hardware"], ["Rapid elasticity", "You can grow or shrink quickly as demand changes"], ["Measured service", "Usage is measured, so you pay for what you use"]]],
          ["h", "Why businesses use it"],
          ["ul", ["No big upfront cost for servers.", "Start small and scale when customers grow.", "The provider looks after the physical data centres.", "Reach customers in different places with faster access."]],
          ["h", "The trade-offs"],
          ["ul", ["You depend on your provider and your internet connection.", "Costs can grow quietly if you do not watch them.", "You still have to secure your own data and settings."]],
        ],
        quiz: [
          ["What does cloud computing mean?", ["Buying your own servers", "Using computing resources over the internet and paying for use", "Only storing photos online", "A type of weather software"], 1, "You rent resources from a provider instead of owning them."],
          ["Which trait means you can grow or shrink quickly?", ["Measured service", "Rapid elasticity", "Broad network access", "Resource pooling"], 1, "Rapid elasticity is about scaling up and down with demand."],
          ["Which is an everyday example of cloud service?", ["A calculator app that works offline", "Gmail", "A printed book", "A pen drive"], 1, "Gmail stores and serves your mail from the provider’s servers."],
        ],
      },
      {
        slug: "iaas-paas-saas", title: "Service Models: IaaS, PaaS, SaaS and Serverless", mins: 10,
        summary: "Learn who manages what in IaaS, PaaS and SaaS, with real examples of each.",
        body: [
          ["p", "Cloud services come in layers. The higher the layer, the less you manage and the more the provider handles for you."],
          ["h", "IaaS: Infrastructure as a Service"],
          ["p", "You rent basic building blocks: virtual machines, storage and networks. You install the operating system and your software. Examples: Amazon EC2, Azure Virtual Machines, Google Compute Engine."],
          ["h", "PaaS: Platform as a Service"],
          ["p", "You bring your code. The provider runs the servers, operating system and runtime for you. Examples: Google App Engine, Azure App Service, Render."],
          ["h", "SaaS: Software as a Service"],
          ["p", "You simply use a finished application in your browser. Examples: Gmail, Zoho, Canva, Google Docs."],
          ["h", "Serverless (FaaS)"],
          ["p", "You write small functions and the provider runs them only when needed, so you do not manage servers at all and pay for the time they run. Examples: AWS Lambda, Azure Functions, Google Cloud Functions."],
          ["h", "Who manages what"],
          ["table", ["Layer", "You manage", "Provider manages"], [["IaaS", "OS, runtime, app, data", "Hardware, network, virtualisation"], ["PaaS", "App and data", "OS, runtime, servers, network"], ["SaaS", "Your content and settings", "Everything else"]]],
          ["note", "A simple way to remember: IaaS is renting a kitchen, PaaS is ordering ingredients and cooking, SaaS is eating at a restaurant."],
        ],
        quiz: [
          ["Which model gives you a virtual machine to set up yourself?", ["SaaS", "PaaS", "IaaS", "None"], 2, "IaaS gives you the basic infrastructure; you manage the rest."],
          ["Gmail is an example of…", ["IaaS", "PaaS", "SaaS", "Serverless"], 2, "You use a finished app in the browser: SaaS."],
          ["In PaaS, who manages the operating system?", ["You", "The provider", "Nobody", "The customer’s customer"], 1, "PaaS hides the OS and servers; you bring only code and data."],
        ],
      },
      {
        slug: "public-private-hybrid-cloud", title: "Public, Private and Hybrid Cloud", mins: 7,
        summary: "Compare cloud deployment models and when an organisation picks each one.",
        body: [
          ["p", "Service models say what you get. Deployment models say where it runs and who it is shared with."],
          ["h", "Public cloud"],
          ["p", "Run by a provider such as AWS, Microsoft Azure or Google Cloud, and shared by many customers (kept separate from each other). It is the fastest to start and the most common choice for startups and small businesses."],
          ["h", "Private cloud"],
          ["p", "Used by a single organisation, either in its own data centre or hosted for it. It gives more control but needs more money and skilled people."],
          ["h", "Hybrid cloud"],
          ["p", "A mix of private and public cloud that work together. For example, sensitive records stay in a private system while a public website runs in the public cloud."],
          ["h", "Multi-cloud"],
          ["p", "Using more than one public cloud provider, for example to avoid depending on a single vendor or to use the best service from each."],
          ["table", ["Model", "Who uses it", "Main benefit", "Main drawback"], [["Public", "Most startups and businesses", "Low cost, quick start", "Less control over the hardware"], ["Private", "Large or regulated organisations", "Control", "Higher cost and effort"], ["Hybrid", "Organisations with mixed needs", "Flexibility", "More complex to manage"]]],
        ],
        quiz: [
          ["Which model is shared by many customers and run by a provider?", ["Private", "Public", "On-premises", "Local"], 1, "That is the public cloud."],
          ["What is hybrid cloud?", ["Two phones", "A mix of private and public cloud", "Only AWS", "A free plan"], 1, "Hybrid combines private and public cloud."],
          ["What does multi-cloud mean?", ["One server", "Using more than one public cloud provider", "A cloud with many users", "Very large storage"], 1, "It means using services from several providers."],
        ],
      },
      {
        slug: "core-building-blocks", title: "Core Building Blocks: Compute, Storage, Database and Network", mins: 12,
        summary: "Learn the four basic cloud building blocks and their AWS, Azure and Google Cloud names.",
        body: [
          ["p", "Every cloud app is built from a few basic parts. Once you know these, any provider’s catalogue looks familiar."],
          ["h", "Compute"],
          ["p", "The power that runs your code: virtual machines, containers or serverless functions."],
          ["h", "Storage"],
          ["ul", ["Object storage for files like images, videos and backups.", "Block storage, like a hard disk attached to a virtual machine.", "File storage, a shared folder many machines can use."]],
          ["h", "Databases"],
          ["p", "Managed databases store your data and the provider handles patching and backups. Relational (SQL) databases use tables; NoSQL databases use other shapes such as documents."],
          ["h", "Networking"],
          ["p", "A virtual network isolates your resources. A load balancer spreads traffic across servers, DNS turns names like example.com into addresses, and a CDN keeps copies of your content close to users."],
          ["h", "Names across the big three"],
          ["table", ["Building block", "AWS", "Azure", "Google Cloud"], [["Virtual machine", "EC2", "Virtual Machines", "Compute Engine"], ["Object storage", "S3", "Blob Storage", "Cloud Storage"], ["Serverless function", "Lambda", "Functions", "Cloud Functions"], ["Managed SQL database", "RDS", "Azure SQL Database", "Cloud SQL"], ["Virtual network", "VPC", "Virtual Network", "VPC"], ["Identity and access", "IAM", "Microsoft Entra ID and Azure RBAC", "IAM"]]],
          ["note", "Product names change over time. Treat this table as a map and check each provider’s documentation for the current names."],
        ],
        quiz: [
          ["Which storage type suits images and backups?", ["Object storage", "RAM", "Cache memory", "Printer"], 0, "Object storage like S3 is made for files."],
          ["What does a CDN do?", ["Writes code", "Keeps copies of content close to users", "Encrypts passwords", "Deletes data"], 1, "A CDN makes content load faster by serving it from nearby."],
          ["Which is the Google Cloud name for object storage?", ["S3", "Blob Storage", "Cloud Storage", "RDS"], 2, "Cloud Storage is Google’s object storage."],
        ],
      },
      {
        slug: "regions-and-reliability", title: "Regions, Zones and Reliability", mins: 9,
        summary: "Understand regions and availability zones, and how cloud apps stay online when something fails.",
        body: [
          ["p", "Cloud providers run data centres all over the world. They group them so you can choose where your app lives and how well it survives failures."],
          ["h", "Regions and zones"],
          ["ul", ["A region is a geographic area, for example Mumbai or Frankfurt.", "A region contains several availability zones, which are separate data centres with their own power and networking.", "Zones in one region are connected by fast links but fail independently."]],
          ["p", "For example, AWS has an Asia Pacific (Mumbai) region named ap-south-1. Azure and Google Cloud also have regions in India. Check the current list in each provider’s documentation."],
          ["h", "Choosing a region"],
          ["ul", ["Closer to your users means lower delay (latency).", "Some data may need to stay in a certain country because of rules.", "Prices and available services can differ between regions."]],
          ["h", "High availability"],
          ["p", "High availability means your app keeps working even if one part fails. The usual method is redundancy: run copies in more than one zone behind a load balancer, so if one zone goes down the others carry on."],
          ["h", "Backups and disaster recovery"],
          ["p", "A backup is a copy of your data. A disaster recovery plan says how fast you can get running again if a whole region has a problem, and how much data you can afford to lose. Test restoring a backup, because a backup you have never restored is only a hope."],
        ],
        quiz: [
          ["What is an availability zone?", ["A shopping area", "A separate data centre inside a region", "A type of database", "A password"], 1, "Zones are separate data centres in the same region."],
          ["Why choose a region close to your users?", ["It is always free", "Lower latency", "Better passwords", "More storage"], 1, "Shorter distance means faster responses."],
          ["How do you usually make an app highly available?", ["Run copies in more than one zone", "Use one big server", "Turn it off at night", "Hide it"], 0, "Redundancy across zones keeps the app up if one zone fails."],
        ],
      },
      {
        slug: "cloud-security-basics", title: "Cloud Security Basics", mins: 11,
        summary: "Learn the shared responsibility model, IAM, MFA and how to keep secret keys out of your code.",
        body: [
          ["p", "The cloud can be very secure, but most cloud problems come from settings and mistakes on the customer side, not from the provider."],
          ["h", "Shared responsibility"],
          ["p", "The provider secures the physical data centres and the base platform. You are responsible for your data, your accounts, your passwords and how you configure things. The more you manage yourself (IaaS), the more you must secure."],
          ["h", "Identity and access (IAM)"],
          ["ul", ["Give each person their own login. Do not share one account.", "Use the principle of least privilege: give only the permissions a person or app really needs.", "Turn on multi-factor authentication (MFA), especially for admin accounts.", "Do not use the root or owner account for daily work."]],
          ["h", "Keep secrets out of your code"],
          ["p", "API keys, tokens and passwords must never be written in your code or pushed to GitHub. Keep them in environment variables or a secrets manager instead."],
          ["code", "bash", `# .env  (never commit this file)
API_KEY=your-secret-here`],
          ["code", "bash", `# .gitignore
.env`],
          ["code", "python", `import os

api_key = os.environ["API_KEY"]`],
          ["note", "If a key ever leaks, revoke it immediately and create a new one. Deleting the file from GitHub is not enough because the old version stays in the history."],
          ["h", "Protect data"],
          ["ul", ["Use HTTPS so data is encrypted while it travels.", "Turn on encryption at rest for storage and databases.", "Keep storage private by default. Public buckets have exposed many companies’ files.", "Back up important data and test the restore."]],
        ],
        quiz: [
          ["Who is responsible for your passwords and data in the cloud?", ["Only the provider", "You, the customer", "Nobody", "The internet"], 1, "Under shared responsibility, customers secure their own data and accounts."],
          ["What does least privilege mean?", ["Give everyone admin access", "Give only the permissions that are needed", "Use the cheapest plan", "Never use passwords"], 1, "Limiting permissions limits the damage from a mistake or attack."],
          ["Where should API keys be stored?", ["In the code on GitHub", "In environment variables or a secrets manager", "In a public chat", "In the page’s HTML"], 1, "Keys in code or on GitHub can be found and misused."],
        ],
      },
      {
        slug: "cloud-costs-and-free-tiers", title: "Cloud Costs and Free Tiers", mins: 8,
        summary: "Understand pay-as-you-go pricing and the habits that stop surprise bills.",
        body: [
          ["p", "Cloud pricing is flexible, which is great, but it also means a forgotten resource can quietly cost money."],
          ["h", "How you are charged"],
          ["ul", ["Pay as you go: you pay for the time or amount you use, such as hours of a virtual machine, GB stored or number of requests.", "Reserved or committed plans: you promise to use a service for a longer time in return for a lower price.", "Free tiers: many providers offer free usage for a limited amount or time. The rules change, so always read the provider’s current free tier page."]],
          ["h", "Common surprises"],
          ["ul", ["A virtual machine left running after you finish practising.", "Data transfer out of the cloud to the internet, which is often charged.", "Storage and snapshots you forgot about.", "Test projects with large traffic or an unlimited loop."]],
          ["h", "Habits that save money"],
          ["ul", ["Set a budget and billing alerts on the very first day.", "Delete or stop resources when you finish learning.", "Choose the smallest size that works, and grow later.", "Tag resources with a project name so you can see who spends what.", "Review the bill every month."]],
          ["note", "Learning tip: use free tiers, set an alert for a very small amount, and practise one topic at a time."],
        ],
        quiz: [
          ["What is pay-as-you-go?", ["A fixed yearly fee", "Paying for what you use", "Free forever", "Paying after you cancel"], 1, "You are charged for the resources you actually use."],
          ["Which is a common cause of surprise bills?", ["A forgotten running virtual machine", "A short password", "A blue logo", "A mobile app"], 0, "Resources keep charging until you stop or delete them."],
          ["What should you set up on day one?", ["A budget and billing alerts", "A bigger server", "A public bucket", "A second account"], 0, "Alerts warn you early, before the bill grows."],
        ],
      },
      {
        slug: "deploy-your-first-site", title: "Deploy Your First Site to the Internet", mins: 14,
        summary: "Put a real web page online using GitHub and a hosting platform, step by step.",
        body: [
          ["p", "Now let us use the cloud. We will publish a simple page with GitHub and a hosting platform such as Vercel or Netlify. Both have free plans, but check their current limits first."],
          ["h", "Step 1: Create the page"],
          ["p", "Make a folder called `my-first-site` and a file inside it named `index.html`:"],
          ["code", "html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first site</title>
</head>
<body>
  <h1>Hello from the cloud</h1>
  <p>This page is hosted on the internet.</p>
</body>
</html>`],
          ["h", "Step 2: Push it to GitHub"],
          ["p", "Create an empty repository on GitHub, then run these commands inside your folder. Replace YOUR-NAME with your GitHub username:"],
          ["code", "bash", `git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/my-first-site.git
git push -u origin main`],
          ["h", "Step 3: Import it into a host"],
          ["p", "Sign in to Vercel or Netlify with GitHub, choose “Import” or “Add new site”, pick your repository and press Deploy. After a minute you get an https address."],
          ["h", "What just happened"],
          ["ul", ["The platform pulled your code from GitHub.", "It built and deployed it to servers in the cloud.", "A CDN now serves your page from locations close to visitors.", "Every time you push a change to GitHub, it redeploys automatically."]],
          ["h", "Next steps"],
          ["ul", ["Connect your own domain name.", "Add environment variables for secret keys, never in the code.", "Try a small serverless function for a contact form."]],
          ["note", "You can also do these steps from a chat. Easy DevOps, a tool I built, creates the repo, pushes files and deploys to Vercel, Netlify or Render from a chat message."],
          ["task", "Deploy the page above, then change the heading, push again and watch the live site update."],
        ],
        quiz: [
          ["What does a hosting platform do after you import your repo?", ["Deletes it", "Builds and deploys it to the cloud", "Sends an email only", "Nothing"], 1, "It builds your project and serves it over the internet."],
          ["Where should secret keys be added on a host?", ["In the HTML", "As environment variables", "In the page title", "In the README"], 1, "Environment variables keep secrets out of your code."],
          ["What happens when you push a new commit?", ["Nothing", "The site redeploys automatically", "The repo is deleted", "The domain changes"], 1, "Most platforms redeploy on every push."],
        ],
      },
    ],
  },
];
export const courseBySlug = (s) => courses.find((c) => c.slug === s);
export const totalMins = (c) => c.chapters.reduce((a, x) => a + x.mins, 0);
