var theta = {};
var thetaPosition = 0;
var startTimer =  null;

// init, its what the cool kids do. its a gateway function.
$(document).ready(function(){
    init();
});


// its big, its ugly, but for the most part it works. im sure there are ways to refactor this down and eliminate
//about 100 lines, but im sticking to my, make it work, then make it smaller creedo. I'm terribly sorry for my css
// i spent more time then i care to admit. just  trying to achive its current level of wonkyness. i also spent an unhealthy
// amount of time working on images trying to get the smaller ones bigger and the bigger ones smaller. i was not
// very successful.
//
// so basicly, i used the json info, saved it globally, and move through it using 3 main functions where i choose the
// person based on there index position inside the people array of my Theta object.
//
// the next function goes through the index of people ++ style
// the previous goes through the index of people -- style
// the index buttons save some data in their button tags that i then use to set the index in the people array.


// init, i can quit anytime i want.
function init(){
    // append da dom, i also make my call to get the json data in here.
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
// yupper doo, goes and gets the info from the json file, makes sure to load the first person to the dom
// from that file and then it starts the timer to rotate thru the people in the json file. it also will
// add the number of index buttons we will need based on whatever information is in the json file.
// note the start timer is set to call the next function, i considered making a random number function
// and using the same layout that i have for the index-button function to have it randomly take you to
// a different person, but i ran out of time. so we just move to the next person instead.

function getData(){

    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            theta = data;
            console.log("success call inside getData",theta);
            thlidedown();
            startTimer = setInterval(next,10000);
            addIndexButtons();
        }

    });

}

// puts the first person on the dom.
// then it puts the lotion in the basket.
//
// you can't not stop the thlidedown!!
//
function thlidedown(){
    $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
    $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
    $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
    $("#img-animal").append('<img class ="spirit-animal" src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
    $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
    $("#img-location").append('<img class = "city" src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');
}

// next, first it  checks to see if we are at end of the array if so, we fade out the current person
// move us back to array index 0 and loads that person. if not we add 1 to the array index and load the person there
// instead
// also stops and restarts the auto timer.
function next (){

    if (thetaPosition >= theta.people.length - 1 ){

        $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
        $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
        $("#img-animal").children().last().remove().fadeOut('slow');
        $("#img-people").children().last().remove().fadeOut('slow');
        $("#img-location").children().last().remove().fadeOut('slow');

        thetaPosition = 0;

        $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
        $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
        $("#img-animal").append('<img  class ="spirit-animal" src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
        $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
        $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

        clearInterval(startTimer);
        restartTimer();

    } else {

        $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
        $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
        $("#img-animal").children().last().remove().fadeOut('slow');
        $("#img-people").children().last().remove().fadeOut('slow');
        $("#img-location").children().last().remove().fadeOut('slow');

        thetaPosition ++;

        $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
        $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
        $("#img-animal").append('<img class ="spirit-animal" src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
        $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
        $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

        clearInterval(startTimer);
        restartTimer();

    }

}

// basicly the same thing as the next function, only it subtracts from the index and checked to see if we are
// at 0 index, if so it resets us to the last index of the array instead. restarts timer etc etc.

function prev(){

    if (thetaPosition <= 0 ){

        $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
        $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
        $("#img-animal").children().last().remove().fadeOut('slow');
        $("#img-people").children().last().remove().fadeOut('slow');
        $("#img-location").children().last().remove().fadeOut('slow');

        thetaPosition = theta.people.length - 1;

        $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
        $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
        $("#img-animal").append('<img class ="spirit-animal"  src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
        $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
        $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

        clearInterval(startTimer);
        restartTimer();

    } else {

        $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
        $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
        $("#img-animal").children().last().remove().fadeOut('slow');
        $("#img-people").children().last().remove().fadeOut('slow');
        $("#img-location").children().last().remove().fadeOut('slow');

        thetaPosition --;

        $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
        $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
        $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
        $("#img-animal").append('<img class ="spirit-animal"  src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
        $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
        $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

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
    console.log($(this).data('index'));
    // was working on adding a class and highlighting the button then was planning on another function that
    // tracked whichever current image we were on and highlighted that one. but ran out of time. maybe i will
    // finish it up over xmas break. or maybe i will see star wars 5 times. one can never tell these things in
    // advance.
    //$(this).addclass("active");
    //$(this).siblings().removeClass("active");

    $(".person-name").children().last().text(theta.people[thetaPosition].name).fadeOut();
    $(".person-location").children().last().text(theta.people[thetaPosition].location).fadeOut();
    $(".person-animal").children().last().text(theta.people[thetaPosition].animal).fadeOut();
    $("#img-animal").children().last().remove().fadeOut('slow');
    $("#img-people").children().last().remove().fadeOut('slow');
    $("#img-location").children().last().remove().fadeOut('slow');

    thetaPosition = $(this).data('index');

    $(".person-name").children().last().text(theta.people[thetaPosition].name).hide().fadeIn('slow');
    $(".person-location").children().last().text(theta.people[thetaPosition].location).hide().fadeIn('slow');
    $(".person-animal").children().last().text(theta.people[thetaPosition].animal).hide().fadeIn('slow');
    $("#img-animal").append('<img class ="spirit-animal"  src=' + theta.people[thetaPosition].imgurl_animal +'>').hide().fadeIn('slow');
    $("#img-people").append('<img class ="lazer-img" src=' + theta.people[thetaPosition].imgurl_people +'>').hide().fadeIn('slow');
    $("#img-location").append('<img class = "city"  src=' + theta.people[thetaPosition].imgurl_location +'>').hide().fadeIn('slow');

    clearInterval(startTimer);
    restartTimer();

}

// this is the end.
// thanks for playing.
// don't forget to tip your waiters/waitresses.
// 2 drink minimums.