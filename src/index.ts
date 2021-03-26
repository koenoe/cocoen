export type Foo = 'Foo';
export type Bar = 'Bar';

const foo: Foo = 'Foo';
const bar: Bar = 'Bar';

export const init = () => {
  console.log('hoi cocoen');
  console.log({ foo, bar });
};
