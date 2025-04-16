module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'test', // Adding tests
        'chore', // Changes to build process or auxiliary tools
        'perf', // Performance improvements
        'ci', // CI configuration changes
        'revert', // Revert a commit
        'build', // Build system changes
        'add', // Adding new files or features
      ],
    ],
  },
};
