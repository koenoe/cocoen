const css = `
  div {
    background: red;
  }
`;

export class Cocoen extends HTMLElement {
  // constructor() {
  //   super();
  // }

  connectedCallback(): void {
    const shadowDOM = this.attachShadow({ mode: 'closed' });

    shadowDOM.innerHTML = `
      <style>${css}</style>
      <div>
        <slot name="before" />
      </div>
      <slot name="after" />
    `;
  }

  disconnectedCallback(): void {
    console.log('disconnected from the DOM', this);
  }
}
