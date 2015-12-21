var theta = {};
var thetaPosition = 0;
var startTimer =  null;

// init, its what the cool kids do. its a gateway function.
$(document).ready(function(){
    init();
});

// note, woke up inspired, added an add person and remove person function, replaced about a million lines of code.
//
// its big, its ugly, but for the most part it works. im sure there are ways to refactor this down and eliminate
//about 100 lines, but im sticking with my, make it work, then make it smaller. motto. I'm terribly sorry for my css
// i spent more time then i care to admit on it.  i also spent an unhealthy amount of time working on images.
// trying to get the smaller ones bigger and the bigger ones smaller.
// i was not very successful.
//
// so basicly, i used the json info, saved it globally, and move through it using 3 main functions where i choose the
// person based on their index position inside the people array of my Theta object.
//
// the next function goes through the index of people ++ style
// the previous function goes through the index of people -- style
// the index buttons save some data in their button tags that i then use to set the
// index in the people array based on the button clicked..


// init, i can quit anytime i want.
function init(){
    // append some buttons and some divs, in the future i could take all the divs i manually added to the html and stick
    // them in here
    // also,i  make an ajax call to json for a re-up.

    getData();
    $('.directional-buttons').append('<button class="name-btn-left">Prev</button>');
    $('.directional-buttons').append('<button class="name-btn-right">Next</button>');
    $('.person-name').append("<div class='name'></div>");
    $('.person-location').append("<div class='location'></div>");
    $('.person-animal').append("<div class='animal'></div>");
    enable();
}

// started out with an init, now im into enabling. where does it end!
function enable(){
    // add listeners

    $('.directional-buttons').on("click", ".name-btn-left",prev);
    $('.directional-buttons').on("click", ".name-btn-right",next);
    $('#index-buttons').on('click','.index-button',indexClicked);
}
// getData goes and gets the info from the json file, then it loads the first person with the add person function
// and then it starts the timer to rotate thru the people in the json file. it also will
// add the number of index buttons we will need based on whatever information is in the json file.
// note the start timer is set to call the 'next' function, i considered making a random number function
// instead and having the random number be the person that appeared but i ran out of time.

function getData(){

    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            theta = data;
            console.log("success call inside getData",theta);
            addPerson(thetaPosition);
            startTimer = setInterval(next,10000);
            addIndexButtons();
        }

    });

}

// next, first it  checks to see if we are at end of the array if so, we fade out the current person
// move us back to array index 0 and loads that person. if not we add 1 to the array index and load the person there
// instead
// also stops and restarts the auto timer.
function next (){

    if (thetaPosition >= theta.people.length - 1 ){
        removePerson(thetaPosition);
        thetaPosition = 0;
        addPerson(thetaPosition);
        clearInterval(startTimer);
        restartTimer();

    } else {
        removePerson(thetaPosition);
        thetaPosition ++;
        addPerson(thetaPosition);
        clearInterval(startTimer);
        restartTimer();

    }

}

// basicly the same thing as the next function, only it subtracts from the index and checked to see if we are
// at 0 index, if so it resets us to the last index of the array instead. restarts timer etc etc.

function prev(){

    if (thetaPosition <= 0 ){
        removePerson(thetaPosition);
        thetaPosition = theta.people.length - 1;
        addPerson(thetaPosition);
        clearInterval(startTimer);
        restartTimer();

    } else {
        removePerson(thetaPosition);
        thetaPosition --;
        addPerson(thetaPosition);
        clearInterval(startTimer);
        restartTimer();
    }

}

// function to turn the timer back on.
function restartTimer(){
    startTimer = setInterval(next,10000);

}
// function to add however many buttons i need when the json file loads.
function addIndexButtons(){
    for(var i = 0; i < theta.people.length; i++) {
        $("#index-buttons").append('<button class="index-button" data-index='+i+'>' + (i + 1) +'</button>');

    }

}
// selects the person based on whatever button u picked. based on a number assigned to the button when it was
// created.
function indexClicked(){
    removePerson(thetaPosition);
    thetaPosition = $(this).data('index');
    addPerson(thetaPosition);
    clearInterval(startTimer);
    restartTimer();

}

function addPerson(thetaPosition){

    $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
    $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
    $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
    $("#img-animal").append('<img class ="spirit-animal"  src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
    $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
    $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

}

function removePerson(thetaPosition){

    $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
    $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
    $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
    $("#img-animal").children().last().remove().fadeOut('slow');
    $("#img-people").children().last().remove().fadeOut('slow');
    $("#img-location").children().last().remove().fadeOut('slow');

}

// this is the end.
// thanks for playing.
// don't forget to tip your waiters/waitresses.
// 2 drink minimums.
