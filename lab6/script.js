// task 1

const { response } = require("express");

let square = document.getElementById('square');

square.addEventListener('click', function(e) {
    this.style.background = '#' +
        (Math.floor(Math.random() * 16777216)).toString(16);
    e.stopPropagation();
});


// task 2

let counter = document.getElementById('counter');
let startTime = 0;
counter.addEventListener('mouseover', function() {
    startTime = new Date();
});

counter.addEventListener('mouseout', function(e) {
    endTime = new Date();
    this.textContent = 
    (parseInt(this.textContent) + 
        Math.floor((endTime.getTime() - startTime.getTime()) / 100)).toString();
    e.stopPropagation();
});


// task 3 (list.js)

let list = new List('1st', 'choose here', 'butt');
list.addItem('uwu');
list.addItem('aaaaaa');
list.addItem('my life');
list.addItem('sucks');


// task 4

let ball = document.getElementById('ball');
let ballBox = document.getElementById('ball-box');
ballBox.style.top = '400px';
ballBox.style.left = '40px';
let moving = false;
ball.addEventListener('click', function() {
    moving = true;
});

ballBox.onmousemove = (e) => {
    if (!moving) return;
    let ballBoxTop = parseInt(ballBox.style.top.substring(0, ballBox.style.top.length - 2));
    
    let ballBoxLeft = parseInt(ballBox.style.left.substring(0, ballBox.style.left.length - 2));
    let ballTop = parseInt(e.pageY) - 15 - ballBoxTop;
    ballTop = ballTop < 0 ? 0 : ballTop;
    ballTop = ballTop > 770 ? 770 : ballTop;
    let ballLeft = parseInt(e.pageX) - 15 - ballBoxLeft;
    ballLeft = ballLeft < 0 ? 0 : ballLeft;
    ballLeft = ballLeft > 770 ? 770 : ballLeft;

    ball.style.top = `${ballTop}px`;
    ball.style.left = `${ballLeft}px`;
};
document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') moving = false;
});
