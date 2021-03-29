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
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Cocoen = () => {
  const styles = {
    position: 'relative',
    width: '700px',
    margin: 'auto',
  };

  return html`
    <div style=${styleMap(styles)}>
      <cocoen-component>
        <img src=${before} slot="before" alt="" />
        <img src=${after} slot="after" alt="" />
      </cocoen-component>
    </div>
  `;
};
