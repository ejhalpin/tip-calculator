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

//variables
var bill = 0;
var tip = 0;
var split = 1;
var amount = 0;
//data-attributes
splitTipBox.attr("data-state", "0"); //keep track of the state of the custom checkbox -> 0 | 1
billAmount
  .attr("data-prefix", "$")
  .attr("data-suffix", "")
  .attr("data-dump", "bill");
tipPercentage
  .attr("data-prefix", "")
  .attr("data-suffix", "%")
  .attr("data-dump", "tip");
splitByValue.attr("data-dump", "split");
//listeners
splitTipBox.on("click", function() {
  //console.log($(this).attr("data-state"));
  var state = parseInt($(this).attr("data-state"));
  if (state) {
    //if the box is checked
    $(this)
      .empty() //empty the contents of the checkbox
      .attr("data-state", "0"); //toggle the data-state
    splitByValue //empty the value, disable the input, and drop the required property
      .val("")
      .prop("disabled", true)
      .prop("required", false);
  } else {
    $(this)
      .append(checkmark) //check the box
      .attr("data-state", "1"); //toggle the data-state
    splitByValue.prop("disabled", false).prop("required", true); //enable the input element to determine how many will share the tip and require the input
    splitByValue.focus(); //snap focus to the splitByValue element
  }
});

$("input").focusout(function() {
  //get the input data-dump and store the value in the appropriate place
  var input = $(this); //so you don't have to read 'this' everywhere
  var dump = input.attr("data-dump");
  switch (dump) {
    case "bill":
      bill = parseFloat(input.val()).toFixed(2);
      if (isNaN(bill) || bill < 0) {
        //error handling
        input.val("enter a positive number").css("background-color", "rgba(175, 25, 25, 0.8)");
        bill = 0;
      } else {
        input.val("$" + bill);
        calculateTip();
      }
      break;
    case "tip":
      tip = parseFloat(input.val());
      if (isNaN(tip) || tip < 0) {
        input.val("enter a positive number").css("background-color", "rgba(175, 25, 25, 0.8)");
        tip = 0;
      } else {
        input.val(tip + "%");
        tip = tip / 100;
        calculateTip();
      }
      break;
    case "split":
      split = Math.abs(input.val()); //handle negative numbers automatically

      calculateTip();
      break;
    default:
      console.log("default case");
  }
});

splitByValue.on("change", function splitByChange() {
  split = splitByValue.val();
  calculateTip();
});

function calculateTip() {
  if (!bill || !tip) {
    return;
  }
  results.empty();
  amount = (bill * (tip + 1)).toFixed(2);
  var totalsCard = $("<div>").addClass("totals-card");
  var pBill = $("<p>").text("Bill amount: $" + bill);
  var pTip = $("<p>").text("Tip amount: $" + (bill * tip).toFixed(2));
  totalsCard.append(pBill).append(pTip);
  if (split > 1) {
    var pSplit = $("<p>").text("Split between " + split + " guests");
    totalsCard.append(pSplit);
    var newAmount = (amount / split).toFixed(2);
    var pAmount = $("<p>").text("Amount due per guest: $" + newAmount);
    totalsCard.append(pAmount);
  } else {
    var pAmount = $("<p>").text("Amount due: $" + amount);
    totalsCard.append(pAmount);
  }
  results.append(totalsCard);
}
