import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Mypage1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mypage1() {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);
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
        setPaintings(res.data.data); //작가의 그림 목록을 상태(paintings)에 저장
        //res.data.data = API로 받아온 작가의 그림 목록
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //받아온 그림 목록(paintings)들을 ProductCard 컴포넌트에 props로 내려주고 map처리
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
          <ProductCard // props로 다 ProductCard 컴포넌트에 넘기기!
            key={painting.id} // 컴포넌트를 map할 때도 key필요!
            id={painting.id}
            picture_name={painting.art_name}
            img={painting.art_image}
            requests={painting.Trades.length}
            trade_state={painting.art_state}
            page="mypage" //page를 props로 넘겨서 어떤 페이지에서 출력되느냐에 따라 다르게 출력되도록
          />
        ))}
      </div>
    </div>
  );
}

export default Mypage1;
