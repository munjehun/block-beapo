import React, { useEffect, useState } from "react";
import "./DetailPainter.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DetailPainter() {
  const navigate = useNavigate();
  const { id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [paintingInfo, setPaintingInfo] = useState([]);
  const [requests, setRequests] = useState([]);
  const [art_state, setArt_state] = useState("");

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
        console.log(res.data.artInfo);
        setArt_state(res.data.artInfo.art_state);
        setRequests(res.data.data);
        setPaintingInfo(res.data.artInfo);

        if (
          //작가가 예약중인 상태라면 계약페이지로 넘어가도록
          res.data.data.trade_state == "2" ||
          res.data.data.trade_state == "3"
        ) {
          navigate(
            `/contractReservation/${res.data.data.trade_art_id}/${res.data.data.trade_user_id}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //예약하기 API
  const getReservation = (trade_user_id) => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/trade/reservation",
        data: {
          id: id, //작품 id
          trade_user_id: trade_user_id, // 요청자 user_id
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert(`${trade_user_id}님과의 계약이 예약되었습니다.`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="painter_detail">
      <div className="title">{paintingInfo.art_name}</div>
      <div className="container">
        <div className="picture">
          <img width={300} src={paintingInfo.art_image} />
        </div>
        <div className="purchase_requests">
          {art_state ? ( //계약 완료됐을 때
            <div className="contract_complete">계약이 완료되었습니다</div>
          ) : requests.length == 0 ? ( //계약 요청이 없을 때
            <div className="no_request">요청된 계약이 없습니다</div>
          ) : (
            <>
              {requests.map((request) => (
                <ul key={request.id}>
                  <li className="purchase_request_username">
                    {request.trade_user_id} 님과 계약
                  </li>
                  <button
                    onClick={() => {
                      navigate(
                        `/contractReservation/${paintingInfo.id}/${request.trade_user_id}`
                      ); //navigate에서 상태넘겨주기 navigate(`/detailUser/${id}`, {state: {tradeState:tradeState}})
                      getReservation(request.trade_user_id);
                      //예약 승인 처리
                    }}
                  >
                    예약하기
                  </button>
                </ul>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPainter;
