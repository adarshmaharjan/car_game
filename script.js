/* eslint-disable no-param-reassign */
// DOM

const score = document.querySelector('.score')
const startBtn = document.querySelector('.start-btn')
const gameArea = document.querySelector('.game-area')

// document.addEventListener('keyup', keyUp)

// Global variable

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

const player = {
  gameState: false,
  velocity: 5,
  score: 0,
}
// function

const keyDown = (e) => {
  e.preventDefault()
  keys[e.key] = true
  // console.log(player.y)
  // console.log(keys)
}

const keyUp = (e) => {
  e.preventDefault()
  keys[e.key] = false
  // console.log(keys)
}

// collison detection

const isCollided = (a, b) => {
  const rect1 = a.getBoundingClientRect()
  const rect2 = b.getBoundingClientRect()
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    // collision detected!
    return true
  }
  // no collision
  return false
}

// move lines
const moveLine = () => {
  const lines = document.querySelectorAll('.road-line')
  lines.forEach((line) => {
    line.y += player.velocity
    line.style.top = `${line.y}px`
    if (line.y > gameArea.offsetHeight) {
      line.y = -150
    }
  })
}

const gameOver = () => {
  player.gameState = false
}
//  move enemy cars
const moveEnemy = (car) => {
  const enemyCars = document.querySelectorAll('.enemy-car')

  enemyCars.forEach((item) => {
    if (item.y > gameArea.offsetHeight) {
      item.y = -300
      item.style.left = `${Math.floor(Math.random() * 350)}px`
    }

    if (isCollided(car, item)) {
      gameOver()
    }

    item.y += player.velocity
    item.style.top = `${item.y}px`
  })
}

// handle keys
const handleKeys = (car, road) => {
  if (keys.ArrowUp && player.y > road.top + 100) player.y -= player.velocity
  if (keys.ArrowDown && player.y < road.bottom - 70) player.y += player.velocity
  if (keys.ArrowLeft && player.x > 0) player.x -= player.velocity
  if (keys.ArrowRight && player.x < road.width - 50) player.x += player.velocity

  car.style.top = `${player.y}px`
  car.style.left = `${player.x}px`
}
const playGame = () => {
  // car element after its creation
  const car = document.querySelector('.car')
  const road = gameArea.getBoundingClientRect()
  // console.log(road)

  if (player.gameState === true) {
    moveLine()
    moveEnemy(car)
    handleKeys(car, road)
    player.score += 1
    score.textContent = `Score:${player.score}`
    window.requestAnimationFrame(playGame)
  }
}
const createCar = () => {
  // create car
  const car = document.createElement('div')
  car.setAttribute('class', 'car')
  gameArea.appendChild(car)
  player.gameState = true
  window.requestAnimationFrame(playGame)

  player.x = car.offsetLeft
  player.y = car.offsetTop
}
const createLines = () => {
  // create lines
  for (let i = 0; i < 5; i += 1) {
    const roadLine = document.createElement('div')
    roadLine.setAttribute('class', 'road-line')
    roadLine.y = i * 150
    roadLine.style.top = `${roadLine.y}px`
    // console.log(roadLine.y)
    gameArea.appendChild(roadLine)
  }
}
const createobstacle = () => {
  // create enemy cars
  for (let i = 0; i < 3; i += 1) {
    const enemyCar = document.createElement('div')
    enemyCar.y = (i + 1) * 350 * -1
    enemyCar.style.top = `${enemyCar.y}px`
    enemyCar.style.backgroundColor = 'blue'
    enemyCar.setAttribute('class', 'enemy-car')
    enemyCar.style.left = `${Math.floor(Math.random() * 350)}px`
    gameArea.appendChild(enemyCar)
  }
}
const start = () => {
  startBtn.classList.add('hide')
  gameArea.classList.remove('hide')
  score.classList.remove('hide')
  createCar()
  createLines()
  createobstacle()
}

// events

document.addEventListener('keydown', keyDown)

document.addEventListener('keyup', keyUp)

startBtn.addEventListener('click', start)

// execution
