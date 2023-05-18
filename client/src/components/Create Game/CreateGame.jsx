import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createVideoGame } from '../../redux/actions';
import styles from './CreateGame.module.css';
import { NavLink } from 'react-router-dom';
import validation from './validation.js';

const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms =
    ["PC", "PlayStation 5", "Xbox One", "PlayStation 4", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "macOS", "Linux", "Xbox 360", "Xbox", "PlayStation 3", "PlayStation 2", "PlayStation", "PS Vita", "PSP", "Wii U", "Wii", "GameCube", "Nintendo 64", "Game Boy Advance", "Game Boy Color", "Game Boy", "SNES", "NES", "Classic Macintosh", "Apple II", "Commodore / Amiga", "Atari 7800", "Atari 5200", "Atari 2600", "Atari Flashback", "Atari 8-bit", "Atari ST", "Atari Lynx", "Atari XEGS", "Genesis", "SEGA Saturn", "SEGA CD", "SEGA 32X", "SEGA Master System", "Dreamcast", "3DO", "Jaguar", "Game Gear", "Neo Geo"];

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: [],
  });

  const [values, setValues] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: [],
  })

  // Cualquier cambio en los input dispara esta funcion
  const handleChange = (event) => {
    event.preventDefault()
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setErrors(
      validation({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  };

  // Funcion Submit, ejecuta al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.image === null || values.image === '') {
      values.image = 'https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg';
    };
    if (
      !values.name ||
      !values.description ||
      !values.rating ||
      !values.released ||
      !values.platforms ||
      !values.genres
    ) {
      alert("Fill all fields");
    }
    else {
      // Ejecuto la action y reestablezco los valores del estado
      dispatch(createVideoGame(values));
      alert('Videogame Created');
      setValues({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: [],
      });
    }
  };

  const handleChangePlatform = (event) => {
    if (values.platforms.includes(event.target.value)) {
      alert('This platform has already been selected. Please choose another');
    } else {
      setValues(
        (state) => ({
          ...state,
          platforms: [...state.platforms, event.target.value],
        })
      )
    }
  };

  const handleDeletePlatform = (event, plat) => {
    event.preventDefault();
    setValues({
      ...values,
      platforms: values.platforms.filter((element) => element !== plat)
    })
  };

  const handleChangeGenre = (event) => {
    if (values.genres.includes(event.target.value)) {
      alert('This genre has already been selected.Please choose another');
    } else {
      setValues(
        (state) => ({
          ...state,
          genres: [...state.genres, event.target.value],
        })
      )
    }
  };

  const handleDeleteGenre = (event, gen) => {
    event.preventDefault();
    setValues((prev) => ({
      ...prev,
      genres:
        prev.genres.filter((element) => element !== gen)
    }))
  }
  ;

  return (

    <div className={styles.backgroundImage}>

        <h2>Create VideoGame</h2>

      <div className={styles.container} >
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>


          {/* NAME */}
          <div>
            <h5>Name of the VideoGame:</h5>
            <input
              className={errors.name && 'danger'}
              type='text'
              placeholder='Name...'
              name='name' // nombre del input
              value={values.name} // valor dinámico del input que se actualiza mientras se escribe dentro del mismo
              onChange={(event) => handleChange(event)} // onChange se dispara cada vez que hay un cambio en el input
            />
            {errors.name && (<p className={errors.name && 'danger'}>{errors.name}</p> )}
          </div>


          {/* IMAGE */}
          <div>
            <h5>Put the cover of the game:</h5>
            <input
              type='text'
              placeholder='Image Url...'
              name='image'
              value={values.image}
              onChange={(event) => handleChange(event)}
            />
          </div>


          {/* DESCRIPTION */}
          <div>
            <h5>Game description:</h5>
            <input
              className={errors.description && 'danger'}
              type='text'
              placeholder='Description...'
              name='description'
              maxLength='100'
              value={values.description}
              onChange={(event) => handleChange(event)}
            />
            {errors.description && (<p className={errors.description && 'danger'}>
              {errors.description}
            </p> )}
          </div>


          {/* RELEASED */}
          <div>
            <h5>Release date:</h5>
            <input
              type='date'
              placeholder='Date...'
              name="released"
              value={values.released}
              onChange={(event) => handleChange(event)}
            />
            {errors.released && (<p className={errors.released && 'danger'}>
              {errors.released}
              </p> )}
          </div>


          {/* RATING */}
          <div>
            <h5>Raiting:</h5>
            <input
              className={errors.rating && 'danger'}
              type="number"
              placeholder="Rating..."
              value={values.rating}
              name="rating"
              step={0.5}
              max={5.0}
              min={0.0}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            {errors.rating && (<p className={errors.rating && 'danger'}>
            {errors.rating}
            </p> )}
          </div>


          {/* PLATFORMS */}
          <div>
            <label>
              <h5>Choose a platform:</h5>
              <select
                className={errors.platforms && 'danger'}
                name='Platforms'
                onChange={(event) => handleChangePlatform(event)}
                defaultValue={'default'}
              >
                {<option value="default" disabled>Platforms...</option>}
                {platforms.map((element, i) => {
                  return (
                    <option key={i} value={element}>
                      {element}
                    </option>
                  )
                })}
              </select>
            </label>


            {/* PLATFORMS LIST */}
            <ul>
              {values.platforms.length ? values.platforms.map((element, i) => (
                <div key={i}>
                  <li>
                    {element}
                    <button className={styles.deleteBtn} onClick={(event) => { handleDeletePlatform(event, element) }}>X</button>
                  </li>
                </div>
              ))
                : errors.platforms && (
                  <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                )
              }
            </ul>
          </div>


          {/* GENRES */}
          <div>
            <label>
              <h5 className={errors.genres && 'danger'}>Choose a genre:</h5>
              <select onChange={(event) => handleChangeGenre(event)}
                name='Genres'
                defaultValue={'default'}
              >
                <option value="default" disabled>Genres...</option>
                {genres?.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  )
                })
                }
              </select>
            </label>


            {/* GENRES LIST */}
            <ul className='lista'>
              {values.genres.length ? values.genres.map((element, i) => (
                <div key={i}>
                  <li>
                    {element}
                    <button className={styles.deleteBtn} onClick={(event) => { handleDeleteGenre(event, element) }}>X</button>
                  </li>
                </div>)
              ) :
                errors.platforms && (
                  <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                )
              }
            </ul>
            
          </div>
          <button className={styles.createGameBtn} type='submit'>Create Videogame</button>
        </form>
      </div>

          <NavLink to='/home'>
            <button className={styles.btnHome}>Volver</button>
          </NavLink>
    </div>
  )
};

export default CreateGame;
