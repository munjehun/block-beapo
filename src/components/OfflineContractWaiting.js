import React from "react";
import "./OfflineContract.css";

function OfflineContractWaiting({ id, trade_user_id }) {
  return (
    <div className="offlineContract_container">
      <div className="checklist"></div>
      <div className="contractWaiting">
        상대의 계약 확정을 기다리는 중입니다.
      </div>
      <button
        className="confirmCheck-btn"
        onClick={() =>
          window.location.replace(
            `/offlineContract_painter/${id}/${trade_user_id}` //새로고침
          )
        }
      >
        계약확정 확인
      </button>
      <div className="contractDetail--check">
        구매자가 계약확정을 하면 계약진행을 위한 페이지가 나타납니다.
      </div>
    </div>
  );
}

export default OfflineContractWaiting;
