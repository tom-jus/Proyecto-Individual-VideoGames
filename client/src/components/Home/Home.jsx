import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import Loading from "../Loading/Loading.jsx";
import styles from './Home.module.css';

import {
    getAllVideoGames,
    getGenres,
    filterByGenres,
    getVideogameByName,
    getVideoGamesByOrigin,
    orderAlphabetically,
    orderByRating,
    deleteStates,
} from '../../redux/actions.js';

import Paged from "../Paged/Paged.jsx";

const Home = () => {

    // PAGED
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);

    // Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);

    // Division del array por cantidad de páginas
    const indexOfLastVideoGame = currentPage * videoGamesPP; // 1 * 15
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; // 15 - 15 = 0
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        dispatch(getGenres())
        let videoGame = allVideogames && allVideogames;
        if (videoGame.length === 0) {
            dispatch(getAllVideoGames())
        }
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }, [allVideogames, indexOfFirstVideoGame, indexOfLastVideoGame, dispatch]);

    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };
    
    const [isHiden, setIsHiden] = useState(false);
    const [search, setSearch] = useState({ // Input de busqueda
        name: '',
    });

    const handleOrderAlphabetically = (event) => {
        event.preventDefault();
        dispatch(orderAlphabetically(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        );
    };

    const handleOrderRating = (event) => {
        event.preventDefault();
        dispatch(orderByRating(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        );
    };

    const handleFilterGenres = (event) => {
        event.preventDefault();
        dispatch(filterByGenres(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        );
    };

    const handleGetVideoGamesByOrigin = (event) => {
        event.preventDefault();
        dispatch(getVideoGamesByOrigin(event.target.value));
        setCurrentPage(1);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
        dispatch(getVideogameByName(search.name));
        setCurrentPage(1);
    };

    const handleSearch = (event) => { //se ejecuta cuando clickeo boton 'go!'
        event.preventDefault();
        dispatch(getVideogameByName(search.name));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        dispatch(deleteStates());
    };

    return (
        <>
            <div className={styles.backgroundImage}>
                <nav className={styles.searchBar}>

                    <NavLink to="/createGame">
                        <button className={styles.createGame}>Create VideoGame</button>
                    </NavLink>
                        <button className={styles.refresh} onClick={(event) => handleClearFilters(event)}>
                            Reset
                        </button>

                <div className={styles.divSelect}>
                    <select className={styles.select} onChange={(event) => 
                        { handleOrderAlphabetically(event) }}>
                        <option>Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select className={styles.select} onChange={(event) => handleOrderRating(event)}>
                        <option>Rating</option>
                        <option value="max">More Popular</option>
                        <option value="min">Less popular</option>
                    </select>

                    <select className={styles.select} onChange={(event) => handleFilterGenres(event)} defaultValue={'default'}>
                        <option value="default" disabled>Genres</option>
                        {genres?.map((element, i) => {
                            return (
                                <option key={i} value={element}>
                                    {element}
                                </option>
                            )
                        })}
                    </select>

                    <select className={styles.select} onChange={(event) => 
                        { handleGetVideoGamesByOrigin(event) }}>
                        <option value='default' disabled>Filter</option>
                        <option value="All">All Games</option>
                        <option value="Created">My Games</option>
                        <option value="From Api">Api Games</option>
                    </select>
                    </div>


                <div className={styles.search}>
                    <input className={styles.searchGame}
                        autoComplete="off"
                        type="text"
                        placeholder="Search Videgame..."
                        name='name'
                        value={search.name}
                        onChange={(event) => handleChange(event)}
                    />
                    <button className={styles.searchBtn} onClick={(event) => handleSearch(event)}>
                        Search
                    </button>
                </div>
                </nav>

                <div>
                    <div className={styles.containerCard}>
                        {current.length > 0 ? current.map(element => {
                            return (
                                <NavLink key={element.id} to={`/videogame/${element.id}`}>
                                    <Card
                                        name={element.name}
                                        img={element.createdInDb ? element.image : element.img}
                                        genres={element.createdInDb ?
                                            element.genres.map((element) => element.name).join(' ') :
                                            element.genres.join(' - ')
                                        }
                                    />
                                </NavLink>
                            )
                        }) :
                            <div className={styles.containerLoading}>
                                <Loading />
                            </div>
                        }
                    </div>
                </div>
                <Paged
                    videoGamesPP={videoGamesPP}
                    allVideoGames={allVideogames.length}
                    paged={paged}
                />
            </div>
        </>
    )
}

export default Home;