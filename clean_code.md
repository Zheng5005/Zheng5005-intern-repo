Clean code puts emphasis on writing code that is not only readable for computers, but also for humans, as more often than not, code is more often read than written, for this purpose clean code follow some principles that can be summarized as: 
- **Simplicity**: The code should be simple and focused, try to avoid over-complicated lines just to seem more clever.
- **Readability**: A clean code should be easy to read, like you're reading a well-written book, this makes the code understandable by anyone on the team, which means the code will be easier to maintain and extend in the long run
- **Maintainability**: a clean code should be easy to read, test, extend and modify, your future self and your co-workers will thank you for it, you can achieve this by:
	- Naming your variables with meaningful names
	- Writing small focused functions
	- Avoiding tricky one-liners if is too difficult to read, following the **Readability** principle
- **Consistency**: This is different in every project, but is important to follow the style and conventions of the project you are working on, a project with many files with a whole different style of writing code can be overwhelming and hard to maintain.
- **Efficiency**: Performance matters, but clean code favors simple, clear solutions over over-engineering. Optimize when necessary, but avoid designing overly complex solutions for problems that may never exist.
---
## What makes a good variable or function name?
- It clearly communicates intent, the person reading the code needs to be able to understand it without extra comments
- They are descriptive and specific
- Have consistency conventions (camelCase, PascalCase, etc)
- If the function is action based, it in the name (fetchUsers, getData, etc)
- If the variable is a boleean should reflect that (prefix with: is, has, can, should)
## What issues can arise from poorly named variables?
- It could lead to confusion
- It could lead to bugs cause of the misunderstanding of an implementation
- It makes code reviews slower cause of the extra mental load that required to understand the code 
- It makes refactoring harder
## How did refactoring improve code readability
- Now it has a understandable goal
- It can be understandable without testing and making questions
- It now can be code review and change more easily
