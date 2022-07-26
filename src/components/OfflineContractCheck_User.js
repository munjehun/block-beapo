import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OfflineContractCheckUser({ user_artistname, id, trade_user_id }) {
  const navigate = useNavigate();
  const contractUser = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/trade/general/confirmContract",
        data: { id: id },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log("trade_user_id : ", trade_user_id);
        window.location.replace(`/offlineContract_user/${id}/${trade_user_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="offlineContract_container">
      <div className="checklist">
        <label>
          ▪️ [ {user_artistname} ]님과 [ {trade_user_id} ]님이 오프라인에서 현재
          작품검수를 완료했나요?&nbsp;&nbsp;
          <input type="checkbox" />
        </label>
        <label>
          ▪️ [ {user_artistname} ]님과 [ {trade_user_id} ]님 상호간 작품 선수금
          지급이 진행되었나요?&nbsp;&nbsp;
          <input type="checkbox" />
        </label>
        <label>
          ▪️ [ {user_artistname} ]님과 [ {trade_user_id} ]님 모두 현재
          오프라인에서 대면으로 함께 계신가요?&nbsp;&nbsp;
          <input type="checkbox" />
        </label>
      </div>
      <div className="contractDetail">계약 내용</div>
      <div className="contractDetail--check">
        <label>
          계약 내용을 모두 확인하셨나요?&nbsp;&nbsp;
          <input type="checkbox" />
        </label>
      </div>
      <div className="contract--button">
        <button onClick={() => contractUser()}>계약하기</button>
      </div>
    </div>
  );
}

export default OfflineContractCheckUser;
