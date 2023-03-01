var drums = document.getElementsByClassName("drum");
for(var i=0 ; i<drums.length ; i++){
   drums[i].addEventListener("click" , function(){
    buttonInnerHtml = this.innerHTML;
   
    makeSound(buttonInnerHtml);
    buttonAnimation(buttonInnerHtml);

       //this is the current element that you have clicked
    })
}

document.addEventListener('keydown', function(key){
    makeSound(key.key);
    buttonAnimation(key);
} )

function makeSound(key){
    switch (key) {
        case 'w':
          new Audio("sounds/tom-1.mp3").play();
        break;

        case 'a':
          new Audio("sounds/tom-2.mp3").play();
        break;

        case 's':
          new Audio("sounds/tom-3.mp3").play();
        break;

        case 'd':
          new Audio("sounds/tom-4.mp3").play();
        break;

        case 'j':
          new Audio("sounds/crash.mp3").play();
        break;

        case 'k':
          new Audio("sounds/kick-bass.mp3").play();
        break;

        case 'l':
          new Audio("sounds/snare.mp3").play();
        break;
    
        default:
            console.log(key);
            break;
    }
}

function buttonAnimation(currentKey){
  var btn = document.querySelector("." + currentKey);
  btn.classList.add("pressed") ;

  setTimeout(function(){
    btn.classList.remove('pressed');
  }, 100);
}

//Callback function working

// function anotherAddEventListener(typeOfEvent , callBack){
     
//     var eventThatHappened = {
//         eventType : "keypress",
//         duration : 2,
//         key : "p"
//     }

//     if(eventThatHappened.eventType == typeOfEvent){
//         callBack(eventThatHappened);
//     }
// }

// anotherAddEventListener("keypress" , function(e){
//     console.log(e);
// }
// )
