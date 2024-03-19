const page1 = document.querySelector(".page1");
const page2 = document.querySelector(".page2");
const page3 = document.querySelector(".page3");
const getQue = document.querySelector(".add-que");
const getOptions = document.querySelector(".options");
const exitBtn = document.querySelector(".exit-btn");
const startBtn = document.querySelector(".nxt-btn");
const mainTime = document.querySelector(".digital-time");
const lineTime = document.querySelector(".time-line");
const countPage = document.querySelector(".page-count");
const resultPage = document.querySelector(".result-page");
const correctMark = document.querySelector(".correct-mark");
const position = document.querySelector(".position");

page1.classList.add("page-animate");
page2.classList.add("page-animate");
page3.classList.add("page-animate");
resultPage.classList.add("page-animate");

exitBtn.onclick = () => {
    window.location.reload();
}

let index = 0;
let countTime = 15;
let addTime;
let countLine = 0;
let addLine;
let countMark = 0;

function secTime() {
    countTime--;
    mainTime.innerHTML = countTime;
    if (mainTime.innerHTML < 10) {
            mainTime.innerHTML = 0+mainTime.innerHTML;
    } 
    if (index == questions.length-1) {
        if (countTime == 0) {
            showResult();
        }
    }
    if (mainTime.innerHTML =="00") {
        mainTime.innerHTML = "15";
        countTime = 15;
        countLine = 0;
        index++;
        addQue(index);
        countPage.innerHTML = `${index+1} of ${questions.length}`;
    }
    if (index == questions.length-1) {
        if (countTime == 0) {
            showResult();
            getPosition();
        }
    }
}
function setLine() {
    countLine++;
    lineTime.style.width = `${countLine}px`;
}

startBtn.onclick = () => {
    page1.style.display = "none";
    exitBtn.style.display = "block";
    page2.style.display = "flex";
    startBtn.innerHTML = "Continue";
    
    startBtn.onclick = () => {
        page1.style.display = "none";
        exitBtn.style.display = "none";
        page2.style.display = "none";
        page3.style.display = "flex";
        startBtn.innerHTML = "Next";
        startBtn.style.display = "none";

        addTime = setInterval(secTime,1000);
        addLine = setInterval(setLine,48);

        countPage.innerHTML = `${index+1} of ${questions.length}`;

        startBtn.onclick = () => {
            startBtn.style.display = "none";
            index++;
            addQue(index);
            countLine = 0;
            mainTime.innerHTML = "15";
            countTime = 15;

            addTime = setInterval(secTime,1000);
            addLine = setInterval(setLine,48);

            countPage.innerHTML = `${index+1} of ${questions.length}`;

            if (index == questions.length-1) {
                startBtn.innerHTML = "Result";
                startBtn.onclick = () => {
                    showResult();
                    getPosition();
                }
            }
        }
    }
};

function addQue() {
    const data = questions[index];
    
    getQue.innerHTML = `${index+1}. ${data.question}`;
    
    getOptions.innerHTML = 
    `<p>${data.options[0]}</p>`+
    `<p>${data.options[1]}</p>`+
    `<p>${data.options[2]}</p>`+
    `<p>${data.options[3]}</p>`;

    const clickOptions = document.querySelectorAll(".options p");

    clickOptions.forEach(element => {
        element.classList.add("hover-out");
        element.onclick = () => {
            clearInterval(addTime);
            clearInterval(addLine);
            element.style.border = "none";
            startBtn.style.display = "block";

            for (let i = 0; i < getOptions.children.length; i++) {
                getOptions.children[i].classList.add("disable-btn");
            }
            
            if (element.innerHTML == data.answer) {
                element.style.backgroundColor = "green";
                element.classList.add("scale");
                element.innerHTML = element.innerHTML + `<span class="material-symbols-outlined">done</span>`;
                countMark++;
                
            } else {
                element.style.backgroundColor = "red";
                element.innerHTML = element.innerHTML + `<span class="material-symbols-outlined">close</span>`;

                for (let i = 0; i < getOptions.children.length; i++) {
                    if (getOptions.children[i].innerHTML == data.answer) {
                        getOptions.children[i].style.backgroundColor = "green";
                        getOptions.children[i].innerHTML = getOptions.children[i].innerHTML + `<span class="material-symbols-outlined">done</span>`;
                        getOptions.children[i].classList.add("scale");
                    } else if (getOptions.children[i].innerHTML != data.answer) {
                        getOptions.children[i].style.backgroundColor = "red";
                        getOptions.children[i].innerHTML = getOptions.children[i].innerHTML + `<span class="material-symbols-outlined">close</span>`;
                    }
                }  
            }
        }
    });
    
}
addQue(index);

function showResult() {
    page3.style.display = "none";
    startBtn.innerHTML = "Retry";
    resultPage.style.display = "flex";
    correctMark.innerHTML = `Your score is ${countMark} of ${questions.length}`;
    startBtn.onclick = () =>{
         window.location.reload();
    }
}
function getPosition() {
    if (countMark <= (questions.length/3)) {
        position.innerHTML = "You are failed";
    } else if (countMark <= (questions.length-2)) {
        position.innerHTML = "You are passed";
    } else if (countMark == questions.length) {
        position.innerHTML = "Congratulations";
    } 
}