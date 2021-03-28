import { componentName } from './config';
import { Cocoen } from './components/cocoen';
import { create } from './create';
import { parse } from './parse';

// Define our custom Cocoen web component
customElements.define(componentName, Cocoen);

export { create, parse };
