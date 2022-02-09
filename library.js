


export const words = [
    ["K","A","R","E","N"],
    ["S","I","G","M","A"],
    ["S","I","M","P","S"],
    ["S","K","I","N","T"],
    ["P","A","N","T","S"],
    ["I","N","N","I","T"],
    ["J","O","K","E","S"],
    ["N","O","C","A","P"],
    ["S","Q","U","A","D"],
    ["T","I","G","H","T"],
    ["N","A","T","T","Y"],
    ["S","K","E","E","N"],
    ["B","A","S","I","C"],
    ["G","H","O","S","T"],
    ["S","A","L","T","Y"],
    ["S","H","A","D","E"],
    ["S","H","O","O","K"],
    ["E","X","T","R","A"],
    ["G","O","A","T","S"],
    ["L","I","N","G","O"],
    ["G","U","C","C","I"],
    ["C","U","R","V","E"],
]



export let timeLeft = ()=> {
    // let tomorrow = new Date().getDate()+1;
    const timeContainer = document.getElementById("time-el");
    let metrics = Array.from(timeContainer.children);
    let tomorrow = new Date().getDate()+1;
    let thisMonth = new Date().getMonth();
    let deadline = new Date(2022, thisMonth, tomorrow,0,0).getTime();
    let currentTime = new Date().getTime();
    let remainder = deadline - currentTime;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    if(remainder < 1){
        deadline = new Date(2022, thisMonth,tomorrow,0,0).getTime();
        remainder = deadline-currentTime;
        removeFromLocalStorage()
        words.shift();
        play = true;
    }

    let hours = Math.floor((remainder % oneDay) / oneHour);
    let minutes = Math.floor((remainder % oneHour ) / oneMinute);
    let seconds = Math.floor((remainder % oneMinute) / 1000);

    const addZero = (i)=>{
        if(i < 10){
            return `0${i}`
        }
        return i
    }

    let remaining = [hours,minutes,seconds];
    metrics.forEach((metric,index)=>{
        metric.innerHTML = addZero(remaining[index]);
    })
    
}

