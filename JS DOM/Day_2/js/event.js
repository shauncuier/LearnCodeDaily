// Event handler type 1

function bgRed() {
    document.body.style.backgroundColor = "red";
}
function bgYellow() {
    document.body.style.backgroundColor = "yellow";
}
function bgBlue() {
    document.body.style.backgroundColor = "blue";
}
function bgGreen() {
    document.body.style.backgroundColor = "green";
}

// Event handler type 2

const btnMakeBlue = document.getElementById("btn-make-blue");
btnMakeBlue.onclick = function () {
    document.body.style.backgroundColor = "blue";
};

// Event handler type 3

const btnMakePurple = document.getElementById("btn-make-purple");
btnMakePurple.onclick = makePurple;
function makePurple() {
    document.body.style.backgroundColor = "purple";
}

// Event handler type 4

document.getElementById('btn-make-green').addEventListener('click', function () {
    document.body.style.backgroundColor = 'green';
});
