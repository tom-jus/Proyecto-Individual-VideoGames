import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {

    const { name, img, genres } = props;

    return (

        <div className={styles.card}>

            <h3 className={styles.name}>{name?.length > 24 ? name.slice(0, 23) : name}</h3>

            <div className={styles.cardImage} style={{ backgroundImage: `url(${img})` }} />

            <h6>{genres}</h6>
            
        </div>

    )
};

export default Card;
