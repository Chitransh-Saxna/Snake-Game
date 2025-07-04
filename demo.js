let demo = { x: 0, y: 0 }
let a = 2;
let b = 16;
demo = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
console.log(demo);