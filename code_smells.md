## What code smells did you find in your code?
- Variables names with not descriptive names
- Magic number and strings without an explanation
- Nested if statements
- A God Object that tries to manage everything
## How did refactoring improve the readability and maintainability of the code?
- By splitting the God Object, it made some functions more testable
- Getting rid of Magic number and strings made for more centralized constants, meaning that if in the future those number change, it can be easier to implement that.
- Deleting nested if statements make more readable code
## How can avoiding code smells make future debugging easier?
By avoiding code smells, the code can be more maintainable in the long run, without things like **Magic number and strings** or **Long functions** new developers can approach the codebase without much stress, also code smells like **God objects** makes the codebase to loaded and makes code  review very hard.
