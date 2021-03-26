#!/usr/bin/env node

const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

esbuild
  .build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    format: 'cjs',
    minify: true,
    outfile: 'dist/index.js',
    platform: 'node',
    sourcemap: true,
    target: 'es6',
    watch: isWatch,
  })
  .catch(() => {
    process.exit(1);
  });

esbuild
  .build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    minify: true,
    outfile: 'dist/index.browser.js',
    sourcemap: true,
    watch: isWatch,
  })
  .catch(() => {
    process.exit(1);
  });
