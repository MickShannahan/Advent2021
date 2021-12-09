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

// STUB Day four
let data4Calls = data.dayFourCalls
let data4Boards = data.dayForBoards
let data4PlayableBoards = data.dayFourPlayablBoards
let data4TestBoards = data.dayFourTestBoards
let data4TestCalls = data.dayFourTestCalls

function d4p1(calls, rawBoards){
  let boards = rawBoards.map(b =>b.map( r => r.split(/  | /).filter(n => n != '')))
  let playedBoards = []
  for( let c = 0; c < calls.length; c++){
    let called = calls[c]
    console.log(called)
    for(let b=0; b < boards.length; b++){
     let board = boards[b]
     board = stampBoard(called,board)
     if(checkForBingo(board)){
       console.log('BINGO', board);
       let sum = 0
       board.forEach(row=> {
         row.forEach(cell => {if(cell != '#') sum += parseInt(cell)})
       })
       return sum * called
     }
    }
  }
}

function d4p2(calls, rawBoards){
  let boards = rawBoards.map(b =>b.map( r => r.split(/  | /).filter(n => n != '')))
  let lastBoard = []
  let lastCalled = 0
  for( let c = 0; c < calls.length; c++){
    let called = calls[c]
    console.log('------', called);
    for(let b=0; b < boards.length; b++){
     let board = boards[b]
     board = stampBoard(called,board)
     console.log(board);
     if(checkForBingo(board)){
       console.log('BINGO','called',called, board);
       lastBoard = board
       lastCalled = called
       boards[b] = []
     }
    }
  }
  console.log('last bingo',lastCalled,lastBoard);
  let sum = 0
   lastBoard.forEach(row=> {
    row.forEach(cell => {if(cell != '#') sum += parseInt(cell)})
  })
  return sum * lastCalled
}


function stampBoard(number,board){
  board.forEach(row => {
    row.forEach((cell, i) =>{
      if (number == cell) row[i] = '#'
    })
  })
  return board
}

function checkForBingo(board){
  for(let i =0; i < board.length; i++){
    let row = board[i]
    if(row.join('') == '#####'){
      return true
    }
    let col = board[0][i] + board[1][i] + board[2][i] + board[3][i] + board[4][i]
    console.log('column check', col);
    if(col == '#####'){
      return true
    }
  }
  return false
}

// STUB Day Five
const day5Data = data.dayFiveData
const day5TestData = data.dayFiveTestData

function d5p1(data){
  let plot = [[]]
  for(let i =0; i < data.length; i++){
    let from = data[i][0]
    let to = data[i][1]
    if(from.x != to.x && from.y != to.y) continue;
    let dir = from.x == to.x ? 'y' : 'x'
    let line = to[dir] - from[dir]
    let start = line < 0 ? to[dir] : from[dir]
    let end = line < 0 ? from[dir] : to[dir]
    // console.log(from, to , dir, line, start, end);
    for(let p = start; p <= end; p++){
      let x = dir == 'x' ? p : from.x
      let y = dir == 'y' ? p : from.y
      plot[x] = plot[x] ? plot[x] : []
      plot[x][y] = plot[x][y] ? plot[x][y] +1 : 1 
      // console.log(x,y,p);
    }
  }
  plot = plot.map( row => Array.from(row, elm => elm || '.'))
  let map = plot.map(row => row.join('')).join('\n')
  console.log(map);
  let twos = 0
  plot.forEach(row => {
    row.forEach(point => {
      if(point >= 2){
        twos++
      }
    })
  })
  return twos
}

