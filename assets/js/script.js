// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // VARIABLE DECLARATIONS
  var saveBtn = $(".saveBtn");
  // Declare tasks object to store parsed local storage
  var tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  // Declare today variable to easily use dayjs() for multiple purposes in this code
  var today = dayjs();
  // Declare currentDay variable to store a reference to the currentDay id
  var currentDay = $("#currentDay");
  // Declare a currentHour variable for easy comparison against div times and parse int to return number
  var currentHour = parseInt(today.format("H"));
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // Event listener for click on saveBtn
  saveBtn.on("click", storeTasks);
  // for each key in tasks
  for (const key in tasks) {
    // Declare timeBlock variable to store the each '#hour-i' element's child at the first index --> textarea
    var timeBlock = $("#" + key).children()[1];
    // Take tasks at the key index (user input for each textarea) and assign it as the timeBlock variable's value
    timeBlock.value = tasks[key];
  }

  // Create function to store tasks
  function storeTasks(event) {
    // Declare object variable with keys of event and time
    var storeTask = {
      // Task has a value of the sibling in the 1 index position of the element triggering the event
      // In other words "this" is the saveBtn (index 2) and the sibling's (index 1) value is the user input of the text area
      task: $(this).siblings()[1].value,
      // Time has a value of the saveBtn's parent id, or "#hour-i"
      time: $(this).parent().attr("id"),
    };

    // Give the tasks key a value of time/task pairs in local storage to keep tasks associated with their designated time
    tasks[storeTask.time] = storeTask.task;
    // Set items in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // handleSaveButton();

  // Assign text to the currentDay variable in the desired format from dayjs
  currentDay.text(today.format("dddd, MMMM D, YYYY h:mm A"));

  // for loop using military time to account for rollover from 12 to 1
  for (var i = 9; i < 18; i++) {
    // Declare variable relativeTime to compare current hour with hour on the scheduler
    var relativeTime = $("#hour-" + i);
    // if current hour is greater than current index div's time then assign that div a class of "past"
    if (i < currentHour) {
      relativeTime.addClass("past");
    // else if current hour is equal to current index then assign present
    } else if (i === currentHour) {
      relativeTime.addClass("present");
    // else, assign future
    } else {
      relativeTime.addClass("future");
    }
  }
});
