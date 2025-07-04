// Game Constants & Variavles
let inputDirection = { x: 0, y: 0 }
const foodSound = new Audio("./food.mp3")
const gameOverSound = new Audio("./gameover.mp3")
const moveSound = new Audio("./move.mp3")
const musicSound = new Audio("./music.mp3")
// let board = document.querySelector("#board")
let speed = 5
let lastPaintTime = 0
let snakeArray = [{ x: 13, y: 15 }]
let food = { x: 6, y: 7 }
let score = 0


// Game Functions
function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) return

    lastPaintTime = cTime
    gameEngine()
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true
    }
    // If you bump into the wall
    if (snake[0].x >= 17 || snake[0].x <= 1 && snake[0].y >= 17 || snake[0].y <= 1)
        return true
    // return false
}

function gameEngine() {
    // Part 1: Updating the snake array and Food
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        musicSound.pause()
        inputDirection = { x: 0, y: 0 }
        alert("Game Over")
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0
    }

    // If you have Eaten the food, increment the score and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play()
        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        // snakeArray[i]
        snakeArray[i + 1] = { ...snakeArray[i] }
    }
    snakeArray[0].x += inputDirection.x
    snakeArray[0].y += inputDirection.y

    // Part 2: Render the snake and Food
    // Dispaly the snake
    board.innerHTML = ""
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0)
            snakeElement.classList.add("head")
        else
            snakeElement.classList.add("snake")
        board.appendChild(snakeElement)
    })
    // Display the food
    let foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)

}


//Main logic starts here
window.requestAnimationFrame(main)
window.addEventListener("keydown", e => {
    inputDirection = { x: 0, y: 1 } // Strat the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDirection.x = 0
            inputDirection.y = -1
            break;

        case "ArrowDown":
            inputDirection.x = 0
            inputDirection.y = 1
            break;

        case "ArrowLeft":
            inputDirection.x = -1
            inputDirection.y = 0
            break;

        case "ArrowRight":
            inputDirection.x = 1
            inputDirection.y = 0
            break;

        default:
            break;
    }
})