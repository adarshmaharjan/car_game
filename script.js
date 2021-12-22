/* eslint-disable no-param-reassign */
class CarGame {
  constructor(parentElement) {
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    }
    this.player = {
      x: 0,
      y: 0,
      gameState: false,
      velocity: 5,
      score: 0,
    }
    this.parentElement = parentElement
    this.startBtn = this.parentElement.querySelector('.start-btn')
    this.gameArea = this.parentElement.querySelector('.game-area')
    this.score = this.parentElement.querySelector('.score')
  }

  // methods

  moveLine() {
    const lines = this.gameArea.querySelectorAll('.road-line')
    lines.forEach((line) => {
      line.y += this.player.velocity
      line.style.top = `${line.y}px`
      if (line.y > this.gameArea.offsetHeight) {
        line.y = -150
      }
    })
  }

  gameOver = () => {
    this.player.gameState = false
  }

  moveEnemy(car) {
    const enemyCars = this.gameArea.querySelectorAll('.enemy-car')

    enemyCars.forEach((item) => {
      if (item.y > this.gameArea.offsetHeight) {
        item.y = -300
        item.style.left = `${Math.floor(Math.random() * 350)}px`
      }

      // eslint-disable-next-line no-undef
      if (isCollided(car, item)) {
        this.gameOver()
      }

      item.y += this.player.velocity
      item.style.top = `${item.y}px`
    })
  }

  handleKeys(car, road) {
    if (this.keys.ArrowUp && this.player.y > road.top + 100)
      this.player.y -= this.player.velocity
    if (this.keys.ArrowDown && this.player.y < road.bottom - 70)
      this.player.y += this.player.velocity
    if (this.keys.ArrowLeft && this.player.x > 0)
      this.player.x -= this.player.velocity
    if (this.keys.ArrowRight && this.player.x < road.width - 50)
      this.player.x += this.player.velocity

    car.style.top = `${this.player.y}px`
    car.style.left = `${this.player.x}px`
  }

  playGame() {
    // car element after its creation
    const car = this.gameArea.querySelector('.car')
    const road = this.gameArea.getBoundingClientRect()
    // console.log(road)

    if (this.player.gameState === true) {
      this.moveLine()
      this.moveEnemy(car)
      this.handleKeys(car, road)
      this.player.score += 1
      this.score.textContent = `Score:${this.player.score}`
      window.requestAnimationFrame(this.playGame.bind(this))
    }
  }

  createCar() {
    // create car
    const car = document.createElement('div')
    car.setAttribute('class', 'car')
    this.gameArea.appendChild(car)
    this.player.gameState = true
    window.requestAnimationFrame(this.playGame.bind(this))

    this.player.x = car.offsetLeft
    this.player.y = car.offsetTop
  }

  createLines() {
    // create lines
    for (let i = 0; i < 5; i += 1) {
      const roadLine = document.createElement('div')
      roadLine.setAttribute('class', 'road-line')
      roadLine.y = i * 150
      roadLine.style.top = `${roadLine.y}px`
      // console.log(roadLine.y)
      this.gameArea.appendChild(roadLine)
    }
  }

  createObstacle = () => {
    // create enemy cars
    for (let i = 0; i < 3; i += 1) {
      const enemyCar = document.createElement('div')
      enemyCar.y = (i + 1) * 350 * -1
      enemyCar.style.top = `${enemyCar.y}px`
      enemyCar.style.backgroundColor = 'blue'
      enemyCar.setAttribute('class', 'enemy-car')
      enemyCar.style.left = `${Math.floor(Math.random() * 350)}px`
      this.gameArea.appendChild(enemyCar)
    }
  }

  eventHandler() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true
      // console.log(this.keys)
    })

    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false
      // console.log(this.keys)
    })

    this.startBtn.addEventListener('click', this.start)
  }

  start() {
    this.startBtn.classList.add('hide')
    this.gameArea.classList.remove('hide')
    this.score.classList.remove('hide')
    this.player.gameState = true
    this.createCar()
    this.eventHandler()
    this.createLines()
    this.createObstacle()
  }

  init() {
    this.start()
    return this
  }
}
const carGameElem = document.querySelector('.car-game')
new CarGame(carGameElem).init()
