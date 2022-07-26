import React from "react";
import "./DetailUser.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

function DetailUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // useParams() = 파라미터 값 받아오는 함수
  const [paintingInfo, setPaintingInfo] = useState([]);
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));
  const [buttonState, setButtonState] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    //console.log("navigate state : ", state.tradeState)
    //console.log("id detail : ", id)
    buttonStringChange();
    getPaintingInfo();
  }, []);

  const getPaintingInfo = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/art/artDetail",
        data: { id: id },
        withCredentials: true,
      })
      .then((res) => {

        setPaintingInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const purchaseRequest = () => {
      axios
        .request({
          method: "POST",
          url: "https://localhost:4000/api/trade/buyRequest",
          data: { id: id },
          withCredentials: true,
        })
        .then((res) => {
          // 계약 요청하면 마이페이지로 가도록
          if (res.data == "already requested") {
            alert("이미 계약이 요청되었습니다.");
            navigate("/mypage2");
          } else if (res.data.message === "request success") {
            alert("계약이 요청되었습니다.");
            navigate("/mypage2");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err == "AxiosError: Request failed with status code 401") {
            alert("로그인 후 계약을 요청 해주세요.");
            navigate("/login");
          }
        });

  };

  const buttonStringChange = () => {
    let trade_state = state.tradeState

    if(!trade_state){
      axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/general/detail",
        data: { id: id },
        withCredentials: true,
      })
      .then((res) => {
        //trade_state = res.data.data.Trades[0].trade_state
        trade_state = res.data.data
        console.log("trade 마지막...ㅠ : trade_state",trade_state )

      }).catch((err) => {
        console.log(err);
        }
      );
    }

    console.log("ping: ", trade_state)
    switch (trade_state) {
      case "1":
        setButtonState("계약 요청 완료");
        break;

      case "2":
        setButtonState("계약 진행중...");
        break;

      case "3":
        setButtonState("계약 완료");
        break;

      default:
        setButtonState("계약 요청보내기");
        break;
    }
  };

  return (
    <div className="user_detail">
      <div className="title">{paintingInfo.art_name}</div>
      <div className="container">
        <div className="picture">
          <img width={300} src={paintingInfo.art_image} />
        </div>
        <div className="picture-detail">
          <div className="picture-detail__info">
            <span>
              <dt>작가명</dt>
              <dd>{paintingInfo.art_artist}</dd>
            </span>
            <span>
              <dt>분야 장르</dt>
              <dd>{paintingInfo.art_genre}</dd>
            </span>
            <span>
              <dt>작품 크기</dt>
              <dd>{paintingInfo.art_size}</dd>
            </span>
            <span>
              <dt>금액</dt>
              <dd>{paintingInfo.art_price}</dd>
            </span>
            <div>
              <dt>작품 설명</dt>
              <dd>{paintingInfo.art_desc}</dd>
            </div>
          </div>
          <div className="picture-detail__request">
            {user_artistname ? (
              <></>
            ) : (
              <button onClick={purchaseRequest}>{buttonState}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
