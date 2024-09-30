// * Stop number turning into NaN when decimal pressed twice
// * Limit decimal points to 8
// * Reduce font size when overflowing display
// * Return font to normal size if not overflowing display
// * Optimise code for functions
// TODO Format displayFigure in comma-dot format - unsure if this will be possible
// * Make it so that you can type the numbers on your keyboard
// * Change the log key to be "current Answer" so that you can multiply by the answer you just got?
// TODO Optimise code for effect of clicking and typing if possible? - not sure this is doable

let display = document.querySelector('.displayContent');
let displayContainer = document.querySelector(".display");
display.style.fontSize = "48px";

let displayFigure = 0;

let currentAnswer;
let currentFunction;

// ! Resetting function, for when display is the result of a calculation
function reset() {
    if (currentFunction == 'equals') {
        currentAnswer = undefined;
        currentFunction = undefined;
        displayFigure = 0;
    }
};

// ! Code for typing numbers
let numbers = document.querySelectorAll(".number");

// ? Clicking numbers on screen
numbers.forEach(function (b) {
    b.addEventListener("click", (e) => {
        reset();
        if (Number(displayFigure) != Number(displayFigure).toFixed(7)) {
        } else {
            if (displayFigure == 0 && e.currentTarget.textContent == '0' && !display.textContent.includes('.')) {

            } else if (displayFigure == 0 && !display.textContent.includes('.')) {
                displayFigure = e.currentTarget.textContent
            }
            else {
                displayFigure += e.currentTarget.textContent;
            }
        }
    })
});

// ? Typing numbers on top of keyboard
window.addEventListener("keydown", (x) => {
    for (let i = 48; i <= 57; i++) {
        if (x.keyCode == i && x.shiftKey === false) {
            reset();
            if (Number(displayFigure) != Number(displayFigure).toFixed(7)) {
            } else {
                if (displayFigure == 0 && i == 48 && !display.textContent.includes('.')) { } else if (displayFigure == 0 && !display.textContent.includes('.')) {
                    displayFigure = String(i - 48);
                }
                else {
                    displayFigure += String(i - 48);
                }
            };
        }
    }
});

// ? Typing numbers on keypad
window.addEventListener("keydown", (x) => {
    for (let i = 96; i <= 105; i++) {
        if (x.keyCode == i && x.shiftKey === false) {
            reset();
            if (Number(displayFigure) != Number(displayFigure).toFixed(7)) {
            } else {
                if (displayFigure == 0 && i == 96 && !display.textContent.includes('.')) { } else if (displayFigure == 0 && !display.textContent.includes('.')) {
                    displayFigure = String(i - 96);
                }
                else {
                    displayFigure += String(i - 96);
                }
            };
        }
    }
});

// ! Code for decimal point button
let decimal = document.querySelector(".decimal");

// ? Clicking on screen
decimal.addEventListener("click", () => {
    reset();
    if (display.textContent.includes('.')) {
    } else {
        displayFigure += decimal.textContent
    }
})

// ? Typing on keyboard
window.addEventListener("keydown", (x) => {
    if (x.keyCode == '190' || x.keyCode == '110') {
        reset();
        if (display.textContent.includes('.')) {
        } else {
            displayFigure += decimal.textContent
        }
    }
});

// ! Code for functions
let operators = document.querySelectorAll(".operator");

let functions = {
    addi: function (a, b) {
        return String(Number(a) + Number(b));
    },
    subt: function (a, b) {
        return String(Number(a) - Number(b));
    },
    divi: function (a, b) {
        return String(Number(a) / Number(b));
    },
    mult: function (a, b) {
        return String(Number(a) * Number(b));
    },
    equals: function (a, b) {
        return a
    }
};

// ? For clicking on buttons
operators.forEach(function (b) {
    b.addEventListener("click", (e) => {
        if (currentAnswer == undefined) {
            currentAnswer = displayFigure;
            displayFigure = 0;
        } else {
            currentAnswer = functions[currentFunction](currentAnswer, displayFigure);
            displayFigure = 0;
        }
        currentFunction = e.currentTarget.classList[0].slice(0, 4);
    })
});

