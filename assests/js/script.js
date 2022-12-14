var options = {
    startTime: 9,
    endTime: 23
}
function savedButton(e){
    // Saves the written task into local storage
    var hour = $(e.target).parent().parent().attr('data-hour');
    var task = $(e.target).parent().prev().children().val();

    localStorage.setItem(hour, task);
    console.log("saved");
}

function updateTimeSlots(){
    var currentTime = moment().hour();
    $('.time-block').each(function(index, element){

        // Depending on the current time, the time slots will have different colours and changes accordingly (i.e., past=grey, present=red, future=green)
        var hour = $(element).attr('data-hour')
        if(hour < currentTime){
            $(element).find('.description').addClass('past');
        } else if (hour == currentTime){
            $(element).find('.description').addClass('present');
        } else{
            $(element).find('.description').addClass('future');
        }
    })
}

function generateTimeSlots(){
    // Adds the time slots for the user to then update for the respective time
    for(var hour = options.startTime; hour <= options.endTime; hour++){

        // Stores the task into local storage based on the houre writtem
        var savedItem = localStorage.getItem(hour);

        // Adding styles and formats to the timeslot, save buttons, description at the top of the page and text area
        var timeSlot = $('<div>').addClass('row time-block');
        timeSlot.attr('data-hour', hour);

        var hourSlot = $('<div>').addClass('col-sm-2 hour').text(moment(hour, 'h').format('h A'));
        var description = $('<div>').addClass('col-sm-8 row');
        var textArea = $('<textarea>').addClass('col-md-12 description');
        textArea.val(savedItem); 

        var saveContainer = $('<div>').addClass('saveBtn d-flex justify-content-center align-items-center col-sm-2');
        saveContainer.on('click', savedButton);
        var saveTask = $('<i>').addClass('fas fa-save');

        timeSlot.append(hourSlot);
        timeSlot.append(description);
        description.append(textArea);
        timeSlot.append(saveContainer);
        saveContainer.append(saveTask);

        $('.container').append(timeSlot);
    }
}

function initialize(){

    // Returns the generated time slots
    generateTimeSlots();

    // Returns the time slots once a user has entered in any updates for it
    updateTimeSlots();

    // Displays the date and time that the user is visiting the site on
    var currentDay = moment().format('dddd MMMM Do YYYY, hh:mm:ss a');
    $('#currentDay').text(currentDay);

    setInterval(function(){
        updateTimeSlots();
    }, 10000);
}

initialize();