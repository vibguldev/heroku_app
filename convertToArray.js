const json2csv = require('json2csv')
const converter = (obj) => {
    let jsonData = []
    Object.keys(obj).forEach((element) => jsonData.push(obj[element]))
    return jsonData
}

function convert2Csv(firebaseData) {
    const fields = ['username', 'company', 'answer1', 'answer2', 'answer3', 'comments']
    let jsonData = converter(firebaseData)
    return json2csv({ data: jsonData, fields: fields })
}

module.exports = convert2Csv