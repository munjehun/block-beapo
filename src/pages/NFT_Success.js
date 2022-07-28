import "./NFT_Success.css";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function NFT_Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="nft_success">
      <div className="form_container">
        <div className="success_ment">
          계약서 NFT가 성공적으로 발행되었습니다 !
        </div>
        <div className="tx_hash">NFT의 트랜잭션 주소는 {state} 입니다</div>
        <div className="submit">
          <button onClick={() => navigate("/")}>HOME</button>
          <button onClick={() => navigate("/mypage1")}>마이페이지</button>
        </div>
      </div>
    </div>
  );
}

export default NFT_Success;
