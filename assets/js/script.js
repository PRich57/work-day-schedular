// VARIABLE DECLARATIONS

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // var textareaEl = $('.description');
  var saveBtn = $('.saveBtn');
  var tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  saveBtn.on('click', storeEvents);
      for (const key in tasks) {
        var timeBlock = $('#' + key).children()[1];
        timeBlock.value = tasks[key];
        console.log(timeBlock);
      }
      
      function storeEvents(event) {
        var eventStore = {
          event: $(this).siblings()[1].value,
          time: $(this).parent().attr("id"),
        }
        
        tasks[eventStore.time] = eventStore.event;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        console.log(tasks);
        console.log(eventStore);
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
  
  var today = dayjs();

  var currentDay = $('#currentDay');

  currentDay.text(today.format("dddd, MMMM D, YYYY h:mm A"));
  var currentHour = today.format("H");

  for (var i = 9; i < 18; i++){
    var timeB = $('#hour-' + i);
    if (i < currentHour) {
      timeB.addClass("past");
    } else if (i == currentHour) {
      timeB.addClass("present");
    } else {
      timeB.addClass("future");
    }
  }
});
