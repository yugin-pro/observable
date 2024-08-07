export default class Metrics extends Map {
  constructor(database, options = {}) {
    super()
    this.database = database
  }
  async exe(metric, value = 'value') {
    let context = this
    let m =  this.get(metric)
    let aaa = 'sdf'
    let exeList = m.match(/(exe\(\w*\))/gm)
    
    if (typeof m == "string" && exeList && exeList.length) {
      for await (let element of exeList) {
        let value = await context.exe(element.match(/\((\w+)\)/)[1]) 
        m = m.replace(element,value)
      }  
      return eval(m)
    }
    
    if (m instanceof Map) {
        let [result] = await this.database.query(m.get('query')) 
        return result[m.get('value')]
    }
    
    let [result] = await this.database.query(m) 
    return result[value]
  }
}
