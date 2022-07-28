import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.js";
import OfflineContractDetails from "./OfflineContractDetails";

function OfflineContractCheck({
  id,
  art_name,
  art_owner,
  user_artistname,
  owner_name,
  trade_user_id,
  buyer_name,
  art_price,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  //체크박스 유효성 검사
  useEffect(() => {
    if (checkedList.length == 4) {
      //4개 체크돼야 계약하기 버튼 누를 수 있도록
      setAllChecked(true);
    } else if (checkedList.length !== 4) {
      setAllChecked(false);
    }
  }, [checkedList]); //체크할때마다 유효성검사

  //계약하기 API
  const confirmContract_painter = () => {
    axios
      .request({
        method: "POST",
        url: "https://block-in-art.herokuapp.com/api/trade/artist/confirmContract",
        data: { id: id, trade_user_id: trade_user_id },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.tx_hash);
        navigate("/NFT_Success", { state: res.data.tx_hash });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="offlineContract_container">
      <div className="checklist">
        <label>
          ▪️ {owner_name}({art_owner}) 님과 {buyer_name}({trade_user_id}) 님이
          오프라인에서 현재 작품검수를 완료했나요?&nbsp;&nbsp;
          <input
            type="checkbox"
            id="checkBox_1"
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.id);
            }}
            checked={checkedList.includes("checkBox_1") ? true : false}
          />
        </label>
        <label>
          ▪️ {owner_name}({art_owner}) 님과 {buyer_name}({trade_user_id}) 님
          상호간 작품 선수금 지급이 진행되었나요?&nbsp;&nbsp;
          <input
            type="checkbox"
            id="checkBox_2"
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.id);
            }}
            checked={checkedList.includes("checkBox_2") ? true : false}
          />
        </label>
        <label>
          ▪️ {owner_name}({art_owner}) 님과 {buyer_name}({trade_user_id}) 님
          모두 현재 오프라인에서 대면으로 함께 계신가요?&nbsp;&nbsp;
          <input
            type="checkbox"
            id="checkBox_3"
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.id);
            }}
            checked={checkedList.includes("checkBox_3") ? true : false}
          />
        </label>
      </div>

      <OfflineContractDetails
        art_owner={art_owner} // 작가명
        trade_user_id={trade_user_id} // 구매자 아이디
        owner_name={owner_name} // 작가 이름
        buyer_name={buyer_name} // 구매자 이름
        art_price={art_price} // 가격
        art_name={art_name} // 작품 이름
      />

      <div className="contractDetail--check">
        <label>
          계약 내용을 모두 확인하셨나요?&nbsp;&nbsp;
          <input
            type="checkbox"
            id="checkBox_4"
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.id);
            }}
            checked={checkedList.includes("checkBox_4") ? true : false}
          />
        </label>
      </div>
      <div className="contract--button">
        {loading ? (
          <Spinner />
        ) : (
          <button
            disabled={!allChecked}
            //모든 항목 체크(true)되면 비활성화가 비활성(false)
            //모든 항목 체크안(true)되면 비활성화가 활성(true)

            onClick={() => {
              setLoading(true);
              confirmContract_painter();
            }}
          >
            계약하기
          </button>
        )}
      </div>
    </div>
  );
}

export default OfflineContractCheck;
