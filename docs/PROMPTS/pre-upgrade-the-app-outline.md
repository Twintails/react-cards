This app was last deployed in the year 2020. 
- It is 5 years outdated. 
- It has security vulnareabilities.
- It is no longer able to run on Node because underlying npm packages fail to install.

You may access and read the files in the project directory to understand the project and assess the scope of work. you may use the @zsh terminal to run and debug.

I have NVM in place to manage Node Versions.
- currently environment is using node v12.16.1 (npm v6.13.4)
- .nvmrc has an entry for `12` so the command `nvm use` will set the environment to Node v12
- You may install and use Node Long Term Stable Releses 14, 16, 18, 20, 22, or 24 if you need to incrementally upgrade and debug from 12 to 14; or jump stright to Node v 24 if it would be more efficient.

Help me upgrade this project to a modern stack for React
I would like you to:
- Upgrade to Node v24
- Upgrade Webpack to latest or replace Webpack with Vite
- Replace Gulp
- Upgrade npm packages
- setup to use TypeScript
- Upgrade to the latest React

Create a Work plan in Markdown in a docs to keep track of progress and check off tasks so if there is confusion, we can pick up where we leave off.
Prompt me with any questions to clarify the work and keep it in the plan docs.

After I review the plan, you may need to revise the plan and let me review it again, or If I say "engage" you are to execute the plan.



ME


Also, for the `Project Upgrade Prompt for Claude` add Source Control Management details as follows
git alias for checking out a branch is `cob` - this will prepend branch names with `task-` example  `git cob add-typescript-support` will make a branch `task-add-typescript-support`
git alias for switching branches is `sw` and you can use it as such: `git sw add-typescript-support` will switch to branch `task-add-typescript-support`
refer to git config and suggest other useful aliases to teach me if you have found other useful ones.
I would like to use Commitizen for contributors in the repo going forward @https://github.com/commitizen/cz-cli 
Set Commitizen up for me, and give me a Markdown "cheat sheet" in docs/CONTRIB/committing.md with a table of useful Commitizen workflows.



TODO for HUMAN 

How to Get Underway:
Once you answer these final questions, here's our process:
I'll read the complete prompt file (docs/PROMPTS/project-upgrade-prompt-for-Claude.md) to fully understand all requirements and preferences.
I'll analyze your reference project 1 to understand your preferred Vitest configuration and project structure.
I'll create a comprehensive upgrade plan in docs/upgrade-plan.md with:
Detailed phases and milestones
Specific tasks with checkboxes
Risk assessments and rollback strategies
Testing strategies at each phase
You'll review the plan and let me know if any adjustments are needed.
When you say "engage" - I'll start executing the plan step by step, providing regular updates.
Would you like to answer the final questions first, or should I proceed with reading the prompt file and starting the analysis?