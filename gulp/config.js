const ports = {
  browser: 3000,
  ui: 3001,
};

const directories = {
  src: './src',
  build: './dist',
  demo: './docs',
};

const files = {
  scss: [
    `${directories.src}/**/*.scss`,
  ],
  js: [
    `${directories.src}/**/*.js`,
  ],
};

const config = {
  directories,
  files,
  ports,
};

export default config;
