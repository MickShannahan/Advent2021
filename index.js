let data = require('./data.json')

let data1 = data.dayOne
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

let data2 = data.dayTwo
// REVIEW Day Two
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

let data3 = data.dayThree
let data3Test = data.dayThreeTest
// FIXME Day Three
function d3p1(data){
  let gama = data[0].split('')
  let epsilon = data[0].split('')
  for(let i = 0; i < gama.length; i++){
    let zero = 0
    let one = 0
    for(let j =0; j< data.length; j++){
      let bit = data[j][i]
      if(parseInt(bit)){
        one++
      } else{
        zero++
      }
    }
    gama[i] = zero > one ? 0 : 1
    epsilon[i] = zero > one ? 1: 0
  }
 gama = parseInt(gama.join(''), 2)
 epsilon = parseInt(epsilon.join(''), 2)
 return gama* epsilon
}

function d3p2(data){
  let oxy = data
  let co2 = data
  for(let i = 0; oxy.length > 1 ; i++){
    let zero = 0
    let one = 0
    for(let j =0; j< oxy.length; j++){
      let bit = oxy[j][i]
      if(parseInt(bit)){
        one++
      } else{
        zero++
      }
    }
    let oxyFilter = one >= zero ? 1 : 0
    zero =0
    one = 0
    for(let j =0; j< co2.length; j++){
      let bit = co2[j][i]
      if(parseInt(bit)){
        one++
      } else{
        zero++
      }
    }
    let co2Filter = zero <= one ? 0 : 1
    oxy = oxy.length > 1 ? oxy.filter(byte => byte[i] == oxyFilter) : oxy
    co2 = co2.length > 1 ? co2.filter(byte => byte[i] == co2Filter) : co2
    console.log('oxy', oxyFilter,i, oxy)
    console.log('co2', co2Filter,i, co2)
  }
  let oxyNum = parseInt(oxy[0],2)
  let co2Num = parseInt(co2[0],2)
  console.log(oxyNum, co2Num)
  return  oxyNum * co2Num
}

// console.log(dayOnePartOne(data1)) 
// NOTE 1316
// console.log(dayOnePartTwo(data1))
// NOTE 1344
// console.log(dayTwoPartOne(data2))
// NOTE 2322630
// console.log(dayTwoPart2(data2))
// NOTE 2105273490
// console.log(d3p1(data3));
// NOTE 3885894
// console.log(d3p2(data3));
// NOTE 4375225