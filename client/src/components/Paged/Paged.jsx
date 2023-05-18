import React from "react";
import styles from './Pages.module.css';

export default function Paged(props) {

  const { videoGamesPP, allVideoGames, paged } = props;

  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideoGames/videoGamesPP); i++) {
    pageNumbers.push(i);
  };

  return (
    <nav>
      <ul className={styles.pagedButtonsContainer}>
        {pageNumbers && pageNumbers.map(num => (
          <button key={num} className={styles.btn} onClick={() => paged(num)}>{num}</button>
        ))}
      </ul>
    </nav>
  );
};