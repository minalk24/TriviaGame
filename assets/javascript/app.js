//sample questions and answers Object
var questionsData = [
    {
        "question": "Dany’s dragons are (or were) called Drogon, Viserion and ____?",
        "ans1": "Dougal",
        "ans2": "Vhagar",
        "ans3": "Rhaegal",  
        "ans4": "Balerion"
    },
    {
        "question": "What does Daenerys mean when she says 'Shekh ma shieraki anni' to Khal Drogo?",
        "ans1": "Moon of my life",
        "ans2": "Get in me wheelbarrow, love",
        "ans3": "Sound did silence me",  
        "ans4": "My sun and stars" 
    },
    {
        "question": "What piece of fencing advice did Jon Snow give to Arya Stark? 'Stick them with the …",
        "ans1": "… prickly end ",
        "ans2": "… sharp end  ",
        "ans3": "… stabby end",  
        "ans4": "… pointy end" 
    }, 
    {
        "question": "Who said: 'Has anyone ever told you you're as boring as you are ugly?",
        "ans1": "The Hound ",
        "ans2": "Jaime Lannister",
        "ans3": "Jon Snow",  
        "ans4": "Peter Snow" 
    }, 
    {
        "question": "Who was responsible for the creation of the Night King?",
        "ans1": "The Lord of Light ",
        "ans2": "The Children of the Forest",
        "ans3": "The Drowned God",  
        "ans4": "The First Men" 
    }, 
    {
        "question": "Who’s this grizzled chap with Ser Jorah and Daenerys?",
        "ans1": "Ser Elrick Sarsfield",
        "ans2": "Ser Balon Swann",
        "ans3": "Ser Royland Degore",  
        "ans4": "Ser Barristan Selmy" 
    }, 
    {
        "question": "Where is the House of Black and White, the training temple of the Faceless Men?",
        "ans1": "Qarth",
        "ans2": "Braavos",
        "ans3": "Meereen",  
        "ans4": "No one knows" 
    }, 
    {
        "question": "Whose last words were: 'Give me something for the pain, and let me die'?",
        "ans1": "Stannis Baratheon",
        "ans2": "Hodor",
        "ans3": "Robert Baratheon",  
        "ans4": "Walder Frey" 
    } 
];
console.log(questionsData);
//correct answers and gif images array
var gifs = ["assets/images/gif1.gif", "assets/images/gif2.gif", "assets/images/gif3.gif", "assets/images/gif4.gif","assets/images/gif5.gif","assets/images/gif6.gif"];
var correctAns = ["Rhaegal","My sun and stars","… pointy end","Jaime Lannister","The Children of the Forest","Ser Barristan Selmy","Braavos","Robert Baratheon"];

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
    $("#img-gif").attr("src", "");
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
    $("#img-gif").hide();
    $("#img-gif").attr("src", "");
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Time up!");
    $("#disclose-answer").text("The correct answer is: " + correctAns[count - 1]);
    $("#img-gif").attr("src", gifs[count-1]);
}

restart = function() {
    allowedTime = 15;
    $("#timer").text("Timer: " + allowedTime);
    moveGame = setInterval(majorMoveGame, 1000);
    DisplayQandA();
}

congrats = function() {
    $("#questions-note").empty();
    $("#img-gif").attr("src", "");
    $("#img-gif").show();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Congrats!");
    $("#img-gif").attr("src", gifs[count-1]);
}

wrongAns = function() {
    $("#questions-note").empty();
    $("#img-gif").attr("src", "");
    $("#img-gif").show();
    $(".answers").empty();
    $(".answers").hide();
    $("#questions-note").text("Sorry, wrong answer!");
    $("#disclose-answer").text("The correct answer is: " + correctAns[count - 1]);
    $("#img-gif").attr("src", gifs[count-1]);
}

displayResult = function () { 
    $("#questions-note").empty();
    $("#disclose-answer").empty();
    $("#img-gif").attr("src", "");
     $("#img-gif").hide();
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
            setTimeout(restart, 4 * 1000);          
        } else {            
            setTimeout(displayResult, 4 * 1000);
        }
       
    } else if (answer !== correctAns[count - 1]) {    
        incorrect++;
        console.log("Incorrect asnwers: " + incorrect);     
        wrongAns();     
        if (count < questionsData.length) { 
            setTimeout(restart, 4 * 1000);            
        } else {           
            setTimeout(displayResult, 4 * 1000);
        }
    }
});

//after timeup start again
$("#start-again").on("click", function () {
    $("#start-again").attr("style", "display:none");
    count = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    allowedTime = 15;
    $("#timer").text("Timer: " + allowedTime);
    moveGame = setInterval(majorMoveGame, 1000);
    DisplayQandA();
});
