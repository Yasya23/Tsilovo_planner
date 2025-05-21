# Commit Message Guidelines

## Commit Message Format

Each commit message consists of a **type**, an optional **scope**, and a **description**:

```
<type>(<scope>): <description>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `perf`: A code change that improves performance
- `ci`: Changes to CI configuration files and scripts
- `revert`: Reverts a previous commit
- `build`: Changes that affect the build system or external dependencies
- `add`: Adding new files or features

### Scopes

The scope should be the name of the module affected (as perceived by the person reading the changelog). Examples:

- `auth`: Authentication related changes
- `api`: API related changes
- `ui`: User interface changes
- `db`: Database related changes
- `config`: Configuration changes
- `feature`: Feature changes

### Description

The description should be a short summary of the changes:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

## Examples

### Good Examples

```
feat(auth): add Google OAuth login
fix(api): resolve user data fetching error
docs(readme): update installation instructions
style(ui): format code according to prettier rules
refactor(auth): simplify token validation logic
test(api): add unit tests for user service
chore(deps): update dependencies to latest versions
perf(db): optimize database queries
ci(github): add automated testing workflow
revert: revert changes to auth middleware
build: update webpack configuration
add: implement new task creation feature
```

### Bad Examples

```
fixed bug with login
changed the UI
updates to the code
new feature
```

## Breaking Changes

If your commit includes breaking changes, add `BREAKING CHANGE:` in the commit body:

```
feat(api): change authentication method

BREAKING CHANGE: Authentication now requires a valid JWT token
```

## Long Commit Messages

If you need to provide more context, add a blank line after the first line and then add the details:

```
feat(auth): implement two-factor authentication

- Add SMS verification
- Update user model to store 2FA settings
- Add 2FA setup flow in the UI
```

## Best Practices

1. **Be Specific**: Clearly describe what changed and why
2. **Keep it Short**: The first line should be 50 characters or less
3. **Use Imperative Mood**: Write as if you're giving a command
4. **Reference Issues**: If your commit relates to an issue, reference it at the end

   ```
   feat(api): add rate limiting

   Closes #123
   ```

5. **Group Related Changes**: Each commit should represent a single logical change
6. **Test Before Committing**: Ensure your changes work before committing
7. **Review Your Message**: Double-check your message before committing

## Common Mistakes to Avoid

- ❌ Using past tense ("added", "fixed")
- ❌ Ending with a period
- ❌ Being too vague ("update code", "fix bug")
- ❌ Including multiple unrelated changes
- ❌ Writing messages that are too long for the first line
- ❌ Not using the conventional commit format

## Tools and Automation

This project uses:

- `husky` for Git hooks
- `commitlint` for message validation
- `lint-staged` for pre-commit checks

These tools will automatically:

- Validate your commit message format
- Run linters on staged files
- Format code according to project standards
