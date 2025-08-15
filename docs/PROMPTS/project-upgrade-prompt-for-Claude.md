# **Project Upgrade Prompt for Claude**

**Context:** You are helping Lorin upgrade a 5-year-old React card game application called "Cards against Bovinity" from a severely outdated tech stack to modern standards. The project was last deployed in 2020 and is currently non-functional due to dependency conflicts and security vulnerabilities.

**Current State Analysis:**
- **Node.js:** v12.16.1 (severely outdated, EOL)
- **React:** v16.13.1 (5+ years old)
- **Webpack:** v4.42.1 (outdated)
- **Build System:** Gulp-based (outdated approach)
- **Security:** 562 vulnerabilities (69 low, 149 moderate, 278 high, 66 critical)
- **Dependencies:** Many packages from 2019-2020 era
- **Architecture:** Server-side rendered React app with Socket.io for real-time features

**Upgrade Goals:**
1. **Node.js:** Upgrade to v24 LTS
2. **Build System:** Replace Gulp with Vite + Vitest for testing
3. **React:** Upgrade to latest React (v18+) with Functional Components
4. **TypeScript:** Add TypeScript support gradually
5. **Dependencies:** Modernize all npm packages
6. **Security:** Eliminate vulnerabilities
7. **State Management:** Consider Redux + RTK Query or Apollo GraphQL with codegen
8. **Project Structure:** Modernize completely

**Your Role:**
- **Assessment:** Analyze current codebase structure and dependencies
- **Planning:** Create detailed, phased upgrade plan with checkpoints
- **Execution:** Implement upgrades incrementally with testing at each step
- **Documentation:** Maintain progress tracking in markdown docs
- **Communication:** Ask clarifying questions and provide status updates

**Key Considerations:**
- **Incremental Approach:** May need to upgrade Node.js versions incrementally (12→14→16→18→20→22→24)
- **Breaking Changes:** React 16→18+ has significant breaking changes
- **Build System Migration:** Gulp→Vite migration requires significant configuration changes
- **TypeScript Migration:** Gradual migration approach for existing JS files
- **Testing:** Ensure functionality is preserved throughout upgrades
- **Real-time Features:** Socket.io compatibility with newer versions
- **Feature Preservation:** Preserve all features possible, review conflicts as they arise

**Communication Protocol:**
- Create detailed work plan in `docs/upgrade-plan.md`
- Use checkboxes for task tracking
- Ask specific questions about preferences and technical decisions
- Provide status updates after each major phase
- Wait for "engage" command before execution

**Technical Preferences Confirmed:**
- ✅ **Build System:** Vite + Vitest (not Webpack)
- ✅ **TypeScript:** Gradual implementation
- ✅ **Features:** Preserve all possible, review conflicts as encountered
- ✅ **Structure:** Modernize completely
- ✅ **React:** Modernize with Functional Components
- ✅ **State Management:** Analyze current codebase and recommend best approach (reliability, long-term stability, efficiency)
- ✅ **Testing:** Implement Vitest from the beginning, start with unit testing
- ✅ **Real-time Features:** Replace Socket.io entirely with modern alternatives (WebSockets vs Server-Sent Events - provide comparison)
- ✅ **TypeScript Migration:** Convert existing critical files (main components, stores, etc.)
- ✅ **Styling:** Move to styled-components (choose path of least resistance - file by file or all at once based on efficiency)
- ✅ **Server Framework:** Modern alternative NestJS with modern patterns (controllers, services, dependency injection)
- ✅ **Code Quality:** ESLint, Prettier, Husky for git hooks
- ✅ **Performance:** Implement optimizations (code splitting, lazy loading, React.memo, etc.) where necessary
- ✅ **Reference Project:** [color-calc-vue](https://github.com/Twintails/color-calc-vue) for Vitest configuration

**Source Control Management:**
- **Git Aliases:**
  - `git cob <branch-name>` → creates `task-<branch-name>` (e.g., `git cob add-typescript-support` → `task-add-typescript-support`)
  - `git sw <branch-name>` → switches to `task-<branch-name>` (e.g., `git sw add-typescript-support` → switches to `task-add-typescript-support`)
- **Commitizen:** Set up [cz-cli](https://github.com/commitizen/cz-cli) for standardized commits
- **Documentation:** Create `docs/CONTRIB/committing.md` with Commitizen workflow cheat sheet
- **Additional Git Aliases:** Suggest and configure useful aliases for efficient workflow

**Real-time Features Comparison Required:**
- Provide detailed comparison of Native WebSockets vs Server-Sent Events for real-time gaming
- Recommend best approach based on card game requirements
- Explain pros/cons for bidirectional vs unidirectional communication

This prompt ensures I understand the full scope of the upgrade challenge and can provide the most effective assistance while maintaining clear communication and progress tracking.
