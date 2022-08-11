// class Slider {
//   constructor (rangeElement, valueElement, options) {
//     this.rangeElement = rangeElement;
//     this.valueElement = valueElement;
//     this.options = options;
    

//     // Attach a listener to "change" event
//     this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
//   }

//   // Initialize the slider
//   init() {
//     this.rangeElement.setAttribute('min', options.min);
//     this.rangeElement.setAttribute('max', options.max);
//     this.rangeElement.value = options.cur;

//     this.updateSlider();
//   }

//   // Format the money
//   asGrid(value) {
//     return `${parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 2 })} x ${parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
//   }

//   generateBackground(rangeElement) {   
//     if (rangeElement.value === this.options.min) {
//       return;
//     }

//     let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100;
//     return 'background: linear-gradient(to right, #AF40FF, #AF40FF ' + percentage + '%, #5B42F3 ' + percentage + '%, #d3edff 100%)';
//   }

//   updateSlider (newValue) {
//     this.valueElement.innerHTML = this.asGrid(this.rangeElement.value);
//     this.rangeElement.style = this.generateBackground(this.rangeElement.value);
//   }
// }

// let rangeElement = document.querySelector('.range [type="range"]');
// let valueElement = document.querySelector('.range .range__value span') ;

// let options = {
//   min: 4,
//   max: document.getElementById(`game`).width/2,
//   cur: document.getElementById(`game`),
// };

// if (rangeElement) {
//   let slider = new Slider(rangeElement, valueElement, options);

//   slider.init();
// }

class Slider {
    constructor (rangeElement, valueElement, options) {
      this.rangeElement = rangeElement
      this.valueElement = valueElement
      this.options = options
  
      // Attach a listener to "change" event
      this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
    }
  
    // Initialize the slider
    init() {
      this.rangeElement.setAttribute('min', options.min);
      this.rangeElement.setAttribute('max', options.max);
      this.rangeElement.value = options.cur;
  
      this.updateSlider();
    }
  
    // Format the money
    asGrid(value) {
        return `${parseFloat(value)} x ${parseFloat(value)}`;
    }
  
    generateBackground(rangeElement) {   
      if (this.rangeElement.value === this.options.min) {
        return
      }
  
      let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
      return 'background: linear-gradient(to right, #AF40FF, #AF40FF ' + percentage + '%, #5B42F3 ' + percentage + '%, #d3edff 100%)';
    }
  
    updateSlider (newValue) {
      this.valueElement.innerHTML = this.asGrid(this.rangeElement.value)
      this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
  }
  
  let rangeElement = document.querySelector('.range [type="range"]')
  let valueElement = document.querySelector('.range .range__value span') 
  
  let options = {
    min: 4,
    max: document.getElementById(`game`).width,
    cur: document.getElementById(`game`).width/2,
  }
  
  if (rangeElement) {
    let slider = new Slider(rangeElement, valueElement, options)
  
    slider.init()
  }