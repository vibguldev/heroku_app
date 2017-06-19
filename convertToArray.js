const json2csv = require('json2csv')
const converter = (obj) => {
    let jsonData = []
    Object.keys(obj).forEach((element) => jsonData.push(obj[element]))
    return jsonData
}

function convert2Csv(firebaseData) {
    const fields = ['username', 'company', 'What is the company\'s business model', 'What truly inspired you in this session', 'What ideas can we take back and apply at Unilever']
    let jsonData = converter(firebaseData)
    return json2csv({ data: jsonData, fields: fields })
}

module.exports = convert2Csv