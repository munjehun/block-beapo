import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.js";

function OfflineContractCheck({ user_artistname, trade_user_id, id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //계약하기 API
  const confirmContract_painter = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/trade/artist/confirmContract",
        data: { id: id, trade_user_id: trade_user_id },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/NFT_Success");
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
          <input type="checkbox" id="checkBox_1" />
        </label>
        <label>
          ▪️ [ {user_artistname} ]님과 [ {trade_user_id} ]님 상호간 작품 선수금
          지급이 진행되었나요?&nbsp;&nbsp;
          <input type="checkbox" id="checkBox_2" />
        </label>
        <label>
          ▪️ [ {user_artistname} ]님과 [ {trade_user_id} ]님 모두 현재
          오프라인에서 대면으로 함께 계신가요?&nbsp;&nbsp;
          <input type="checkbox" id="checkBox_3" />
        </label>
      </div>
      <div className="contractDetail">계약 내용</div>
      <div className="contractDetail--check">
        <label>
          계약 내용을 모두 확인하셨나요?&nbsp;&nbsp;
          <input type="checkbox" id="checkBox_4" />
        </label>
      </div>
      <div className="contract--button">
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={() => {
              setLoading(true);
              confirmContract_painter();
            }}
          >
            계약하기
          </button>
        )}
        {/* 모든 체크박스 체크했을때만 넘어가도록! */}
      </div>
    </div>
  );
}

export default OfflineContractCheck;
