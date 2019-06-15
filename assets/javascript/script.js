//global HTML elements

//input
var billAmount = $("#bill-amount"); //user input
var tipPercentage = $("#tip-percentage"); //user input
var splitTipBox = $(".checkbox-container"); //user input
var splitByValue = $("#split-by-value"); //user input

//output
var results = $("#result"); //the div where our results will be displayed

//constants
const checkmark = "&#x2713;"; //the icon that will display the state of the box

//data-attributes
splitTipBox.attr("data-state", "0"); //keep track of the state of the custom checkbox -> 0 | 1
billAmount.attr("data-prefix", "$").attr("data-suffix", "");
tipPercentage.attr("data-prefix", "").attr("data-suffix", "%");
//listeners
splitTipBox.on("click", function() {
  console.log($(this).attr("data-state"));
  var state = parseInt($(this).attr("data-state"));
  if (state) {
    //if the box is checked
    $(this)
      .empty() //empty the contents of the checkbox
      .attr("data-state", "0"); //toggle the data-state
  } else {
    $(this)
      .append(checkmark) //check the box
      .attr("data-state", "1"); //toggle the data-state
    splitByValue.prop("disabled", false); //enable the input element to determine how many will share the tip
    splitByValue.focus(); //snap focus to the splitByValue element
  }
});

$("input").focusout(function() {
  var value = parseFloat(
    $(this)
      .val()
      .trim()
  );
  //error handling

  var prefix = $(this).attr("data-prefix");
  var suffix = $(this).attr("data-suffix");
  $(this).val(prefix + value + suffix);
});
