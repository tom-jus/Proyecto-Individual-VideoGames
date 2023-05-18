import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';


const LandingPage = () => {
    
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.h1Font}>Welcome to Videogames.</h1>
                <br />
                <br />
                <Link to='/home'>
                    <button className={styles.btn}>Start</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;
