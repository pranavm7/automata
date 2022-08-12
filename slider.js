export class Slider {
  constructor (rangeElement, valueElement, options, updateBoard) {
    this.rangeElement = rangeElement;
    this.valueElement = valueElement;
    this.options = options;
    this.updateBoard = updateBoard;
    // Attach a listener to "change" event
    this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
  }

  // Initialize the slider
  init() {
    this.rangeElement.setAttribute('min', this.options.min);
    this.rangeElement.setAttribute('max', this.options.max);
    this.rangeElement.value = this.options.cur;
    this.valueElement.innerHTML = this.asGrid(this.rangeElement.value);
    this.rangeElement.style = this.generateBackground(this.rangeElement.value);
    //this.updateSlider();
  }

  // Format the money
  asGrid(value) {
      return `${parseFloat(value)} x ${parseFloat(value)}`;
  }

  generateBackground(rangeElement) {   
    if (this.rangeElement.value === this.options.min) {
      return;
    }

    let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100;
    return 'background: linear-gradient(to right, #AF40FF, #AF40FF ' + percentage + '%, #5B42F3 ' + percentage + '%, #d3edff 100%)';
  }

  updateSlider (newValue) {
    this.valueElement.innerHTML = this.asGrid(this.rangeElement.value);
    this.rangeElement.style = this.generateBackground(this.rangeElement.value);
    this.updateBoard(this.rangeElement.value);
  }
}
