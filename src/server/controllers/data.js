const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '../db/data.json');

module.exports = (req, res) => {
  const dataStr = fs.readFileSync(DATA_PATH);
  let dataJson = null;

  try {
    dataJson = JSON.parse(dataStr);

    res.set('Access-Control-Allow-Origin', '*');

    setTimeout(() => res.json(dataJson), 1000);
  } catch (err) {
    console.error(`Данные по адресу "${DATA_PATH}" повреждены`, err);

    throw new Error();
  }
};
