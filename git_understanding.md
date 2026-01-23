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
# Issue #49
## What does `git bisect` do?
Helps you find a commit that introduces a bug, it uses a binary search approach:
- You mark a commit as **good**, meaning that commit isn't the one that introduces the bug
- Then you mark another commit as **bad**, this isn't necessary the commit that introduces the bug, but it might have it through numerous commits
- After this Git checks out commits that are in the middle of your branch and ask you to test them to see if the bug appears
- Based on your answer in the previous step, Git narrows the range until it finds the first bad commit.
## When would you use it in a real-world debugging situation?
Imagine a Spotify clone, just a project to learn more about Frontend, but through various commits, you notice that the player bar it isn't working well, the audio is pretty laggy, but specifically when you play a playlist, it doesn't happens when you play a single.

In this scenario there's many commits related to the player bar, so instead of searching manually the one with the bug, you can search for it using `git bisect` in a much faster way, you'll only need to pay attention to the last time (in this case a commit) where it was working well.
## How does it compare to manually reviewing commits?
Manually review all commits of a branch in order to search a bug can be doable when the project it just starting out, although is a slow way, cause it too error prone, maybe you forget a specific bug, maybe some commits are pretty similar so you forget them, etc.

But as time goes by, the commit history becomes chaotic and very hard to follow, so using `git bisect` is a much doable way of debugging the commit history, if you want a specific metric, is O(log₂ N) in Big O nation, which means it pretty fast.
# Issue #50
## What does each command do?
`git checkout -- <file>`: Reverts a file in your working directory back to the last committed version, discarding your local changes in that file.

`git cherry-pick <commit>`: Takes a specific commit from another branch and applies it to your current branch.

`git log`: Shows the history of commits. in your current branch

`git blame`: Shows who last modified each line of a file and in which commit.
## When would you use it in a real project (hint: these are all really important in long running projects with multiple developers)?
`git checkout -- <file>`: 
- When you broke a file and want to undo things
- Drop experimental changes in 1 file, but keep the rest of the changes
- It lets you reset mistakes without getting in the way of other people work

`git cherry-pick <commit>`:
- A co-worker fixed an Issue on another branch and you need only that change
- You don't want to merge the whole branch to main
- Hotfixes

`git log`:
- To see the commit history
- To find commit hashes for cherry-picking or reverting.
- To see the commit history in a more detail way I personally use an alias to help me with that:
	- sg = log --color --graph --oneline --pretty=format:'%Cred%h%Creset %C(yellow)%d%Creset %s %C(dim green)(%cr) %C(bold magenta)<%an>%Creset' --abbrev-commit

`git blame`:
- To find who introduced a bug
- To ask that specific person about a design choice
- To understand why that piece of code exists
## What surprised you while testing these commands?
Honestly how understandable is to read the log with `git log`, cause every time I want to see the commit history of a project I use a custom alias with `git log --graph` to see the overall picture

I also expect `git blame` to show the author of a change, but I didn't know it shows it line by line

Also doing experimentation, I now know that cherry-pick can still cause merge conflicts
# Issue #51
## What caused the conflict?
I made 2 branches, branch-a and branch-b, and in each branch I made a comment in the same file (calculator.js) and in the same line, and the moment I tried to merge the 2 branches in main, the merge conflict arose.
## How did you resolve it?
I solve it by combining the 2 comments, this is just one way to solve this kind of Issues, you can also decide which version to keep
## What did you learn?
I learn different approaches on how to resolve this types of conflicts, and also even when the conflict is minimal, git doesn't merge the changes, this is a very good security measure, and pretty useful in big projects that in maintain by a big team
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
## Tasks
- First I run the command `git status` (see ./proofs/BeforeChange.png)
- Then I made a minor change in README.md file, I just added my name, and ran `git status` again (see ./proofs/AfterChange.png)
- Then I ran `git add README.md` to stage my changes
- After all of this a ran `git reset HEAD README.md` (see ./proofs/GitReset.png) 
- The file was unstaged
- After this experiment I will commiting this info into the repository with `git commit -m"Issue #53 fix"`
