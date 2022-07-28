import React, { useEffect, useState } from "react";
import OfflineContractCheck from "../components/OfflineContractCheck";
import OfflineContractWaiting from "../components/OfflineContractWaiting";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OfflineContract() {
  const { id, trade_user_id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [trade_state, setTrade_state] = useState("");
  const [art_name, setArt_name] = useState("");
  const [buyer_name, setBuyer_name] = useState("");
  const [owner_name, setOwner_name] = useState("");
  const [art_price, setArt_price] = useState("");
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  useEffect(() => {
    TradeDetail();
  }, []);

  //예약 진행 API
  const TradeDetail = () => {
    let body = {
      id: id, //작품 id
      trade_user_id: trade_user_id, // 요청자 user_id
    };
    axios
      .request({
        method: "POST",
        url: "https://block-in-art.herokuapp.com/api/trade/tradeDetail",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        console.log("오프라인 계약 API 수정 후 res.data: ", res.data);
        console.log("오프라인 계약 API 수정 후 res: ", res.data);
        setTrade_state(res.data.trade_state);
        setArt_name(res.data.art_name);
        setBuyer_name(res.data.buyer_name);
        setOwner_name(res.data.owner_name);
        setArt_price(res.data.art_price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("작가 오프라인 계약 페이지에서의 trade_state : ", trade_state);

  // API불러와서 trade_state값이 2면 대기화면, 3이면 계약체크리스트 화면 출력
  return (
    <>
      {trade_state == 2 ? (
        <OfflineContractWaiting id={id} trade_user_id={trade_user_id} />
      ) : (
        <OfflineContractCheck
          user_artistname={user_artistname} // 작가명
          id={id} // 작품 id
          trade_user_id={trade_user_id} // 구매자 아이디
          owner_name={owner_name} // 작가 이름
          buyer_name={buyer_name} // 구매자 이름
          art_price={art_price} // 가격
          art_name={art_name} // 작품 이름
        />
      )}
    </>
  );
}

export default OfflineContract;
