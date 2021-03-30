import './cocoen';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import after from '../../after.jpg';
// @ts-ignore
import before from '../../before.jpg';

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
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Cocoen = ({ start, color }: Args) => {
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
};
// @ts-ignore
Custom.argTypes = {
  color: { control: 'color' },
};
