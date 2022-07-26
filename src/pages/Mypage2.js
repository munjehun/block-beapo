import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "./Mypage2.css";
import axios from "axios";

function Mypage2() {
  const [paintings, setPaintings] = useState([]);
  const [trade, setTrade] = useState("");

  useEffect(() => {
    getPaintings();
  }, []);

  const getPaintings = () => {
    axios
      .request({
        method: "GET",
        url: "https://localhost:4000/api/user/general/mypage",
        withCredentials: true,
      })
      .then((res) => {
        setPaintings(res.data.data);
        console.log("GET 요청 성공");
        console.log(res);
        console.log("일반유저 마이페이지 GET 요청 성공");
      })
      .catch((err) => {
        console.log("일반유저 마이페이지 GET 요청 실패");
      });
  };

  const tradStateSelect = (trade_state) => {
    switch (trade_state) {
      case "1":
        console.log("계약요청");
        setTrade("계약요청 완료");
        break;
      case "2":
        console.log("작가님 거래 예약 신청 완료");
        setTrade("작가님이 계약을 희망중!");
        break;

      case "3":
        console.log("계약 확정");
        setTrade("계약 확정");
        break;

      default:
        console.log("not case in trade_state");
        break;
    }
  };

  return (
    <div className="mypage2">
      <div>
        <div className="나의구매요청목록">나의 구매요청 목록</div>
      </div>
      <div className="pictures_list">
        {paintings.map((painting) => (
          <ProductCard
            key={painting.Art.id}
            id={painting.Art.id}
            picture_name={painting.Art.art_name}
            img={painting.Art.art_image}
            trade_state={painting.trade_state}
            trade_user_id={painting.trade_user_id}
            page="mypage2"
          />
        ))}
      </div>
    </div>
  );
}

export default Mypage2;
