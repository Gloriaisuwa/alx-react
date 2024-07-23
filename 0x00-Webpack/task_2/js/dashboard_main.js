import "../css/main.css";
import $ from "jquery";
import _ from "lodash";

$(function () {
  // Elements
  $("body").append("<div id='logo'></div>");
  $("body").append("<p>Holberton Dashboard</p>");
  $("body").append("<p>Dashboard data for the students</p>");
  $("body").append("<button>Click here to get started</button>");
  $("body").append('<p id="count"></p>');
  $("body").append("<p>Copyright - Holberton School</p>");

  // Counter function
  let count = 0;
  const updateCounter = _.debounce(() => {
    count++;
    $("#count").text(`${count} clicks on the button`);
  }, 500);

  // Button click event
  $("button").on("click", updateCounter);
});
