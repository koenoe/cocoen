export type Foo = 'Foo';
export type Bar = 'Bar';

const foo: Foo = 'Foo';
const bar: Bar = 'Bar';

export const create = () => {
  console.log('create Cocoen here');
};

export const parse = () => {
  console.log({ foo, bar });
};
