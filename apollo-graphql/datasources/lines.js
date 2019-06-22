const {RESTDataSource} = require('apollo-datasource-rest')


class LinesApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL ='https://api.tfl.gov.uk/'
  }

  async getLines(line) {
    const lines = await this.get(`Line/${line}`)
    return lines;
  }
}


module.exports.LinesApi = LinesApi;