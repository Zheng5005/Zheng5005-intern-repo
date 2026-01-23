## Which AI tools did you try?
During my college experience I always rely on ChatGPT for questions and some implementations, but in this last days I've been trying other AI's tools like Gemini and Claude
## What worked well? What didn’t?
In my experience, maybe it's because I'm still starting to use Agentic AI, when you ask questions and snippets of code in a Chatbot, it works pretty well although still needs a code review to adjust it to the project needs, styles, etc.

But agentic AI, although powerful, give the impression that it requires a pay model in order to be more helpful, I tried it in a personal project, a Spotify clone, to fix a bug that makes the played song sound pretty laggy, and at first glance it solved the bug, but the moment I run it it sounded even worse.
Although I have to admit that the AI could identify the piece of code that is causing the bug without any assistance.
## When do you think AI is most useful for coding?
- To learn something, it can be use as a personal teacher to ask questions
- When you already know the thing you are asking for, a implementation for example, so you can review the code that the AI returns, boosting productivity
- Repetitive tasks
## Task that I improve with an AI
For this specific task I already have a personal project, which is a Spotify clone made to learn and apply more React knowlegde, and I use 2 AI tools:
- ChatGPT for the majority of the project
- Gemini CLI for about a week

The result are:
- ChatGPT worked well, mainly cause I ask for specific questions instead of asking broad ones, for example I asked for a UI design for my Song and Album page, the AI return a pretty good UI, but it was all the same React component, meaning the table, header and everything was in the same file (see ./proofs/ChatGPTBigComponent.png), so it was needed to split this pieces into independent components in order to make a more reusable design for the Song and Album page
- Gemini CLI on the other hand was kinda all over the place, I use it to trying to fix a bug with the Progress bar, it was making the song sound laggy, my theory was it had something to do with how many times the global state was changing, so I ask Gemeni CLI to fix it (see ./proofs/GeminiCLIRequest.png), but it turn out worse, the song sounded even more laggy, the AI start using deprecated native functions related to the tag <audio> in html

At the end of the day I think the fact that I'm more experience with ChatGPT play a bigger role than Gemini CLI capabilities to write and fix code, I'll be trying out and learning more about agentic AI, I'm going to take this repository as a guide (even though is specific for Claude Code, there's some concepts that can be apply to Gemini CLI):
https://github.com/affaan-m/everything-claude-code