const axios = require('axios')
require('dotenv').config();
const { Videogame, Genre } = require('../db.js')
const { API_KEY } = process.env;

// Traer solo 100 juegos de la API
const getGamesApi = async () => {

  let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

  // Iteramos 5 veces
  let result = [];

  for (let i = 0; i < 5; i++) {
    result = [...result, ...response.data.results];
    response = await axios.get(response.data.next);
  };

  const data = result.map((element) => {
    return {
      id: element.id,
      name: element.name,
      description: element.description,
      relementeased: element.relementeased,
      rating: element.rating,
      img: element.background_image,
      platforms: element.platforms.map((plat) => plat.platform.name),
      genres: element.genres.map((gen) => gen.name)
    };
  });

  return data;
};

const getGamesDb = async () => {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  if (gamesDb.lenght === 0) {
    throw new Error('No se encontraron juegos en la Base de datos');
  };

  return gamesDb;
};

const getAllGames = async () => {

  const apiData = await getGamesApi();
  const dbData = await getGamesDb();
  return [...apiData, ...dbData];
};

const getGameByName = async (name) => {

  let apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);

  const dbGames = await getGamesDb();

  let allGames = [...apiGames.data.results, ...dbGames];

  let gamesNames = allGames.filter((element) =>
    element.name.toLowerCase().includes(name.toLowerCase()));

  // return gamesNames
  const data = gamesNames.map((element) => {
    return {
      id: element.id,
      name: element.name,
      description: element.description,
      relementeased: element.relementeased,
      rating: element.rating,
      img: element.createdInDb ? element.image : element.background_image,
      platforms: element.createdInDb ?
        element.platforms :
        element.platforms.map((plat) => plat.platform.name),
      genres: element.genres.map((gen) => gen.name)
    };
  });

  if (data.length === 0) {
    throw new Error(`No se encontraron datos`)
  };

  return data;
};

const getGameById = async (id) => {

  if (isNaN(id)) {
    let searchID = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
    });
    if (!searchID) {
      throw new Error('No se encontró un juego con el id solicitado');
    };
    return searchID;

  } else {
    const findID = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

    if (!findID) {
      throw new Error('No se encontró un juego con el id solicitado');
    };
    
    return {
      id: findID.data.id,
      name: findID.data.name,
      description: findID.data.description,
      released: findID.data.released,
      rating: findID.data.rating,
      img: findID.data.background_image,
      platforms: findID.data.platforms.map((plat) => plat.platform.name),
      genres: findID.data.genres.map((gen) => gen.name),
    };
  };
};

const createGame = async (game) => {
  try {
    const { genres } = game;

    const newGame = await Videogame.create(game);
    
    genres.map(async (element) => {
      let genreGameDB = await Genre.findOne({
        where: {
          name: element,
        },
      });
      await newGame.addGenre(genreGameDB);
    });

    if (!newGame) {
      throw new Error('No se pudo crear el juego');
    };

    const createGame = await Videogame.findOne({
      where: {
        id: newGame.id,
      },
      include: {
        model: Genre,
        attributes: [],
        through: {
          attributes: [],
        },
      },
    })

    return createGame;

  } catch (error) {
    return error
  }
};

const editGame = async (game, id) => {

  try {
    const { name, description, platforms, genres } = game;
    const editGame = await Videogame.update({
      name: name,
      description: description,
      platforms: platforms,
    },
      {
        where: {
          id: id,
        },
      })
      
    if (!editGame) {
      throw new Error('No se encuentra el juego solicitado')
    };

    const updateGame = await Videogame.findOne({
      where: {
        id: id,
      }
    });

    await genres.forEach(async (element) => {
      let genreFinded = await Genre.findOne({
        where: {
          name: element,
        },
      });
      const gameFinded = await Videogame.findOne({
        where: {
          id: id,
        },
        include: [Genre],
      })
      await gameFinded.setGenres([]);
      await updateGame.addGenre(genreFinded);
    })

    return {
      message: 'Juego modificado con éxito!',
      result: updateGame
    }
  } catch (error) {
    throw new Error('No se pudo modificar el juego')
  };
};

const deleteGame = async (id) => {

  const findGame = await Videogame.findOne({
    where: {
      id: id
    },
  })
  if (!findGame) {
    throw new Error('No se pudo encontrar el juego');
  } else {
    await findGame.destroy()
  };

  return findGame;
};

module.exports = {
  getGamesApi,
  getGamesDb,
  getAllGames,
  getGameByName,
  getGameById,
  createGame,
  editGame,
  deleteGame
};
