import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OfflineContractDetails from "./OfflineContractDetails";

function OfflineContractCheckUser({
  user_artistname,
  id,
  trade_user_id,
  owner_name,
  buyer_name,
  art_price,
  art_name,
}) {
  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
      //체크된 것 checkedList 에 추가
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
      //체크 안 된 것 checkedList에서 제거
    }
  };

  //체크박스 유효성 검사
  useEffect(() => {
    if (checkedList.length == 4) {
      //4개 모두 체크돼야 계약하기 버튼 누를 수 있도록
      setAllChecked(true);
    } else if (checkedList.length !== 4) {
      setAllChecked(false);
    }
  }, [checkedList]); //체크 할 때마다 유효성검사

  const contractUser = () => {
    axios
      .request({
        method: "POST",
        url: "https://block-in-art.herokuapp.com/api/trade/general/confirmContract",
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
          ▪️ [ {owner_name}({user_artistname}) ]님과 [ {buyer_name}(
          {trade_user_id}) ]님이 오프라인에서 현재 작품검수를
          완료했나요?&nbsp;&nbsp;
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
          ▪️ [ {owner_name}({user_artistname}) ]님과 [ {buyer_name}(
          {trade_user_id}) ]님 상호간 작품 선수금 지급이
          진행되었나요?&nbsp;&nbsp;
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
          ▪️ [ {owner_name}({user_artistname}) ]님과 [ {buyer_name}(
          {trade_user_id}) ]님 모두 현재 오프라인에서 대면으로 함께
          계신가요?&nbsp;&nbsp;
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
        user_artistname={user_artistname} // 작가명
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
        <button
          disabled={!allChecked}
          //모든 항목 체크(true)되면 비활성화가 비활성(false)
          //모든 항목 체크안(true)되면 비활성화가 활성(true)

          onClick={() => contractUser()}
        >
          계약하기
        </button>
      </div>
    </div>
  );
}

export default OfflineContractCheckUser;
