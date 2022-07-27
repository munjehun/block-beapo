import React from "react";

function OfflineContractWaiting() {
  return (
    <div className="offlineContract_container">
      <div className="checklist"></div>
      <div className="contractWaiting">
        작가님의 계약 확정을 기다리는 중입니다.
      </div>
      <div className="contractDetail--check">
        작가님이 계약확정을 하시면 NFT 발행이 시작됩니다.
      </div>
    </div>
  );
}

export default OfflineContractWaiting;
