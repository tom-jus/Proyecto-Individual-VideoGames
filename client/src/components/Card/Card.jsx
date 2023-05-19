import React from 'react';
import styles from './Card.module.css';
import { Component } from 'react';


class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
    return (

        <div className={styles.card}>

            <h3 className={styles.name}>{this.props.name?.length > 24 ? this.props.name.slice(0, 23) : this.props.name}</h3>

            <div className={styles.cardImage} style={{ backgroundImage: `url(${this.props.img})` }} />

            <h6>{this.props.genres}</h6>
            
        </div>
    )}     
}

export default Card;

// const Card = (props) => {

//     const { name, img, genres } = props;

//     return (

//         <div className={styles.card}>

//             <h3 className={styles.name}>{name?.length > 24 ? name.slice(0, 23) : name}</h3>

//             <div className={styles.cardImage} style={{ backgroundImage: `url(${img})` }} />

//             <h6>{genres}</h6>
            
//         </div>

//     )
// };

