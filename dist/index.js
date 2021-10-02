let buttonColors = ['red', 'blue', 'green', 'yellow'];

let randomChosenColor = '';

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let h1 = $('h1');

let started = false;

$('body').on('keypress', (function(){

    started = true;

    nextSequence();

}))

let btn = $(".btn");

btn.click(function(e){

    let userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playSound(userChosenColor); 

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function playSound(path){

    let buttonAudio = new Audio('sounds/' + path + ".mp3");

    buttonAudio.play();
}

function animatePress(currentColor){

    $('#' + currentColor).addClass('pressed');

    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    }else{
        playSound('wrong');

        h1.text('Game Over. Press Any Key to Restart');

        $('body').addClass('game-over');

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 1000);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random()*4);

    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    let buttonSelected = $("#" + randomChosenColor);
    

    buttonSelected.fadeOut(100).fadeIn(100);
    
    animatePress(randomChosenColor);

    playSound(randomChosenColor);
    
    
    level++;
    h1.text("Level " + level);
    
    
    
} 

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function refreshDate(){
    let futureDate = new Date(2021, 0, 26)
let futureTime = futureDate.getTime();
console.log(futureTime);


// 1s = 1000ms
// 1min = 60s = 1000ms*60s
// 1hr = 60mins = 1000ms*60s*60mins
// 1day = 24hrs = 1000ms*60s*60mins*24hrs

let today = new Date();
let timeToday = today.getTime();
console.log(timeToday);

let daysLeft;
let hoursLeft;
let minutesLeft;
let secondsLeft;

daysLeft = Math.floor((futureTime-timeToday)/(1000*60*60*24));

hoursLeft = Math.floor(
    ((futureTime-timeToday)%(1000*60*60*24))/(1000*60*60)
);
console.log(hoursLeft);

minutesLeft = Math.floor((futureTime-timeToday)%(1000*60*60)/(1000*60));
console.log(minutesLeft);

secondsLeft = Math.floor(
    (futureTime-timeToday)%(1000*60)/(1000)
);

console.log(secondsLeft);

let end = $('.end');

end.html(
    `
    <span>${daysLeft}</span>
    <span>${hoursLeft}</span>
    <span>${minutesLeft}</span>
    <span>${secondsLeft}</span>
    `
)
}
setInterval(refreshDate, 1000);
