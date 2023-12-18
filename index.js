let score = 0;
let scoreCount = document.getElementById('scoreCont');
let cross = true;

let bgMusic = new Audio("images/music.mp3");
let gameOverSound = new Audio("images/gameover.mp3");

setTimeout(() => 
{
    bgMusic.play();
}, 1000);

document.onkeydown = function (e)
{
    if(e.keyCode == 38)
    {
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if(e.keyCode == 39)
    {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + 'px';
    }

    if(e.keyCode == 37)
    {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + 'px';
    }
};

setInterval(() =>
{
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if(offsetX < 73 && offsetY < 52)
    {
        gameOver.innerHTML = 'Game Over! Reload to play again.';
        obstacle.classList.remove('obstacleAni');
        gameOverSound.play();
        setTimeout(() => 
        {
            gameOverSound.pause();
            bgMusic.pause();
        }, 1000);
    }
    else if(offsetX < 145 && cross)
    {
        score++;
        updateScore();
        cross = false;
        setTimeout(() => 
        {
            cross = true;
        }, 1000);
        setTimeout(() => 
        {
            let animationDuration = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'))
            let newDuration = animationDuration - 0.1;
            obstacle.style.animationDuration = newDuration + 's';
            console.log('New duration of the animation is:', newDuration);
        }, 500);
    }
}, 10);

function updateScore()
{
    scoreCount.innerHTML = 'Your score: ' + score;
}