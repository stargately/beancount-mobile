# GitHub Copilot Instructions

## File Modification Rules

### Never Modify yarn.lock

**IMPORTANT**: Do not modify, update, or regenerate the `yarn.lock` file under any circumstances.

- The `yarn.lock` file is automatically managed by the Yarn package manager
- Manual or automated changes to this file can cause dependency inconsistencies
- If dependencies need to be updated, ask the developer to run `yarn install` or `yarn upgrade` manually
- Never suggest changes to `yarn.lock` in code suggestions or completions

## Project Guidelines

This is a React Native mobile application using Expo. Please follow the existing patterns and conventions documented in the `CLAUDE.md` file.
