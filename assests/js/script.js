var currentDay = document.getElementById("#currentDay");
var options = {
    startTime: 9,
    endTime: 19
}
function save(e){
    var hour = $(e.target()).parent().parent().attr('data-hour');
    var task = $(e.target()).parent().prev().children().val();

    localStorage.setItem(hour, task);
    console.log("saved");
}

function updateTimeSlots(){
    var currentTime = moment().hour();
    $('.time-block').each(function(index, element){

        var hour = $(element).attr('data-hour')
        if(hour < currentTime){
            $(element).find('description').addClass('past');
        } else if (hour === currentTime){
            $(element).find('description').addClass('present');
        } else{
            $(element).find('description').addClass('future');
        }
    })
}

function generateTimeSlots(){
    
}

function initialize(){
    setInterval(function(){
        updateTimeSlots();
    }, 10000);
}

initialize();