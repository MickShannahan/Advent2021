let data = require('./data.json')
let data1 = data.dayOne
let data2 = data.dayTwo

// SECTION Day one
function dayOnePartOne(data){
  let last = parseInt(data[0])
  let out = 0
  data.forEach( d =>{
    if (parseInt(d) > last){
      out++
    }
    last = parseInt(d)
  })
  return out
}

function dayOnePartTwo(data){
  let nums = data.map(d => parseInt(d))
  let last3 = nums[0]+ nums[1]+ nums[3]
  let out = 0
  nums.forEach( (n,i) =>{
    let a = n
    let b = nums[i+1]
    let c = nums[i+2]
    let sum = a + b + c
    if ( sum>last3){
      out++
    }
    last3 = sum
  })
  return out
}

// NOTE Day Two
function dayTwoPartOne(data){
  let x = 0
  let y = 0
  data.forEach(d => {
    let dir = d.split(' ')[0]
    let speed = parseInt(d.split(' ')[1])
    switch(dir){
      case 'forward':
        x+= speed
        break
      case 'up':
        y-= speed
        break
      case 'down':
        y+= speed
    }
  })
  return x*y
}

function dayTwoPart2(data){
  let x = 0
  let depth = 0
  let aim = 0
  data.forEach(d => {
    let dir = d.split(' ')[0]
    let speed = parseInt(d.split(' ')[1])
    switch(dir){
      case 'forward':
        x+= speed
        depth += speed*aim
        break
      case 'up':
        aim-= speed
        break
      case 'down':
        aim+= speed
    }
  })
  return x*depth
}


// console.log(dayOnePartOne(data1))
// console.log(dayOnePartTwo(data1))
// console.log(dayTwoPartOne(data2))
// console.log(dayTwoPart2(data2))