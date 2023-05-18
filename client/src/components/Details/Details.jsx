import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Details.module.css'
import { NavLink } from 'react-router-dom';

//Actions
import { getDetailVideoGame, deleteVideoGame } from '../../redux/actions';

const Details = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detailVideoGame = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetailVideoGame(id))
    }, [dispatch, id]);



    const handleDeleteGame = (event) => {
        event.preventDefault()
        let result = window.confirm('Estas seguro que desea eliminar este juego?');
        if (result === true) {
            window.alert('Juego borrado con éxito');
            dispatch(deleteVideoGame(id));
            navigate('/home');
            window.location.replace('');
        }
    };

    return (
        
        <div className={styles.backgroundImage}>   
            {/* {detailVideoGame.createdInDb === true
                ?
                <div className={styles.containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.image}
                        alt='imagen'
                    />
                    <h4>Released at: {(detailVideoGame?.releaseDate).slice(0, 10)}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <h4>Description:
                        <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    </h4>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>
                        Genres: {detailVideoGame.genres?.map(el => el.name).join(' - ')}
                    </h3> */}
                    {/* <Link to={`/editVideoGame/${detailVideoGame.id}`}>
                        <button>Modify...</button>
                        </Link> */}



                    {/* <button className={styles.deleteGame} onClick={(e) => handleDeleteGame(e)}>Delete game</button>
                </div>
                : */}
                
                <div className={styles.containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>

                    <div className={styles.divImg}>
                    <img
                        src={detailVideoGame?.img}
                        alt='imagen'
                    />
                    </div>

                    <div className={styles.divText}>

                    <h3>Released at:</h3>
                    <h4>{detailVideoGame?.released}</h4>


                    <h3>Rating: </h3>
                    <h4>{detailVideoGame?.rating}</h4>
                    
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>

                    <h3>Platforms: </h3>
                    <h4>{detailVideoGame.platforms?.map(el => el).join(' - ')}</h4>

                    <h3>Genres:</h3> 
                    <h4>{detailVideoGame.genres?.map(el => el).join(' - ')}</h4>
                    </div>

                </div>
                <NavLink to='/home' className={styles.btnNavLink}>
                    <button className={styles.backHome}>
                        Volver
                    </button>
                </NavLink>
        </div>
    )
}


export default Details;