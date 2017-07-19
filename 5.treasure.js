// 5) Give one treasure to your crew and keep the rest for yourself!
// TIP: call `treasure.giveToCrew()`, or nothing to keep it!
// TIP: You can use `Array.reduce()` to reduce an array to a single item! Like
//      finding the smallest one.
+(function() {
  const {crew, capin} = require('./.arrg')
  const [GM, F, FL, C] = ['GENERATE MAP','FIND','FIND LAST','COMPLETE']
  var treasures = [], maps = []
  const resFn = action => result => {
    if (action === F) {
      treasures.push(result)
    } else if (action === FL) {
      treasures.push(result)
      largestTreasure = treasures.reduce((a, b) => (a.size > b.size ? a : b))
      let [res, rej] = [resFn(C), rejFn(C)]
      largestTreasure.giveToCrew().then(res).catch(rej)
    } else if (action === C) {
      console.log(result)
    } else {
      maps.push(result)
      const mapAmt = maps.length
      if (mapAmt < 3) { genMap() } else if (mapAmt === 3) {findTreasures()}
    }
  }
  const rejFn = action => msg => {console.warn(action, msg)}
  const genMap = () => {
    let [res, rej] = [resFn(GM), rejFn(GM)]
    const genMapPR = capin.generateTreasureMap
    genMapPR().then(res).catch(rej)
  }
  const findTreasures = () => {
    var findTreasurePR
    maps.forEach((map, index) => {
      let promiseFn = crew.findTreasure.bind(this, map)
      if (maps.length-1 === index) {
        var [res, rej] = [resFn(FL), rejFn(FL)]
      } else { var [res, rej] = [resFn(F), rejFn(F)] }
      findTreasurePR = promiseFn().then(res).catch(rej)
    })
  }
  genMap()
})()
