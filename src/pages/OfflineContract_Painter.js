import React, { useEffect, useState } from "react";
import OfflineContractCheck from "../components/OfflineContractCheck";
import OfflineContractWaiting from "../components/OfflineContractWaiting";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OfflineContract() {
  const { id, trade_user_id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [trade_state, setTrade_state] = useState("");
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  useEffect(() => {
    getPaintings();
  }, []);

  //그림 정보 받아오는 API
  const getPaintings = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/artist/detail",
        data: { id: id },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setTrade_state(res.data.data.trade_state);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // API불러와서 trade_state값이 2면 대기화면, 3이면 계약체크리스트 화면 출력
  return (
    <>
      {trade_state === "2" ? (
        <OfflineContractWaiting id={id} trade_user_id={trade_user_id} />
      ) : (
        <OfflineContractCheck
          user_artistname={user_artistname} //작가는 작가명으로 props 내려주고
          trade_user_id={trade_user_id} // 구매자는 user_id로 props 내려줌.
          id={id}
        />
      )}
    </>
  );
}

export default OfflineContract;
