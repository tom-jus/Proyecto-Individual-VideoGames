const axios = require('axios')
require('dotenv').config();
const { Genre } = require('../db.js')
const { API_KEY } = process.env;

const getGenres = async () => {
  const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  try {
    let genres = response.data.results.map((element) => element.name);
    genres.forEach((element) => {
      Genre.findOrCreate({
        where: {
          name: element,
        },
      });
    })
    return genres;

  } catch (error) {
    throw new Error({
      error: 'No se encontraron géneros'
    });
  };
};

module.exports = { getGenres };
