import { Cocoen } from './components/cocoen';
import { componentName } from './config';
import { create } from './create';
import { parse } from './parse';

// Define our custom Cocoen web component
customElements.define(componentName, Cocoen);

export { create, parse };
