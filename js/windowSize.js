"use strict";

/**
 *
 * @param {*width of the window} w
 * @param {*height of the window} h
 * @param {*the array that contains the dimensions in different units} unit_arr
 * @param {*the number of dimensions that will be used} NUM_DIM
 * @param {*the index corresponding to the pixel dimensions} PIX
 * @param {*the index corresponding to the percent dimensions} PERCENT
 * @param {*the index corresponding to the em dimensions} EM
 * @returns
 */
function addUnits(w, h, unit_arr, NUM_DIM, PIX, PERCENT, EM) {
  const WINDOW_W = screen.width;
  const WINDOW_H = screen.height;

  for (let i = 0; i < NUM_DIM; i++) {
    let temp_w = w;
    let temp_h = h;
    let temp_unit = "";
    switch (i) {
      case PIX:
        temp_unit = "pixel";
        break;
      case PERCENT:
        temp_unit = "percent";
        temp_w = Math.round((w / WINDOW_W) * 100);
        temp_h = Math.round((h / WINDOW_H) * 100);
        break;
      case EM:
        let fontSize = getComputedStyle(document.body).getPropertyValue(
          "font-size"
        );
        temp_unit = "em";
        fontSize = parseInt(fontSize);
        temp_w = Math.round(w / fontSize);
        temp_h = Math.round(h / fontSize);
        break;
    }
    unit_arr[i] = { w: temp_w, h: temp_h, unit: temp_unit };
  }

  return unit_arr;
}

/**
 * take an object that represents the width, height, and dimension of the
 * current size of the window and displays it on the screen by inserting
 * the html
 */
function displaySize(curr) {
  document.getElementById("wh").innerHTML =
    "<h1>" +
    curr.unit.toUpperCase() +
    "<h1/> <p>Width: " +
    curr.w +
    "<br> Height: " +
    curr.h +
    "</p>";
}

function getSize() {
  /**
   * set all the constants depending what units I want to display
   */
  const PIX = 0;
  const PERCENT = 1;
  const EM = 2;
  const NUM_DIM = 3;

  let unit_arr = [NUM_DIM];
  /**
   * get the curent height and width of the window
   */
  let w = document.documentElement.clientWidth;
  let h = document.documentElement.clientHeight;
  /**
   * call the function addUnits to calculate and add the different
   * unit types and add them into the array
   */
  unit_arr = addUnits(w, h, unit_arr, NUM_DIM, PIX, PERCENT, EM);

  /**
   * get the button that is currently active, set by the listener
   * in the onload function, to determine which size to display.
   */
  let curr = document.getElementsByClassName("active");

  if (curr.length !== 0) {
    let curr_dim = curr[0].id;

    // using the id, find the element in the unit_arr has the same unit as the button
    let unit_index = unit_arr.findIndex((dim) => {
      return dim.unit === curr_dim;
    });
    let chosen_dims = unit_arr[unit_index];
    displaySize(chosen_dims);
  }
}

/**
 * onload set up the resize listener for the window and the button listeners
 */
onload = function initiateResize() {
  window.addEventListener("resize", getSize);

  /**
   * for each button on the screen, set up a listener that adds the button to
   * a class called active. Once the button is active the function getSize
   * will run which will determine the current dimensions and display them on
   * the screen.
   */
  let buttons = this.document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.addEventListener("click", function (e) {
      let curr = document.getElementsByClassName("active");
      if (curr.length > 0) {
        curr[0].className = curr[0].className.replace("active", "");
      }
      btn.className += "active";
      getSize();
    });
  }
};
