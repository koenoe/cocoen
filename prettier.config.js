// Some settings are automatically inherited from .editorconfig
module.exports = {
  singleQuote: true,
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
};
