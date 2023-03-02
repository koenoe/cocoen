import './cocoen';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';

// @ts-ignore
import after from '../../after.jpg';
// @ts-ignore
import before from '../../before.jpg';
import type { Orientation } from '../config';

// This default export determines where your story goes in the story list
// eslint-disable-next-line import/no-default-export
export default {
  title: 'Cocoen',
  parameters: {
    actions: {
      handles: [
        'cocoen-component:connected',
        'cocoen-component:disconnected',
        'cocoen-component:resized',
        'cocoen-component:updated',
      ],
    },
  },
};

type Args = {
  start?: number;
  color?: string;
  orientation?: Orientation;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Cocoen = ({ start, color, orientation }: Args) => {
  const styles = {
    position: 'relative',
    maxWidth: '700px',
    margin: 'auto',
  };

  return html`
    <div style=${styleMap(styles)}>
      <cocoen-component
        color=${ifDefined(color || undefined)}
        start=${ifDefined(start || undefined)}
        orientation=${ifDefined(orientation || undefined)}
      >
        <img src=${before} slot="before" alt="" />
        <img src=${after} slot="after" alt="" />
      </cocoen-component>
    </div>
  `;
};

export const Default = Cocoen.bind({});
// @ts-ignore
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const Custom = Cocoen.bind({});
// @ts-ignore
Custom.args = {
  start: 75,
  color: '#ff0000',
  orientation: 'horizontal',
};
// @ts-ignore
Custom.argTypes = {
  color: { control: 'color' },
  orientation: {
    control: { type: 'select', options: ['horizontal', 'vertical'] },
  },
};
