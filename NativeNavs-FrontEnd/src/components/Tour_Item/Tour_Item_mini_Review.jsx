import styles from "./Tour_Item_mini_Review.module.css";

const info = {
  tour: {
    // 투어 정보
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg",
    title: "투어 제목",
    nav: {
      // 가이드 정보
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg",
      nickname: "가이드이름",
    },
  },
  progress: {
    // 예약 정보
    date: "2021-09-01",
    participant: 2,
  },
};

// 리뷰 작성 페이지에 작성할 관련 투어 정보를 보여주는 컴포넌트
const Tour_Item_mini_Review = ({ tour, progress }) => {
  return (
    <div className={styles.Tour_Item_mini_Review}>
      <section className={styles.tourImageSection}>
        <img src={tour.image} alt="" />
      </section>
      <section className={styles.tourInfoSection}>
        <div className={styles.tourTextInfo}>
          <h3>{tour.title}</h3>
          <div>{progress.date}</div>
          <div>{progress.participant}명</div>
        </div>
        <div className={styles.tourNavInfo}>
          <img src={tour.nav.image} alt="" />
          <p>{tour.nav.nickname}</p>
        </div>
      </section>
    </div>
  );
};

export default Tour_Item_mini_Review;
