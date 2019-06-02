//questions and answers Object
var questionsData = [
    {
        "question": "What is CSS stand for?",
        "answer1": "Cascading Style Sheets",
        "answer2": "css",
        "answer3": "css",  
        "answer4": "css"
    },
    {
        "question": "What is HTML stand for?",
        "answer1": "Cascading Style Sheets",
        "answer2": "Hypertext Markup language",
        "answer3": "css",  
        "answer4": "css"
    }

];

console.log(questions);
//correct answers and gif images array
var gifs = ["assets/images/gif1.gif", "assets/images/gif2.gif","assets/images/gif3.gif"];
var correctAns = ["Cascading Style Sheets","Hypertext Markup language"];

//global variable
var count = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var allowedTime = 11;
var moveGame;

$(".answers").hide();

//onclick start button
$("#start").on("click", function () {
    $("#start").attr("style", "display:none");
    moveGame = setInterval(majorMoveGame, 1000);
});
//functions
majorMoveGame = function(){
    allowedTime--;
    $("#timer").text("Timer: " + allowedTime);

    if (allowedTime === 0 && count < questionsData.length) {
        clearInterval(moveGame);
        
    }
}