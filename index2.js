const data = require('./data.json')






// STUB Day 8
let data8 = data.day8Data
let data8Test = data.day8Test

function d8p1(data){
  let out = 0
  let answers = [2,4,3, 7]
  for (let i = 0; i < data.length; i++) {
    const signal = data[i]
    for (let j = 0; j < signal.output.length; j++) {
      const code = signal.output[j];
      if(answers.includes(code.length)){
        out++
      }
    }
    
  }
  return out
}

function d8p2(data){
  let out = 0
  let uniques = [2,3,4, 7]
  for (let i = 0; i < data.length; i++) {
    let wires = {a: 0, b:0, c:0, d:0, e:0, f:0, g:0} 
    let clock = { bottom: '', middle: '', upLeft: '', downLeft: '', upRight: '', downRight: '', top: ''}
    let clockKey = {top: 8, bottom: 7, middle: 7, upLeft: 6, downLeft: 4, upRight: 8, downRight: 9}
    let found =[]
    const signal = data[i]
    // find positions
    for (let j = 0; j < signal.sequence.length; j++) {
      const code = signal.sequence[j];
      code.split('').forEach(l=> wires[l]++)
    }
    console.log(wires);
    // Decode
    for (let j = 0; j < uniques.length; j++) {
      const decode = signal.sequence.find(d => d.length == uniques[j])
      console.log('decode', decode);
      switch(decode.length){
        case 2:
          // one
          let w1 = decode.split('')[0]
          let w2 = decode.split('')[1]
          clock.upRight = wires[w1] == clockKey.upRight? w1: w2
          clock.downRight = wires[w1] == clockKey.downRight? w1: w2
          found = [...found,w1,w2]
          console.log('found one', clock.upRight, clock.downRight);
          break;
        case 3:
          // seven
          let w = decode.split('').find(char => !found.includes(char))
          clock.top = w
          found.push(w)
          console.log('found top', w);
          break;
        case 4:
          // four
          let w3 = decode.split('').find(char => !found.includes(char))
          found.push(w3)
          let w4 = decode.split('').find(char => !found.includes(char))
          found.push(w4)
          clock.middle = wires[w3] == clockKey.middle ? w3 : w4
          clock.upLeft = clock.middle == w3 ? w4: w3
          console.log('found middle:upLeft', clock.middle, clock.upLeft);
          break;
        case 7:
          // eight
          let w5 = decode.split('').find(char => !found.includes(char))
          found.push(w5)
          let w6 = decode.split('').find(char => !found.includes(char))
          found.push(w6)
          clock.bottom = wires[w5] == clockKey.bottom ? w5 : w6
          clock.downLeft = wires[w5] == clockKey.downLeft ? w5 : w6
          console.log('found bottom:downLeft', clock.bottom, clock.downLeft);
          break;
      }
    }
    console.log(clock);
    let conversion = {
      0: [clock.top, clock.upLeft, clock.upRight, clock.downLeft, clock.downRight, clock.bottom].sort().join(''),
      1: [clock.upRight, clock.downRight].sort().join(''),
      2: [clock.top, clock.upRight, clock.middle, clock.downLeft, clock.bottom].sort().join(''),
      3: [clock.top, clock.upRight, clock.middle, clock.downRight, clock.bottom].sort().join(''),
      4: [clock.upLeft, clock.middle, clock.upRight, clock.downRight].sort().join(''),
      5: [clock.top, clock.upLeft, clock.middle, clock.downRight, clock.bottom].sort().join(''),
      6: [clock.top,clock.upLeft, clock.downLeft, clock.bottom, clock.downRight, clock.middle].sort().join(''),
      7: [clock.top, clock.upRight, clock.downRight].sort().join(''),
      8: [clock.top, clock.upRight, clock.upLeft, clock.middle, clock.downRight, clock.downLeft, clock.bottom].sort().join(''),
      9: [clock.top, clock.upRight, clock.upLeft, clock.middle, clock.downRight, clock.bottom].sort().join('')
    }

    let code = ''
    signal.output = signal.output.map(o => o.split('').sort().join(''))
    console.log('conversion',conversion, signal.output);
    signal.output.forEach(o => {
      code += Object.keys(conversion).find(k => conversion[k] == o)
    })
    console.log('code',code);
    out += parseInt(code)
  }
  return out
}

// console.log(d8p1(data8))
// 470
// console.log(d8p2(data8))








// STUB Day9
let data9 = data.day9Data
let data9Test = data.day9Test

function d9p1(data){
let lows = 0
for(let y = 0; y < data.length; y++){
  let row = data[y]
  for(let x = 0; x < row.length; x++){
    let spot = row[x]
    // check surroundings
    let higher = { }
    higher.left = row[x-1] !== undefined ? row[x-1] > row[x]? 1: 0 : -1
    higher.right = row[x+1]  !== undefined? row[x+1] > row[x]? 1: 0 : -1
    higher.up = data[y-1] !== undefined ? data[y-1][x] > row[x]? 1: 0 : -1
    higher.down = data[y+1] !== undefined? data[y+1][x] > row[x]? 1: 0 : -1
    let isLow = 0
    let surround = 0
    for(let pos in higher){
     isLow += higher[pos] == 1 ? 1: 0
     surround += higher[pos] >= 0 ? 1: 0
    }
    // console.log('checking', spot, higher, surround);
    if(isLow >= surround){
      lows += spot + 1
      console.log('Low Spot:', spot, x+'-'+y);
    }
  }
}
return lows
}

function d9p2(data){
  console.log(data.join('\n'));
  let basins = {}
  for(let y = 0; y < data.length; y++){
    let row = data[y]
    for(let x = 0; x < row.length; x++){
      let spot = row[x]
      // check for low origin
      let higher = { }
      higher.left = row[x-1] !== undefined ? row[x-1] > row[x]? 1: 0 : -1
      higher.right = row[x+1]  !== undefined? row[x+1] > row[x]? 1: 0 : -1
      higher.up = data[y-1] !== undefined ? data[y-1][x] > row[x]? 1: 0 : -1
      higher.down = data[y+1] !== undefined? data[y+1][x] > row[x]? 1: 0 : -1
      let isLow = 0
      let surround = 0
      for(let pos in higher){
       isLow += higher[pos] == 1 ? 1: 0
       surround += higher[pos] >= 0 ? 1: 0
      }
      // console.log('checking', spot, higher, surround);
      if(isLow >= surround){
        console.log('Low Spot:', spot, x+'-'+y);
        let checked = []
        basins[x+':'+y]=1
        basins[x+':'+y] = calculateBasin(data, x, y)
        console.log('basin size', basins[x+':'+y])
        console.log(data.join('\n'));
      }
    }
  }
  console.log(data.join('\n'));
  let arr = []
  for(let b in basins){
    const basinSize = basins[b]
    arr.push(basinSize)
  }
  arr.sort((a,b)=> b-a)
  console.log(arr);
  return arr[0]* arr[1] * arr[2]
}

function calculateBasin(map, x, y){
  console.log('checking', x,'-',y);
  let size = 0
  if(map[y] == undefined ) return size
  let spot = map[y][x]
  if(spot == 9 || spot == undefined || spot == '#'){
    return size
  } else {
    map[y][x] = '#'
    size++
    size += calculateBasin(map,  x+1, y)
    size += calculateBasin(map,  x-1, y)
    size += calculateBasin(map,  x, y+1)
    size += calculateBasin(map,  x, y-1)
  }
  return size
}



// console.log(d9p1(data9))
// 522
console.log(d9p2(data9))