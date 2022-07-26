import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCardButtom({
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
  const [buttonData, setButtonData] = useState({});

  useEffect(() => {
    setTradeState(trade_state);

    switch (page) {
      case "":
        console.log("main입니다");
        break;

      case "general_mypage":
        console.log("main입니다");
        break;

      case "":
        console.log("main입니다");
        break;
    }

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

  const ButtonSwitch = () => {};

  return (
    <div className="productCard">
      <div className="price_painter">
        <div>ProductCardButtom의 다양한 정보 표시 부분입니다</div>
      </div>
      <Button
        className="container__detail-btn"
        variant="outline-primary"
        data={buttonData}
        onClick={() => {
          ButtonSwitch();
        }}
      >
        ProductCardButtom의 버튼부입니다
      </Button>
    </div>
  );
}

export default ProductCardButtom;
