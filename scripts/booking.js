/* jshint esversion: 6 */

/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

const week_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

let week_selection = new Array(5).fill(false);
let dayCounter = 0;
let day_price = 35.0;

const cost_elem = document.getElementById('calculated-cost');

const calc_cost = () => {
  let cost = dayCounter * day_price;
  cost_elem.innerHTML = cost.toString();
};

const setDayCounter = (value) => {
  dayCounter = value;
  calc_cost();
};

const setDayPrice = (value) => {
  day_price = value;
  calc_cost();
};

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

week_days.forEach( (day, i) => {
  let btn = document.getElementById(day);
  btn.addEventListener('click', () => {
    if (!week_selection[i]) {
      btn.classList.add('clicked');
      week_selection[i] = true;
      setDayCounter(week_selection.reduce((a,b)=>a+b));
    }
  });
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

document.getElementById('clear-button').addEventListener('click', () => {
    document.querySelectorAll('li.blue-hover.clicked').forEach(li => li.classList.remove('clicked'));
    week_selection.fill(false);
    setDayCounter(week_selection.reduce((a,b)=>a+b));
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

let half_btn = document.getElementById('half');
let full_btn = document.getElementById('full');
half_btn.addEventListener('click', () => {
  setDayPrice(20);
  half_btn.classList.add('clicked');
  full_btn.classList.remove('clicked');
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
full_btn.addEventListener('click', () => {
  setDayPrice(35);
  half_btn.classList.remove('clicked');
  full_btn.classList.add('clicked');
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

// all calculation functions are defined above
