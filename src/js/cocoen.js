class Cocoen {
  constructor() {
    this.init();
  }

  init() {
    console.log('Cocoen:init', this); // eslint-disable-line
  }
}

window.Cocoen = Cocoen;
