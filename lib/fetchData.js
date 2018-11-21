const axios = require('axios');

const fetchData = () => new Promise(async (resolve, reject) => {
  try {
    const { data } = await axios.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs');
    resolve(data.hits);
  } catch (error) {
    console.log('Error fetching data:', error);
    reject(error);
  }
});

module.exports = fetchData;
