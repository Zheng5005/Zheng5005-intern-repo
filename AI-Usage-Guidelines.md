## When should you **use AI** for assistance?
- When you're still stuck and you already google it, ask ChatGPT, or search for a similar problem
- When you already know about the subject you're are working on
- When you have a secure environment for the AI, it can be Git/Github or a test environment where nothing can be damage even if the AI gets something wrong
## When should you rely on your own skills?
- When you want to learn about something
- When you need to refactor the code for best practices
- When you're working in something advance that really needs some serious debugging skills
## How can you **avoid over-reliance** on AI while still benefiting from it?
- Ask for questions not solutions when you are learning something
- Use AI when you already know enough of the subject to refactor the code, think like you are a "senior" developer reviewing the code of a Junior developer
- Use AI for things that are simple and repetitive to improve productivity
- Use AI to write the code (it still needs refactoring) but don't rely for it to think about the solution you want to implement.
## What steps will you take to **ensure data privacy** when using AI tools?
- Don't copy and paste the code into a chat bot, I'll use custom code snippets to mimic the real code, but maintaining the same goal.
- Don't pass private keys or tokens
- If there's use of agentic AI, I'll be supervising the command that AI wants to executes, I will never run it with full permisions
## Best practice I will be using in Focus Bear
- Iterate multiples times over a solution in order to improve the initial code, I won't push a code that AI returns the first time.

## Task that I improve with an AI
For this specific task I already have a personal project, which is a Spotify clone made to learn and apply more React knowlegde, and I use 2 AI tools:
- ChatGPT for the majority of the project
- Gemini CLI for about a week

The result are:
- ChatGPT worked well, mainly cause I ask for specific questions instead of asking broad ones, for example I asked for a UI design for my Song and Album page, the AI return a pretty good UI, but it was all the same React component, meaning the table, header and everything was in the same file (see ./proofs/ChatGPTBigComponent.png), so it was needed to split this pieces into independent components in order to make a more reusable design for the Song and Album page
- Gemini CLI on the other hand was kinda all over the place, I use it to trying to fix a bug with the Progress bar, it was making the song sound laggy, my theory was it had something to do with how many times the global state was changing, so I ask Gemeni CLI to fix it (see ./proofs/GeminiCLIRequest.png), but it turn out worse, the song sounded even more laggy.

At the end of the day I think the fact that I'm more experience with ChatGPT play a bigger role than Gemini CLI capabilities to write and fix code, I'll be trying out and learning more about agentic AI, I'm going to take this repository as a guide (even though is specific for Claude Code, there's some concepts that can be apply to Gemini CLI):
https://github.com/affaan-m/everything-claude-code