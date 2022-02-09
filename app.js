import {words} from "./library.js";
import{timeLeft} from"./library.js";


setInterval(timeLeft,1000);
timeLeft()

let targetWord = words[0];


console.log(targetWord)
const firstTry = document.querySelectorAll(".first");
const secondTry = document.querySelectorAll(".second");
const thirdTry = document.querySelectorAll(".third");
const fourthTry = document.querySelectorAll(".fourth");
const fifthTry = document.querySelectorAll(".fifth");
const sixthTry = document.querySelectorAll(".sixth")
const youWin = document.querySelector(".result-container")
let text = document.getElementById("result")
const keys = document.querySelectorAll(".key");
const container = document.querySelector(".container");
const enter = document.querySelector(".enter");
const backspace = document.querySelector(".return");
let timeContainer = document.getElementById("time-el");
const gridContainer = document.querySelector(".grid-container");
const closeBtn = document.querySelector(".closebtn");
const rows = Array.from(gridContainer.children);
const shareBtn = document.getElementById("share-btn");
const alert = document.querySelector(".alert")
const cog = document.querySelector(".show-result");
let play = true;
let counter = 0;

let displayArray = [firstTry,secondTry,thirdTry,fourthTry,fifthTry,sixthTry];



container.addEventListener("click", e=>{
  if(!e.target.closest("span")) return;

  if(e.target.closest("span") && play){
  const targetLetter = e.target.innerHTML;
 inputLetters(targetLetter)

    }

});

backspace.addEventListener("click",()=>{
    turn[counter-1].innerHTML = "";
    counter--
})

enter.addEventListener("click",()=>{
    let copy = [...targetWord];
    let answer=[];
    if(play){
    turn.forEach((letter,index)=>{
        answer.push(letter.innerHTML);
        for(let i = 0; i<targetWord.length;i++){
            if(letter.innerHTML === targetWord[i] && index === i){
            setTimeout(changeGreen,250*index,letter)
            targetWord[i] = "."
            return;
           }

           else if(letter.innerHTML === targetWord[i] && index !== i){
           setTimeout(changeOrange,250*index,letter)
           return;
           }

        }
        if(!letter.classList.contains("green") && !letter.classList.contains("orange")){
            setTimeout(changeGrey,250*index,letter);
        }

    })
}
    targetWord = copy;
    let checker = 0;
    for(let i=0; i<targetWord.length;i++){
        if(answer[i]===targetWord[i]){
            checker++
        }
    }
    if(checker ===5 || turn ===sixthTry){
        setTimeout(result,3300);
        play = false;
        
    }
    addToLocalStorage(answer);
    turnNo++
    counter = 0;
})

closeBtn.addEventListener("click", ()=>{
    youWin.classList.remove("show")
})

shareBtn.addEventListener("click",()=>{
    updateClipboard(`
    I got ${turnNo}/6,
     try Wordl!`
    );
    showAlert()
})

cog.addEventListener("click",()=>{
    youWin.classList.add("show")
})


window.addEventListener("DOMContentLoaded",()=>{
    let items = getLocalStorage();
    if(items.length > 0){
        play = false;
        displayAnswers()
    }

    displayArray.forEach((element,index)=>{
        if(index < items.length){
            displayColor(element);
        }
    })
    
})





// FUNCTIONS
let turnNo = 0;
let turn;

function turnSelector(turnNo){
    switch(turnNo){
        case 0:
        turn = firstTry;
        break;

        case 1:
        turn = secondTry;
        break;

        case 2:
        turn = thirdTry;
        break;

        case 3:
        turn = fourthTry;
        break;

        case 4:
        turn = fifthTry;
        break;

        case 5:
        turn = sixthTry;
        break;

    }
}

function inputLetters(targetLetter){
    turnSelector(turnNo);
    switch(counter){
    case 0:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 1:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 2:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 3:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 4:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    }
}


function changeGreen(letter){
    letter.classList.add("green");
    letter.style.transform = "rotateX(360deg)"

}
function changeOrange(letter){
    letter.classList.add("orange");
    letter.style.transform = "rotateX(360deg)"
}
function changeGrey(letter){
    letter.classList.add("wrong");
    letter.style.transform = "rotateX(360deg)";
    keys.forEach((key)=>{
        if(key.innerHTML===letter.innerHTML){
            key.style.background = "rgba(0,0,0,0.3)"
        }
    })

}

function showAlert(){
    alert.classList.add("show");
    setTimeout(function(){alert.classList.remove("show")}, 1000)
}


function result(){
    youWin.classList.add("show");
    text.innerHTML = 
    `Result:
    ${turnNo}/6
    `;

}

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
    });
  }
  



// Local storage


function getLocalStorage(){
    return localStorage.getItem("list") ? //check if localStorage,getItem("list") exists 
    JSON.parse(localStorage.getItem("list")) : // items = list which is an array 
    [];
}

function addToLocalStorage(row){
    const obj = {row}; //shorthand {id,value} as parameters match object property
    // check if item exists in the list
    let items = getLocalStorage();
    items.push(obj);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(){
    let items = getLocalStorage();
    items.forEach((item)=>{
        items.shift(item)
    })
    localStorage.setItem("list",JSON.stringify(items))
}


function displayAnswers(){
    let items = getLocalStorage();
    
    if(items.length > 0){
         items.forEach((item,index)=>{
              for(let i = 0;i<rows.length-1;i++){
                 rows[index].children[i].innerHTML= item.row[i];
              }
         })
     }
     
}



 function displayColor(array){

    array.forEach((letter,index)=>{
        for(let i = 0; i<targetWord.length;i++){
            if(letter.innerHTML === targetWord[i] && index === i){
            setTimeout(changeGreen,250*index,letter)
            return;
           }

           else if(letter.innerHTML === targetWord[i] && index !== i){
           setTimeout(changeOrange,250*index,letter)
           return;
           }

        }
        if(!letter.classList.contains("green") && !letter.classList.contains("orange")){
            setTimeout(changeGrey,250*index,letter);
        }

    })
 }
