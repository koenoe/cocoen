// Some settings are automatically inherited from .editorconfig
module.exports = {
  endOfLine: 'auto',
  overrides: [
    {
      files: '.editorconfig',
      options: { parser: 'yaml' },
    },
    {
      files: 'LICENSE',
      options: { parser: 'markdown' },
    },
  ],
  singleQuote: true,
  trailingComma: 'all',
};
