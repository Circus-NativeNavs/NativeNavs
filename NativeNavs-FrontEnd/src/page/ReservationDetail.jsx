import styles from "./ReservationDetail.module.css";
import Carousel3 from "@/components/Carousel/Carousel3";
import { useParams } from "react-router-dom";
import messageBox from "../assets/messageBox.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  navigateToReservationDetailChattingRoom,
  navigateBack,
} from "../utils/get-android-function";
import Modal2 from "../components/Modal/Modal2";
import { getStringedDate } from "@/utils/get-stringed-date";

const ReservationDetail = () => {
  const [tour, setTour] = useState();
  const [user, setUser] = useState();
  const [images, setImages] = useState([]);

  const [modal, setModal] = useState(false);

  const clickModal = () => {
    setModal((current) => !current);
  };

  const params = useParams();
  console.log(params.res_id);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log(user);
    }
  }, []);

  const getReservationDetail = async (e) => {
    try {
      const response = await axios.get(
        `https://i11d110.p.ssafy.io/api/reservations/${params.res_id}`,
        {
          headers: {
            Authorization: user.userToken,
          },
        }
      );
      setTour(response.data);
      console.log("받아온 정보:", response.data);
    } catch (error) {
      console.error("투어 예약 리스트 받아오기 실패:", error);
    }
  };

  useEffect(() => {
    getReservationDetail();
  }, [user]);

  useEffect(() => {
    if (tour && tour.thumbnailImage && tour.planImages) {
      setImages([tour.thumbnailImage, ...tour.planImages]);
    }
  }, [tour]);

  const cancelTourReservation = async (e) => {
    try {
      const response = await axios.post(
        `https://i11d110.p.ssafy.io/api/reservations/${params.res_id}/cancel`,
        {},
        {
          headers: {
            Authorization: user.userToken,
          },
        }
      );
      console.log("투어 예약 취소 결과:", response.data);
    } catch (error) {
      console.error("투어 예약 취소 실패:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateString = new Date(date).toLocaleDateString("ko-KR", options);
    return dateString.replace(/\.$/, "").replace(/\s/g, "");
  };

  const formatTime = (time) => {
    const dateObj = new Date(`1970-01-01T${time}Z`);
    const hours = dateObj.getUTCHours();
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div>
      {tour && (
        <>
          <div className={styles.tourInfoTop}>
            <div className={styles.tourInfoTopImage}>
              <Carousel3 images={images} />
            </div>
            <div className={styles.tourInfoTopTextTop}>
              <div className={styles.tourInfoTopTextLeft}>
                <p className={styles.value1}>
                  {user && user.isKorean ? "만남 시작" : "Meeting Start"}
                </p>
                <p className={styles.value2}>
                  {formatDate(tour.reservationDate)}
                </p>
                <p className={styles.value2}>
                  {formatTime(tour.meetingStartAt)}
                </p>
              </div>
              <div className={styles.tourInfoTopTextRight}>
                <p className={styles.value1}>
                  {user && user.isKorean ? "만남 종료" : "Meeting End"}
                </p>
                <p className={styles.value2}>
                  {formatDate(tour.reservationDate)}
                </p>
                <p className={styles.value2}>{formatTime(tour.meetingEndAt)}</p>
              </div>
            </div>
            <div
              onClick={() =>
                navigateToReservationDetailChattingRoom(tour.roomId)
              }
              className={styles.tourInfoTopTextBottom}
            >
              <img className={styles.messageBox} src={messageBox} alt="" />
              {user && user.isNav == true ? (
                <div>
                  <p className={styles.value3}>
                    {user && user.isKorean
                      ? "Trav에게 메세지 남기기"
                      : "Leave a message for Trav"}
                  </p>
                  <p className={styles.value4}>
                    {tour.participant.nickname}
                    {user && user.isKorean ? "님" : ""}
                  </p>
                </div>
              ) : (
                <div>
                  <p className={styles.value3}>
                    {user && user.isKorean
                      ? "Nav에게 메세지 남기기"
                      : "Leave a message for Nav"}
                  </p>
                  <p className={styles.value4}>
                    {tour.guide.nickname}
                    {user && user.isKorean ? "님" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.tourInfoMiddle}></div>

          <div className={styles.tourInfoBottom}>
            <h3 className={styles.tourInfoBottomtitle}>
              {user && user.isKorean ? "예약 상세 내역" : "Reservation Details"}
            </h3>
            <div className={styles.tourInfoBottominfoItem}>
              <p className={styles.tourInfoBottominfoItemTitle}>
                {user && user.isKorean ? "참여 인원" : "Participants"}
              </p>
              <p className={styles.tourInfoBottominfoItemContent}>
                {tour.participantCount}
                {user && user.isKorean ? `명` : ``}
              </p>
            </div>
            <div className={styles.tourInfoBottominfoItem}>
              <p className={styles.tourInfoBottominfoItemTitle}>
                {" "}
                {user && user.isKorean ? "예약 번호" : "Reservation Number"}
              </p>
              <p className={styles.tourInfoBottominfoItemContent}>
                {tour.reservationNumber}
              </p>
            </div>
            <div className={styles.tourInfoBottominfoItem}>
              <p className={styles.tourInfoBottominfoItemTitle}>
                {user && user.isKorean ? "만남 장소" : "Meeting Location"}
              </p>
              <p className={styles.tourInfoBottominfoItemContent}>
                {tour.meetingAddress}
              </p>
            </div>
            <div className={styles.tourInfoBottominfoItem}>
              <p className={styles.tourInfoBottominfoItemTitle}>
                {user && user.isKorean
                  ? "추가 요청 사항"
                  : "Additional Requests"}
              </p>
              <p className={styles.tourInfoBottominfoItemContent}>
                {tour.reservationDescription}
              </p>
            </div>
            {tour && tour.reservationDate > getStringedDate(new Date()) && (
              <div className={styles.buttonContainer}>
                {!modal ? (
                  <button onClick={clickModal} className={styles.reserveButton}>
                    {user && user.isKorean ? "예약 취소" : "Cancel"}
                  </button>
                ) : (
                  <Modal2
                    cancelTourReservation={cancelTourReservation}
                    navigateBack={navigateBack}
                    clickModal={clickModal}
                    className={styles.reserveButton}
                    user={user}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationDetail;
