## What is the purpose of CI/CD?
**Continuous Integration / Continuous Deployment** was made to make software development faster and safer by catching bugs in early states, even before the commit becomes part of the commit history, this automatization reduces manual work and improve collaboration in big teams
## How does automating style checks improve project quality?
- It enforces styles checks like Linting and Spells checks, improving readability
- Catches bug in early states
- Let developers focus on deliver quality code and not in formatting
- Makes code reviews easier by allowing the reviewer focus on logic and not in format
## What are some challenges with enforcing checks in CI/CD?
- Overly strict rules that can slow down teams
- Rules so vague and general that can lead to false positives
- It can slow down pipelines
- Legacy code can failed new rules
- Rules that have no context, so they don't fit all cases
## How do CI/CD pipelines differ between small projects and large teams?
- Small projects
    - Simple pipelines
    - Faster execution
    - Focus on speed and simplicity
    - Fewer environments
- Large teams
    - Multi-stage pipelines
    - Rollbacks, monitoring and audit logs
    - Different environments (dev, staging, prod)
    - Branch are protected
## Tasks
### CI workflow with Github Actions
For this tasks I made a CI workflow that checks spelling errors and enforces Markdown linting in PR to main Branch, you can find it here: https://github.com/Zheng5005/Zheng5005-intern-repo/blob/main/.github/workflows/lint-markdown.yml

And here is the code:
```lint-markdown.yml
name: Markdown Linting and Spell Check
on:
  pull_request:
    branches:
      - main
      - master
    paths:
      - '**.md'  # Only run when markdown files change

jobs:
  lint-and-spellcheck:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install tools
        run: npm install -g markdownlint-cli cspell

      - name: Run markdownlint
        run: markdownlint '**/*.md' --ignore node_modules --ignore LICENSE
        continue-on-error: true  # Fail the build if linting fails

      - name: Run cspell
        run: cspell '**/*.md' --no-progress --show-suggestions
        continue-on-error: true  # Don't fail build on spelling errors, just warn
```
And to test it I made a PR, you can find it here: https://github.com/Zheng5005/Zheng5005-intern-repo/pull/71
### Git hooks experimentation
For this section I experiment with 2 things:
- Husky hooks
- Git hooks examples

but I really like **Git hooks examples** that are in the .git directory, I think it was a really great way of starting and learn more about hooks without installing extra packages.

Here and example of a pre-commit hooks:
```
#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=$(git hash-object -t tree /dev/null)
fi

# If you want to allow non-ASCII filenames set this variable to true.
allownonascii=$(git config --type=bool hooks.allownonascii)

# Redirect output to stderr.
exec 1>&2

# Cross platform projects tend to avoid non-ASCII filenames; prevent
# them from being added to the repository. We exploit the fact that the
# printable range starts at the space character and ends with tilde.
if [ "$allownonascii" != "true" ] &&
	# Note that the use of brackets around a tr range is ok here, (it's
	# even required, for portability to Solaris 10's /usr/bin/tr), since
	# the square bracket bytes happen to fall in the designated range.
	test $(git diff --cached --name-only --diff-filter=A -z $against |
	  LC_ALL=C tr -d '[ -~]\0' | wc -c) != 0
then
	cat <<\EOF
Error: Attempt to add a non-ASCII file name.

This can cause problems if you want to work with people on other platforms.

To be portable it is advisable to rename the file.

If you know what you are doing you can disable this check using:

  git config hooks.allownonascii true
EOF
	exit 1
fi

# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --
```
