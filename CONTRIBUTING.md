# Contributing to Fashion AI Studio

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### Suggesting Features

1. Check if the feature has been suggested
2. Create an issue with:
   - Clear description of the feature
   - Use case / problem it solves
   - Proposed implementation (optional)
   - Any relevant examples

### Pull Requests

1. **Fork** the repository
2. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test thoroughly**:
   - Test locally before submitting
   - Ensure no breaking changes
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add: Description of feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create Pull Request** with:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots/GIFs for UI changes

## Development Setup

See the main [README.md](README.md) for setup instructions.

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints where appropriate
- Document functions with docstrings
- Keep functions focused and small

### TypeScript (Frontend)
- Use TypeScript for type safety
- Follow consistent naming conventions
- Use functional components
- Keep components focused and reusable

### General
- Write clear, self-documenting code
- Add comments for non-obvious logic
- Maintain consistent formatting
- Update tests if applicable

## Commit Message Guidelines

Format: `Type: Description`

**Types:**
- `Add:` New feature or file
- `Fix:` Bug fix
- `Update:` Changes to existing feature
- `Refactor:` Code restructuring
- `Docs:` Documentation updates
- `Style:` Formatting, no code change
- `Test:` Adding or updating tests

**Examples:**
```
Add: User authentication system
Fix: Image upload timeout issue
Update: Improved error messages
Docs: Added deployment guide
```

## Areas for Contribution

Looking for ways to contribute? Here are some ideas:

### High Priority
- [ ] Add batch image processing
- [ ] Implement caching system
- [ ] Add user authentication
- [ ] Improve error handling
- [ ] Add comprehensive tests

### Medium Priority
- [ ] Support for more AI models
- [ ] Video generation feature
- [ ] Advanced styling options
- [ ] Image editing tools
- [ ] Mobile app version

### Low Priority / Nice to Have
- [ ] Dark mode
- [ ] Multiple language support
- [ ] Social sharing features
- [ ] Generation history
- [ ] Preset templates

## Testing

Before submitting:

1. **Backend tests**:
   ```bash
   cd backend
   python -m pytest  # (when tests are added)
   ```

2. **Frontend tests**:
   ```bash
   cd frontend
   npm test  # (when tests are added)
   ```

3. **Manual testing**:
   - Test in multiple browsers
   - Test responsive design
   - Test error scenarios
   - Test edge cases

## Documentation

When adding features:
- Update README.md if user-facing
- Add comments in complex code
- Update API documentation
- Include examples where helpful

## Questions?

- Open an issue labeled "question"
- Check existing discussions
- Review documentation first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Fashion AI Studio! 🎨✨
