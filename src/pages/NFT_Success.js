import React, { useEffect, useState } from "react";
import "./NFT_Success.css";
import { useNavigate } from "react-router-dom";

function NFT_Success() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLoadingment();
  });

  const getLoadingment = () => {
    setIsLoading(true);
  };
  return (
    <div className="nft_success">
      <div className="form_container">
        <div className="success_ment">
          계약서 NFT가 성공적으로 발행되었습니다 !
        </div>
        <div className="submit">
          <button onClick={() => navigate("/")}>HOME</button>
          <button onClick={() => navigate("/mypage1")}>마이페이지</button>
        </div>
      </div>
    </div>
  );
}

export default NFT_Success;
