const spriteContainer = document.querySelector('.sprite-container')
const sprite = document.querySelector('.sprite')
const spriteFrames = 15
const spriteFrameHeight = 203
const spriteActionsOrder = { idle: 1, walk: 2, run: 3, jump: 4, die: 5 }

const fpsIndicator = document.querySelector('.fps-indicator')
const fpsSlider = document.querySelector('.fps-slider')
let fps = 30

const controlButtonUp = document.querySelector('.controls .button.up')
const controlButtonLeft = document.querySelector('.controls .button.left')
const controlButtonRight = document.querySelector('.controls .button.right')
const controlButtonDie = document.querySelector('.controls .button.die')
const controlButtonRun = document.querySelector('.controls .button.run')
const controlButtonOverflow = document.querySelector('.controls .button.overflow')

let actionInterval = null;

const doAction = (action) => {
  const spriteActionYOffset = ((spriteActionsOrder[action] - 1) * spriteFrameHeight)
  let currentFrame = 1

  sprite.style.transform = "translate(0, -" + spriteActionYOffset + "px)"

  if (actionInterval) {
    clearInterval(actionInterval)
  }

  actionInterval = setInterval(() => {
    if (currentFrame === spriteFrames) {
      clearInterval(actionInterval)
      doAction('idle')
    } else {
      sprite.style.transform = "translate(-" + (currentFrame * 221) + "px, -" + spriteActionYOffset + "px)"
      currentFrame += 1
    }
  }, 1000 / Number(fps))
}

const toggleKeyHighlighting = (key) => {
  let keyElement = null

  if (key === 'ArrowUp') {
    keyElement = document.querySelector('.button.up')
  } else if (key === 'ArrowLeft') {
    keyElement = document.querySelector('.button.left')
  } else if (key === 'ArrowDown') {
    keyElement = document.querySelector('.button.down')
  } else if (key === 'ArrowRight') {
    keyElement = document.querySelector('.button.right')
  }

  if (keyElement && !keyElement.classList.contains('disabled')) {
    keyElement.classList.toggle('active', !keyElement.classList.contains('active'))
  }
}

document.addEventListener('keydown', (e) => {
  toggleKeyHighlighting(e.key)

  if (e.key === 'ArrowUp') {
    doAction('jump')
  } else if (e.key === 'ArrowLeft') {
    spriteContainer.classList.add('mirrored')
    doAction('walk')
  } else if (e.key === 'ArrowRight') {
    spriteContainer.classList.remove('mirrored')
    doAction('walk')
  }
});

document.addEventListener('keyup', (e) => {
  toggleKeyHighlighting(e.key)
});

controlButtonUp.addEventListener('click', () => doAction('jump'))
controlButtonLeft.addEventListener('click', () => { spriteContainer.classList.add('mirrored'); doAction('walk') })
controlButtonRight.addEventListener('click', () => { spriteContainer.classList.remove('mirrored'); doAction('walk') })
controlButtonRun.addEventListener('click', () => doAction('run'))
controlButtonDie.addEventListener('click', () => doAction('die'))

controlButtonOverflow.addEventListener('click', () => {
  spriteContainer.classList.toggle('overflow-active')
})

fpsSlider.addEventListener('input', (e) => fpsIndicator.textContent = e.target.value)

fpsSlider.addEventListener('change', (e) => {
  let newFps = e.target.value

  if (newFps < 1) {
    fps = 1
  } else if (newFps > 30) {
    fps = 30
  } else {
    fps = newFps
  }

  doAction('idle')
})

const init = () => {
  doAction('idle')
}

init()
