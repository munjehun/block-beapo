import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import ProductCard from "../components/ProductCard";
import "./Main.css";
import ProductCardnew from "../components/ProductCardnew";
import ProductCard from "../components/ProductCard";

function Main() {
  const user_id = JSON.parse(sessionStorage.getItem("user_id"));
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  const navigate = useNavigate();

  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    getPaintings();
  }, []);

  const getPaintings = () => {
    axios
      .request({
        method: "GET",
        url: "https://localhost:4000/api/art/artList",
        withCredentials: true,
      })
      .then((res) => {
        setPaintings(res.data.data);
        console.log("art_data: ", res.data.data);
      });
  };

  return (
    <div className="main">
      {/* 일반 유저일때는 작품등록하기 버튼이 안 보이도록*/}
      {user_id && user_artistname == null ? (
        <div>작품을 구매하고 계약서 NFT를 발행받으세요</div>
      ) : (
        <div className="wellcome_ment">
          <div className="작가님이신가요">
            작가님이신가요? 빠르게 작품을 등록하고 판매계약까지 맺어보세요
          </div>
          <div>
            <button onClick={() => navigate("/workregister")}>
              작품 등록하기
            </button>
          </div>
        </div>
      )}

      {/* props로 그림 정보 내려주기 */}

      <div className="pictures_list">
        {/* 정보가 분리된 ProductCardnew
        paintings.map((painting) => (
          <ProductCardnew // props로 다 ProductCard 컴포넌트에 넘기기!
            key={painting.id} // 컴포넌트를 map할 때도 key필요!
            id= {painting.id} //작품고유 id를 props로 ProductCard 컴포넌트에 내려주기
            picture_name={painting.art_name}
            img={painting.art_image}
            price={painting.art_price}
            artist={painting.art_artist}
          />
        ))
        */}

        {paintings.map((painting) => (
          <ProductCard
            key={painting.id}
            id={painting.id}
            picture_name={painting.art_name}
            img={painting.art_image}
            price={painting.art_price}
            artist={painting.art_artist}
            trade_state={painting.art_state}
            page={"main"}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
