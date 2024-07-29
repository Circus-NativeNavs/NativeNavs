import React from 'react';
import { tours } from '../dummy';
import Tour_Item from '../components/Tour_Item/Tour_Item';
import styles from './Main.module.css';
import searchIcon from '../assets/search-icon.png';

const Main = () => {
  const onClickSearchBar = () => {
    console.log('검색창 클릭');
    // 앱으로 이벤트 전달
  };

  return (
    <div className={styles.main}>
      <div className={styles.searchBar} onClick={onClickSearchBar}>
        <img src={searchIcon} className={styles.searchIcon} />
        <input className={styles.inputBar} type="text" placeholder="원하는 Travel이 있나요?" />
      </div>
      <div className={styles.tourList}>
        {tours.map((tour) => (
          <Tour_Item
            key={tour.tour_id}
            tour_id={tour.tour_id}
            user_id={tour.user_id}
            title={tour.title}
            thumbnail_image={tour.img_url}
            start_date={tour.start_date.toLocaleDateString()} // 'yyyy-mm-dd' 형식으로 바꾸기 위해 toLocaleDateString() 사용
            end_date={tour.date.toLocaleDateString()} // 'yyyy-mm-dd' 형식으로 바꾸기 위해 toLocaleDateString() 사용
            review_average={tour.review_average}
            nav_profile_img={tour.image}
            nav_nickname={tour.nickname}
            nav_language={tour.language.split(", ")} // 문자열을 배열로 변환
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
