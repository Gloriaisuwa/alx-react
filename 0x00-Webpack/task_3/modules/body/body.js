import "./body.css";
import $ from "jquery";
import _ from "lodash";

$(function () {
  // Elements
  $("body").append("<button>Click here to get started</button>");
  $("body").append('<p id="count"></p>');

  // Counter function
  let count = 0;
  const updateCounter = _.debounce(() => {
    count++;
    $("#count").text(`${count} clicks on the button`);
  }, 500);

  // Button click event
  $("button").on("click", updateCounter);
});
