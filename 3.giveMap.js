// 3) Try giving your crew a treasure map! They'll find the treasure for you!
// TIP: call `crew.findTreasure(treasureMap)`
// TIP: be sure to `catch()` things just in case something breaks!
// TIP: If you `console.log()` a treasure you can see it's size!
+(function() {
  const {crew, capin} = require('./.arrg')
  const [GM, F, FL, C] = ['GENERATE MAP','FIND','FIND LAST','COMPLETE']
  var treasures = [], maps = []
  const resFn = action => result => {
    if (action === F) {
      treasures.push(result)
    } else if (action === FL) {
      treasures.push(result)
      //console.log(result)
    } else {
      maps.push(result)
      const mapAmt = maps.length
      if (mapAmt < 3) { genMap() } else if (mapAmt === 3) {findTreasures()}
    }
  }
  const rejFn = action => msg => {
    console.warn(action, msg)
  }
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
