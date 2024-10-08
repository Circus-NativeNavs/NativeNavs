import React, { useState, useEffect } from 'react';
import styles from "./StarScore.module.css";

function StarScore({ score }) {
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = (score) => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (score * 70) / 100;
    let idx = 0;

    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    if (idx < 5) {
      tempStarRatesArr[idx] = starVerScore;
    }
    return tempStarRatesArr;
  };

  useEffect(() => {
    const ratesArray = calcStarRates(score);
    setRatesResArr(ratesArray);
  }, [score]);

  return (
    <div className={styles["star-score-wrap"]}>
      <div className={styles["star-score-icons"]}>
        {['first', 'second', 'third', 'fourth', 'last'].map((item, idx) => (
          <span className={styles["star-score-icon"]} key={`${item}-${idx}-${score}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 13" fill="#cacaca">
              <defs>
                <clipPath id={`${item}-${idx}-${score}StarClip`}>
                  <rect width={ratesResArr[idx]} height="13" />
                </clipPath>
              </defs>
              <path
                id={`${item}-${idx}-${score}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use clipPath={`url(#${item}-${idx}-${score}StarClip)`} href={`#${item}-${idx}-${score}Star`} fill="rgb(255, 232, 24)" />
            </svg>
          </span>
        ))}
      </div>
      <span className={styles["star-score-text"]}>{score / 20}</span>
    </div>
  );
}

export default StarScore;
