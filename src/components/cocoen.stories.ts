import './cocoen';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';

// @ts-ignore
import after from '../../after.jpg';
// @ts-ignore
import before from '../../before.jpg';

// This default export determines where your story goes in the story list
// eslint-disable-next-line import/no-default-export
export default {
  title: 'Cocoen',
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    actions: {
      handles: [
        'cocoen-component:rendered',
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
      <cocoen-component start=${start} color=${color}>
        <img src=${before} slot="before" alt="" />
        <img src=${after} slot="after" alt="" />
      </cocoen-component>
    </div>
  `;
};

export const Default = Cocoen.bind({});
// @ts-ignore
Default.args = {
  start: 75,
  color: '#fff',
};
