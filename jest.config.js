const esModules = [
  '@open-wc/dedupe-mixin',
  '@open-wc/scoped-elements',
  '@open-wc/semantic-dom-diff',
  '@open-wc/testing',
  '@open-wc/testing-helpers',
  'chai-a11y-axe',
  'lit-element',
  'lit-html',
].join('|');

module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'],
  roots: ['<rootDir>/src/'],
  verbose: true,
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
