var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

 document.querySelector(".img1").setAttribute("src","images/dice"+randomNumber1+".png");
//  document.querySelector(".img1").src = "images/dice"+randomNumber1+".png"; //this can also be used

 document.querySelector(".img2").setAttribute("src","images/dice"+randomNumber2+".png");

var heading = document.getElementsByTagName('h1')
 if(randomNumber1>randomNumber2){
    heading[0].textContent = "⛳Player 1 Wins";
 }
 else if(randomNumber1<randomNumber2){
    heading[0].textContent = "⛳Player 2 Wins";
 }
 else{
    heading[0].textContent = "Draw!!";
 }
