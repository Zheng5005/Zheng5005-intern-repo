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
# Issue #52
## Why is pushing directly to `main` problematic?
It can cause numerous problems:
- A bug or bad design solutions can go to production stage immediately
- If a bug or any problem is in main, everyone in the team will have the same problem in their local main branch.
- Related to the previous ones, there's no safety net for someone new to the project, an intern can push a bug without notice it and go to production
- There will be no space for discussion nor code reviews
- Fixing bad commit in the main branch can be quiet messy
## How do branches help with reviewing code?
- Isolates changes into another branch and PR, making them more focused to the problem they are trying to solve
- Allows for discussions and code reviews easily
- Make it easier to identify bug in early states
## What happens if two people edit the same file on different branches?
It depends on what they work:
- If they worked in the same file and same lines
    - Git creates a merge conflict
    - In this case someone needs to open that file and choose which version (or just combine them) to keep.
- If they worked in the same file but different lines
    - Git will merge the changes
# Issue #53
## What is the difference between staging and committing?
**Staging**: this means choosing which changes will be in the next commit, it just prepare them, you can still add or restore any changes at this stage without extra work

**Commiting**: this means that the stage changes from the previous stage are store as snapshot in git, meaning now they being recorded (in case the file wasn't in the git snapshots) or now it has a new history entry in the snapshots
## Why does Git separate these two steps?
For a few reasons:
- What this separation you can commit only relevant and related changes.
- You can split numerous implementation into different and organized commits, this will be beneficial for a clean commit history
- You can avoid committing experimental or unfinished pieces of code
- Before you commit the changes, you can review what change and revert it in case you find an error or an unwanted change
## When would you want to stage changes without committing?
- When you want to double-check the changes you're going to commit, in order to see if everything is alright and doesn't go with an unwanted change
- As a way to "mark" finished work
- When you are preparing a commit but still waiting for something, it can be tests, one last change or a commit from a co-worker.
