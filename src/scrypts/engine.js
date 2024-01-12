const state = {

    view :{
        attempts : document.querySelector('.attempts')
    },

    values : {
        CurrentAttempt : 0    
    }
}


const emojis = 
[
    "☠",
    "☠",
    "👻",
    "👻",
    "👽",
    "👽",
    "👾",
    "👾",
    "👺",
    "👺",
    "👹",
    "👹",
    "🤡",
    "🤡",
    "🐱‍👤",
    "🐱‍👤"];

let openCards = [];    


let shuffle = emojis.sort(()=>(Math.random() > 0.5 ? 2 : -1));

for (let i=0; i < emojis.length; i++ ) {

    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffle[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {

    if (openCards.length < 2) {

        this.classList.add("boxOpen");
        openCards.push(this);  
    }

    if (openCards.length == 2) {

        setTimeout(checkMatch, 500);  
    }
}

function checkMatch() {

    
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");

    } else {
    
        state.values.CurrentAttempt++;
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];
    state.view.attempts.textContent = state.values.CurrentAttempt;

    checkAttempt();
}

function checkAttempt() {

    if (document.querySelectorAll('.boxMatch').length == emojis.length) {
        
        alert('Você venceu!');
        reset();
    } else if ((state.values.CurrentAttempt == 5) && (document.querySelectorAll('.boxMatch').length != emojis.length)) {
        
        alert('Você perdeu! Tente novamente');
        reset();
    }    
}

function reset() {

    state.values.CurrentAttempt = 0;
    openCards = [];
    window.location.reload();
}