import React, { useEffect, useState } from "react";
import "./ContractReservation.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ContractReservation() {
  const navigate = useNavigate();
  const { id, trade_user_id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [paintingInfo, setPaintingInfo] = useState([]);

  useEffect(() => {
    getPaintings();
  }, []);

  //작품 정보 받아오는 API
  const getPaintings = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/artist/detail",
        data: { id: id },
        withCredentials: true,
      })
      .then((res) => {
        setPaintingInfo(res.data.artInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //예약 취소 API
  const cancleReservation = () => {
    let body = {
      id: id, //작품 id
      trade_user_id: trade_user_id, // 요청자 user_id
    };
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/trade/cancleReservation",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //예약 진행 API
  const TradeDetail = () => {
    let body = {
      id: id, //작품 id
      trade_user_id: trade_user_id, // 요청자 user_id
    };
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/trade/tradeDetail",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contract_reservation">
      <div className="title">{paintingInfo.art_name}</div>
      <div className="container">
        <div className="picture">
          <img width={300} src={paintingInfo.art_image} />
        </div>
        <div className="purchase_requests">
          <div className="contract_requester">
            계약 요청자 : {trade_user_id}
          </div>
          <div>
            <button
              className="contract_continue"
              onClick={() => {
                TradeDetail();
                navigate(`/offlineContract_painter/${id}/${trade_user_id}`);
              }}
            >
              계약 진행 계속하기
            </button>
            <button
              className="contract_cancel"
              onClick={() => {
                navigate(-1); //뒤로가기
                cancleReservation(); //예약 취소 함수
                alert("예약이 취소되었습니다.");
              }}
            >
              계약 진행 취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractReservation;
