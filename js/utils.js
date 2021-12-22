/* eslint-disable no-unused-vars */

// utils
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

const mapStyle = (element, style) => {
  const elem = element
  const styleKeys = Object.keys(style)
  styleKeys.forEach((key) => {
    elem.style[key] = style[key]
  })
}
