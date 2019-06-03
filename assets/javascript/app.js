//sample questions and answers Object
var questionsData = [
    {
        "question": "What is CSS stand for?",
        "ans1": "Cascading Style Sheets",
        "ans2": "css",
        "ans3": "css",  
        "ans4": "css"
    },
    {
        "question": "What is HTML stand for?",
        "ans1": "Cascading Style Sheets",
        "ans2": "Hypertext Markup language",
        "ans3": "HTML",  
        "ans4": "HTMLLL" 
    } 
];
console.log(questionsData);
//correct answers and gif images array
//var gifs = ["assets/images/gif1.gif", "assets/images/gif2.gif","assets/images/gif3.gif"];
var correctAns = ["Cascading Style Sheets","Hypertext Markup language"];

//global variable
var count = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var allowedTime = 15;
var moveGame;

$(".answers").hide();

//onclick start button
$("#start").on("click", function () {
    $("#start").attr("style", "display:none");
    $("#timer").text("Timer: " + allowedTime);
    moveGame = setInterval(majorMoveGame, 1000);
    DisplayQandA();
});

majorMoveGame = function(){
    allowedTime--;
    $("#timer").text("Timer: " + allowedTime);
    if (allowedTime === 0 && count < questionsData.length) {
        clearInterval(moveGame);
        unanswered++;
        console.log("unanswered: " + unanswered);
        timeUp();
        setTimeout(restart, 4 * 1000);
    } else if (allowedTime === 0 && count === questionsData.length) {
        clearInterval(moveGame);
        unanswered++;
        console.log("unanswered: " + unanswered);
        displayResult();
    }
}

DisplayQandA = function(){
    $("#questions-note").empty();
    $("#disclose-answer").empty();
    $("#img-gif").hide();
    $("#score").empty();
    $(".answers").empty();
    $(".answers").show();

    $("#questions-note").text(questionsData[count].question);
    $("#answer1").text(questionsData[count].ans1);
    $("#answer1").attr("value", questionsData[count].ans1);
    $("#answer2").text(questionsData[count].ans2);
    $("#answer2").attr("value", questionsData[count].ans2);
    $("#answer3").text(questionsData[count].ans3);
    $("#answer3").attr("value", questionsData[count].ans3);
    $("#answer4").text(questionsData[count].ans4);
    $("#answer4").attr("value", questionsData[count].ans4);

    if ((questionsData[count].ans3 === undefined) || (questionsData[count].ans4 === undefined)) {
        $("#answer3").hide();
        $("#answer4").hide();
    }
    
    count++;
    console.log("count: " + count);
}

timeUp = function(){
    $("#questions-note").empty();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Time up!");
    $("#disclose-answer").text("The correct answer is: " + correctAns[count - 1]);
}

restart = function() {
    allowedTime = 15;
    $("#timer").text("Timer: " + allowedTime);
    moveGame = setInterval(majorMoveGame, 1000);
    DisplayQandA();
}

congrats = function() {
    $("#questions-note").empty();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Congrats!");
}

wrongAns = function() {
    $("#questions-note").empty();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Sorry, wrong answer!");
    $("#disclose-answer").text("The correct answer is: " + correctAns[count - 1]);
}

displayResult = function () { 
    $("#questions-note").empty();
    $("#disclose-answer").empty();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("You're done!");
    $("#score").append("<h4>Correct answers: " + correct + "</h4>");
    $("#score").append("<h4>Incorrect answers: " + incorrect + "</h4>");
    $("#score").append("<h4>Unanswered: " + unanswered + "</h4><br><br>");
    $("#start-again").attr("style", "display:block");
}

$(".answers").on("click", function () {
    clearInterval(moveGame); 
    var answer = $(this).val();  
    if (answer === correctAns[count - 1]) {    
        correct++;
        console.log("correct asnwers: " + correct)      
        congrats();     
        if (count < questionsData.length) {           
            setTimeout(restart, 5 * 1000);          
        } else {            
            setTimeout(displayResult, 5 * 1000);
        }
       
    } else if (answer !== correctAns[count - 1]) {    
        incorrect++;
        console.log("Incorrect asnwers: " + incorrect);     
        wrongAns();     
        if (count < questionsData.length) { 
            setTimeout(restart, 5 * 1000);            
        } else {           
            setTimeout(displayResult, 5 * 1000);
        }
    }
});

//after timeup start again
$("#start-again").on("click", function () {
    $("#start").attr("style", "display:none");
    count = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    allowedTime = 15;
    $("#timer").text("Timer: " + allowedTime);
    moveGame = setInterval(majorMoveGame, 1000);
    DisplayQandA();
});