function d5p2(data){
  let plot = [[]]
  let map = ''
  for(let i =0; i < data.length; i++){
    let from = data[i][0]
    let to = data[i][1]
    let x = from.x
    let y = from.y
    let xDir = from.x > to.x ? -1 : 1
    let yDir = from.y > to.y ? -1 : 1
    let xEnd = to.x
    let yEnd = to.y
    let dir = Math.abs(to.x - from.x) > Math.abs(to.y - from.y) ? 'x' : 'y'
    let start = from[dir] < to[dir] ? from[dir]: to[dir]
    let end = from[dir] == start ? to[dir] : from[dir]
    // console.log(from, to , dir, x+ '-'+xEnd, y+'-'+yEnd , start, '=>', end);
    for(let p = start; p <= end; p++){
      plot[x] = plot[x] ? plot[x] : []
      plot[x][y] = plot[x][y] ? plot[x][y] +1 : 1 
      // console.log(plot[x],plot[x][y], x,y);
      if( xDir > 0){
        x = x < xEnd ? x +1 : x
      } else {
        x = x > xEnd ? x-1 : x
      }
      if( yDir > 0){
        y = y < yEnd ? y +1 : y
      } else {
        y = y > yEnd ? y-1 : y
      }
      // plot = plot.map( row => Array.from(row, elm => elm || 0))
      // map = plot.map(row => row.join('')).join('\n')
      // console.log(map);
      // console.log('...............');
    }
  }
  // console.log(map);
  let twos = 0
  plot.forEach(row => {
    row.forEach(point => {
      if(point >= 2){
        twos++
      }
    })
  })
  return twos
}

// STUB Day Six
const data6 = data.daySixData
const data6Test = data.day6Test

function d6p1(data){
  for(let day = 1; day <= 80; day++){
    // console.log('colony', data);
    let spawn =0
    for(let i=0; i< data.length; i++){
      data[i]--
      if(data[i] < 0){
        // console.log('fish Spawned',data.length);
        data.push(9)
        data[i] = 6
      }
    }
  }
  return data.length
}

function d6p2(data){
  let days = [0,0,0,0,0,0,0,0,0]
  data.forEach(fish => days[fish]++)
  console.log(days.join('-'));
  for(let day = 1; day <= 256; day++){
   let spawn =  days.shift()
   days[8] = spawn
   days[6] += spawn
  }
  return days.reduce((cur, acc)=> cur += acc)
}

// STUB Day Seven
let data7 = data.day7Data
let data7Test = data.day7Test

function d7p1(data){
  let positions={}
  let mostKey = '0'
  let mostVal = 0
  let fuel = {}
  // determine positions
  for(let i =0; i< data.length; i++){
    let pos = data[i]
    positions[pos] = positions[pos] ? positions[pos]+ 1 : 1
    if(positions[pos]> mostVal){
      mostVal = positions[pos]
      mostKey = pos
    }
  }
  console.log(positions, mostKey + ':'+ mostVal);
  // itterate over fuel expendatures to find smallest
  for(let p in positions){
    // console.log(p+ '--------------');
    for(let i =0; i< data.length; i++){
      let pos = data[i]
      // console.log('pos: '+ pos);
      fuel[p] = fuel[p]? fuel[p] += Math.abs(pos - parseInt(p)) : Math.abs(pos - parseInt(p))
    }
  }
  let least = Math.max(data)
  Object.keys(fuel).forEach(f => {
    least = least< fuel[f] ? least : fuel[f]
  })
  console.log(fuel, least);
}


function d7p2(data){
  let fuel = {}
  let maxPos = Math.max(...data)
  let minPos =Math.min(...data)
  console.log(maxPos, minPos)
  // itterate over fuel expendatures to find smallest
  for(let pos = minPos; pos <= maxPos; pos++){
    // console.log(pos+ '--------------');
    for(let i =0; i< data.length; i++){
     let crab = data[i]
     let end = Math.abs(crab - pos)
    //  console.log('moving crab',pos, crab, end);
     for(let fuelCost = 1; fuelCost <= end; fuelCost++){
       fuel[pos] = fuel[pos] ? fuel[pos]+ fuelCost : fuelCost
     }
    }
    // console.log('fuel cost', fuel[pos]);
  }
  let least = Math.max(data)
  Object.keys(fuel).forEach(f => {
    least = least< fuel[f] ? least : fuel[f]
  })
  console.log(fuel, least);
  return least
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

// console.log(d4p1(data4Calls, data4PlayableBoards))
// NOTE 16674
// console.log(d4p2(data4Calls, data4PlayableBoards))
// NOTE 7075

// console.log(d5p1(day5Data))
// console.log(d5p2(day5Data))
// NOTE 18065

// console.log(d6p1(data6))
// NOTE 362346
// console.log(d6p2(data6))
// NOTE 1639643057051

// console.log(d7p1(data7))
// 336120
console.log(d7p2(data7))