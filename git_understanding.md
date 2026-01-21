# Issue #47
## Why are PRs important in a team workflow?
It allows for a code review and better collaboration in teams, all without getting in the way of the main branch, so final users can have an updated version of the product without any issues related with differences in the code.

It also create a discussion space for a feature, this can be later be used as a documentation of the decision made to that specific PR.
## What makes a well-structured PR?
- Clear Title that is descriptive enough
- A good description
	- What changed
	- Why it was needed
	- How to test it
- It needs to be clear, small and concise, with only one scope (it only resolves 1 issue, not 20)
- Commits need to readable, with clear messages
- In the case of UI, it needs Screenshots or demos
- It needs to have a linked issue or ticket, in order to give the other person more context

In a few word, a PR needs to be understood without asking the author 20 questions.
## What did you learn from reviewing an open-source PR?
- How more experience developers open clear and concise PR's, with all the context required, and explaining in a clear way what problems fix that PR in particular
- How people give feedback with professionalism.
- How standard (tests, format, documentation, etc) it required in most Teams
- In some PR, some design decisions were made, which gave me more insights of how that kind of decisions are made.
# Issue #48
## What makes a good commit message?
- Is clear and specific, it explains what changed, not only "update things":
	- Bad: "fix stuff"
	- Good: "Fix crash when submitting empty login form"
- Isn't long
- It start with a verb:
	- Add
	- Fix
	- Remove
	- Refactor
	- Update
	- Improve
	- etc
- Describes 1 logical change
- Follow the team's format

Sometimes it can include a longer description that explain why the change was made
## How does a clear commit message help in team collaboration? 
- Let the person understand intimidatingly what changed without further explanation
- Make code reviews easier and faster
- Help newcomers to understand the project history
- Make it easier to find changes using `git log`
## How can poor commit messages cause issues later?
- Make it harder to debug when tracking where the bug started
- Wastes time cause people must read the code in order to understand what changed
- Hide important decisions or braking changes
- Make reverts and cherry-picks risky because it's unclear what commit actually does
