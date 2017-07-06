export default class Protocol {
  constructor (params = {}) {
    this._scheme = ''      
    this._href = ''
    this._protocol = ''
    this._link = ''
    this._params = params
  }  

  get protocol () {
    let query = Protocol.buildQuery(this._params)
    this._protocol = `${this._scheme}?${query}` 
    return this._protocol
  }

  get link () {
    let query = Protocol.buildQuery(this._params)
    this._link = `${this._href}?${query}`
    return this._link
  }
  
  static buildQuery (params) {
    let query = []
    for (let param of Object.keys(params)) {
      query.push(`${param}=${params[param]}`)  
    }
    return query.join('&')
  }
}
