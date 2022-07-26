import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import ProductCardButtom from "./ProductCardButtom";

function ProductCardnew({
  id,
  picture_name,
  img,
  price,
  artist,
  requests,
  page,
  trade_state,
}) {
  const navigate = useNavigate();
  const [trade, setTrade] = useState("");
  const [tradeState, setTradeState] = useState();
  const [props, setProps] = useState({});

  useEffect(() => {
    setTradeState(trade_state);
    setProps({ page });

    if (page === "general_mypage") {
      console.log("trade_state : ", trade_state);
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
    }
  }, []);

  return (
    <div className="productCard">
      <div className="picture_name">{picture_name}</div>
      <img src={img} alt=""></img>

      <ProductCardButtom
        className="container__detail-btn"
        variant="outline-primary"
        page={page}
        //props로 전달할것들 셋팅하기
      ></ProductCardButtom>
    </div>
  );
}

export default ProductCardnew;
