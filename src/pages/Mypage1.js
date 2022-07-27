import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Mypage1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mypage1() {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);
  const [trade, setTrade] = useState("");
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  useEffect(() => {
    getPaintings();
  }, []);

  //그림 정보 받아오는 API
  const getPaintings = () => {
    axios
      .request({
        method: "GET",
        url: "https://localhost:4000/api/user/artist/mypage",
        withCredentials: true,
      })
      .then((res) => {
        setPaintings(res.data.data);
        console.log(res.data.data);
        //res.data.data = API로 받아온 작가의 그림 목록
      })
      .catch((err) => {
        console.log(err);
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

      case "4":
        console.log("계약 완료");
        setTrade("계약 완료");
        break;

      default:
        console.log("not case in trade_state");
        break;
    }
  };

  return (
    <div className="mypage1">
      <div className="wellcome_ment">
        <div className="작가님이신가요">
          {user_artistname} 작가님 반갑습니다
        </div>
        <div>
          <button onClick={() => navigate("/workregister")}>
            작품 등록하기
          </button>
        </div>
      </div>

      <div className="pictures_list">
        {paintings.map((painting) => (
          <ProductCard
            key={painting.id}
            id={painting.id}
            picture_name={painting.art_name}
            img={painting.art_image}
            requests={painting.Trades.length}
            trade_state={painting.art_state}
            page="mypage1"
          />
        ))}
      </div>
    </div>
  );
}

export default Mypage1;
