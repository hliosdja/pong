let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let player = document.querySelector('playerScore');
let bot = document.querySelector('botScore');

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

const paddleHeight = 80;
const paddleThickness = 20;

let ballSpeedX = 0;
let ballSpeedY = 0;

let playerPaddleY = 200;
let botPaddleY = paddleHeight / 2;

let fps = 60;
let playerScore = 0;
let botScore = 0;


window.onload = () => {  
    update();
    movePaddle();

    drawPlayerSeperator();
}

 
update = () => {
    setInterval(()=> {
        drawRect(0, 0, canvas.width, canvas.height, 'rgb(0, 0, 0)');
        drawPlayerSeperator();
        drawRect(1, playerPaddleY, paddleThickness, paddleHeight, 'white');
        drawRect(canvas.width - (paddleThickness + 1), botPaddleY, paddleThickness, paddleHeight, 'white');
        moveBall(); 
        bot();
        botPlayer();
    }, 1000/fps);

    randomizeInitialBallSpeed();
}

//===================================================
moveBall = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width - 10){
        if(ballY > botPaddleY && ballY < botPaddleY + paddleHeight){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            scoring();
        }    
    }
     
    if(ballX < 10){
        if(ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            scoring();
        }     
    }
    
    if(ballY > canvas.height - 10){
        ballSpeedY = -ballSpeedY;
    }
     
    if(ballY < 10){
        ballSpeedY = -ballSpeedY;
    }

    drawBall(ballX, ballY ,10, 'white');
}

movePaddle = () => {    
    canvas.addEventListener('mousemove', (e) => {
        let mousePositionY = getMousePosition(e);
        playerPaddleY = mousePositionY.y - (paddleHeight / 2);
    });
}

//===================================================
getMousePosition = (e) => {
    let canvasArea = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - canvasArea.left - root.scrollLeft;
    let mouseY = e.clientY - canvasArea.top - root.scrollTop;    

    return {
        x: mouseX,
        y: mouseY,
    };
}

ballReset = () => {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
}

randomizeInitialBallSpeed = () => {
    let speedX = Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1);
    let speedY = Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1);
    ballSpeedX = speedX;
    ballSpeedY = speedY;
    console.log(`speed x: ${speedX}`);
    console.log(`speed y: ${speedY}`);
}

scoring = () => {
    if(ballSpeedX > canvas.width){
        playerScore += 1;
        console.log(`botScore ${playerScore}`);
        player.innerHTML = `Player: ${playerScore}`;
    } else if (ballSpeedX < 0){
        botScore += 1;
        console.log(`botScore ${botScore}`);
        bot.innerHTML = `Bot: ${botScore}`;
    }
    
}

bot = () => {
    if(ballY > botPaddleY + (paddleHeight / 2)){
        if(ballX < (canvas.width / 2)){
            botPaddleY += 2;
        } else {
            botPaddleY += 8;
        }
    }
    if(ballY < botPaddleY + (paddleHeight / 2)){
        if(ballX < (canvas.width / 2)){
            botPaddleY -= 3;
        } else {
            botPaddleY -= 6;
        }
    }
}

botPlayer = () => {
    if(ballY > playerPaddleY + (paddleHeight / 2)){
        if(ballX > (canvas.width / 2)){
            playerPaddleY += 3;
        } else {
            playerPaddleY += 8;
        }

    }
    if(ballY < playerPaddleY + (paddleHeight / 2)){
        if(ballX > (canvas.width / 2)){
            playerPaddleY -= 2;
        } else {
            playerPaddleY -= 6;
        }
    }
}
 
//===================================================
drawRect = (x, y, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

drawBall = (x, y, radius, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.fill();
}

drawPlayerSeperator = () => {
    context.beginPath();
    context.setLineDash([5, 10]);
    context.moveTo(canvas.width /2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = 'white';
    context.stroke();
}