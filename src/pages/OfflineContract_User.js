import React, { useEffect, useState } from "react";
import OfflineContractCheckUser from "../components/OfflineContractCheck_User";
import OfflineContractWaitingUser from "../components/OfflineContractWaiting_User";
import "./OfflineContract_Painter.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OfflineContractUser() {
  const { id, trade_user_id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [trade_state, setTrade_state] = useState("");
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  useEffect(() => {
    getPaintings();
  }, []);

  //그림 정보 받아오는 API, 일반 사용자
  const getPaintings = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/general/detail",
        data: { id: id},
        withCredentials: true,
      })
      .then((res) => {
        setTrade_state(res.data.data.Trades[0].trade_state);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // API불러와서 trade_state값이 2면 대기화면, 3이면 계약체크리스트 화면 출력
  return (
    <>
      {trade_state === "2" ? (
        <OfflineContractCheckUser
          user_artistname={user_artistname} //작가는 작가명으로 props 내려주고
          trade_user_id={trade_user_id}
          id = {id}// 구매자는 user_id로 props 내려줌.
        />
      ) : trade_state === "3" ? (
        <OfflineContractWaitingUser />
      ) : (
        <div>계약 진행중이 아닙니다.</div>
      )}
    </>
  );
}

export default OfflineContractUser;