// + 187, - 189, / 191, * 56
// + 107, - 109, / 111, * 106

// ? For typing on keyboard
window.addEventListener("keydown", (x) => {
    let kc = x.keyCode;
    let sh = x.shiftKey;
    if ((kc === 187 && sh) || kc === 189 || kc === 191 || (kc === 56 && sh) || kc === 107 || kc === 109 || kc === 111 || kc === 106) {
        if (currentAnswer == undefined) {
            currentAnswer = displayFigure;
            displayFigure = 0;
        } else {
            currentAnswer = functions[currentFunction](currentAnswer, displayFigure);
            displayFigure = 0;
        }
        switch (true) {
            case ((kc === 187 && sh === true) || kc === 107):
                currentFunction = 'addi';
                break;
            case (kc === 189 || kc === 109):
                currentFunction = 'subt';
                break;
            case (kc === 191 || kc === 111):
                currentFunction = 'divi';
                break;
            case ((kc === 56 && sh === true) || kc === 106):
                currentFunction = 'mult';
                break;
        }
    }
});

// ! Code for equals button
let equals = document.querySelector(".equals");

equals.addEventListener("click", () => {
    if (currentAnswer == undefined) {
    } else {
        currentAnswer = functions[currentFunction](currentAnswer, displayFigure);
        displayFigure = currentAnswer;
    }
    currentFunction = "equals";
});

window.addEventListener("keydown", (x) => {
    if (x.keyCode == '13') {
        if (currentAnswer == undefined) {
        } else {
            currentAnswer = functions[currentFunction](currentAnswer, displayFigure);
            displayFigure = currentAnswer;
        }
        currentFunction = "equals";
    }
});

// // ! Code for the log button (which logs things to the console.log, rather than actually going a log function)
// ! Code for the Answer button
let ans = document.querySelector(".ans");

ans.addEventListener("click", () => {
    displayFigure = currentAnswer;
    // console.log(currentAnswer);
    // console.log(currentFunction);
    // console.log(displayFigure);
})

// ! Code for negative button
let negative = document.querySelector('.negative');

negative.addEventListener("click", () => {
    displayFigure = Number(displayFigure) * -1;
    if (currentAnswer == (Number(displayFigure) * -1)) {
        currentAnswer = Number(displayFigure);
    }
})

// ! Code for clear button
let clear = document.querySelector(".clear");

// ? Clicking on screen
clear.addEventListener("click", () => {
    displayFigure = 0;
    currentFunction = undefined;
    currentAnswer = undefined;
})

// ? Typing on keyboard
window.addEventListener("keyDown", (x) => {
    if (x.keyCode == '27') {
        console.log('success')
        displayFigure = 0;
        currentFunction = undefined;
        currentAnswer = undefined;
    }
})

// ! Code to ensure that display is updated...

// ? ...on clicking
window.addEventListener("click", () => {

    // ? Round displayFigure if needed
    if (Number(displayFigure) != Number(displayFigure).toFixed(8)) {
        displayFigure = String(Number(Number(displayFigure).toFixed(8)));
    }

    // ? Update display
    display.innerHTML = displayFigure;;

    // ? Update font size
    resize();
})

// ? ...on typing
window.addEventListener("keydown", () => {
    // ? Round displayFigure if needed
    if (Number(displayFigure) != Number(displayFigure).toFixed(8)) {
        displayFigure = String(Number(Number(displayFigure).toFixed(8)));
    }

    // ? Update display
    display.innerHTML = displayFigure;;

    // ? Update font size
    resize();
});

// ! Resizing font function
function resize() {
    function isOverflown(element, container) {
        return element.clientHeight > container.clientHeight || element.clientWidth > container.clientWidth - 15;
    };

    display.style.fontSize = '48px';
    let fontSize = parseInt(display.style.fontSize);
    while (isOverflown(display, displayContainer)) {
        fontSize--;
        display.style.fontSize = fontSize + 'px';
    };
}