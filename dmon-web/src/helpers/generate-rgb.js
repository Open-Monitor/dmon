export default () => {
    const r = ~~(Math.random() * 255)
    const g = ~~(Math.random() * 255)
    const b = ~~(Math.random() * 255)
  
    return `${r}, ${g}, ${b}`
}