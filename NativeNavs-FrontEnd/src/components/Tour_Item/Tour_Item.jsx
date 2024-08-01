import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../Star/Rating(Basic)";
import Heart from "../Heart/Heart";
import styles from "./Tour_Item.module.css";
import { getStaticImage } from "@/utils/get-static-image";

// user_id : 유저 고유 키값
// title : 투어 제목 :String
// thumbnail_image : 투어 썸네일 이미지 : String
// start_date : 시작날짜 (yyyy-mm-dd) : string
// end_date : 끝 날짜 (yyyy-mm-dd) : string
// nav_profile_img : 해당 가이드의 프로필 이미지 링크 : string
// nav_nickname : 가이드 닉네임 : string
// nav_language : 가이드가 사용가능한 언어 목록 : string[]
const Tour_Item = ({
  tour_id,
  user_id,
  title,
  thumbnail_image,
  start_date,
  end_date,
  review_average,
  nav_profile_img,
  nav_nickname,
  nav_language,
  userJson, // 추가: userJson을 props로 전달
}) => {
  const navigate = useNavigate();
  const [isWishListed, setIsWishListed] = useState(false);

  // 유저 정보 파싱 및 로그 출력
  useEffect(() => {
    console.log("Received user JSON:", userJson);
    try {
      const user = JSON.parse(userJson);
      console.log(`User ID: ${user.userId}`);
      console.log(`Token: ${user.userToken}`);
      console.log(`isNav: ${user.isNav}`);
    } catch (error) {
      console.error("Failed to parse user JSON", error);
    }
  }, [userJson]); // userJson 변경 시마다 실행

  // 투어 클릭 이벤트
  const onClickTour = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    // 네이티브 안드로이드 브릿지를 사용해 투어 상세 페이지로 이동
    if (
      window.Android &&
      typeof window.Android.navigateToTourDetailFragment === "function"
    ) {
      window.Android.navigateToTourDetailFragment(tour_id);
    } else {
      console.log("Android.navigateToTourDetailFragment is not defined");
    }
  };

  // 위시리스트 이벤트
  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishListed((current) => !current);
  };

  return (
    <div onClick={onClickTour} className={styles.tour_item}>
      <div className={styles.thumbnail_container}>
        <img src={thumbnail_image} alt="" className={styles.tour_thumbnail} />
        <div className={styles.heart_container}>
          <Heart
            isWishListed={isWishListed}
            setIsWishListed={setIsWishListed}
            onClickEvent={toggleWishlist}
          />
        </div>
      </div>
      <section className={styles.tour_info}>
        <div className={styles.tour_leftinfo}>
          <p className={styles.tour_title}>{title}</p>
          <p className={styles.tour_duration}>
            {start_date} ~ {end_date}
          </p>
          <Rating avg={review_average} />
        </div>
        <div className={styles.tour_rightinfo}>
          <div className={styles.tour_nav}>
            <img
              src={nav_profile_img}
              alt={nav_nickname}
              className={styles.nav_img}
            />
            <p style={{ cursor: "pointer" }}>{nav_nickname}</p>
          </div>
          <div className={styles.tour_nav_language}>
            <img src={getStaticImage("language")} alt="언어 이미지" />
            {nav_language.length > 1 ? (
              <p>
                {nav_language[0]} 외 {nav_language.length - 1} 개 국어
              </p>
            ) : (
              <p>{nav_language[0]}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tour_Item;
