#!/usr/bin/env node

const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const options = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  minify: true,
  sourcemap: true,
  watch: isWatch,
};

esbuild
  .build({
    ...options,
    globalName: 'Cocoen',
    outfile: 'dist/index.js',
  })
  .catch(() => {
    process.exit(1);
  });

esbuild
  .build({
    ...options,
    format: 'esm',
    outfile: 'dist/index.esm.js',
  })
  .catch(() => {
    process.exit(1);
  });
