# Branch Management

Our team follows a structured branching strategy to keep development organized.

## Branch Types

### Main Branch
- `main` - Production-ready code
- Always stable and deployable
- Protected with required reviews

### Development Branches
- `develop` - Integration branch for features
- `feature/feature-name` - Individual feature development
- `hotfix/issue-name` - Critical production fixes

## Workflow Process

1. **Start Feature**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature
   ```

2. **Develop Feature**
   - Make changes
   - Test thoroughly
   - Commit regularly

3. **Submit for Review**
   ```bash
   git push origin feature/new-feature
   # Create Pull Request
   ```

4. **After Approval**
   - Feature merged to develop
   - Delete feature branch
   - Deploy when ready

## Branch Protection Rules

- All changes to `main` require PR review
- CI tests must pass
- At least one approval required
- No direct pushes to `main`
