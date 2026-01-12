# GitHub Copilot Instructions

## File Modification Rules

### Never Modify yarn.lock

**IMPORTANT**: Do not modify, update, or regenerate the `yarn.lock` file under any circumstances.

- The `yarn.lock` file is automatically managed by the Yarn package manager
- Manual or automated changes to this file can cause dependency inconsistencies
- If dependencies need to be updated, ask the developer to run `yarn install` or `yarn upgrade` manually
- Never suggest changes to `yarn.lock` in code suggestions or completions

## Project Context

This is a React Native mobile application built with Expo. When making suggestions or generating code:
- Follow existing TypeScript patterns and conventions in the codebase
- Respect the project's dependency management through Yarn
- Do not modify lock files or package manager configuration

## Temporary Files

When creating temporary files, scripts, or artifacts during development:
- Use the `/tmp` directory at the repository root
- This directory is gitignored and safe for temporary work
- Clean up temporary files when they're no longer needed
