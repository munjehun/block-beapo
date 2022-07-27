import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.js";

function OfflineContractCheck({ user_artistname, trade_user_id, id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const user_id = JSON.parse(sessionStorage.getItem("user_id"));
  

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  //체크박스 유효성 검사
  useEffect(() => {
    if (checkedList.length === 4) {
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
        url: "https://localhost:4000/api/trade/artist/confirmContract",
        data: { id: id, trade_user_id: trade_user_id },
        withCredentials: true,
      })
      .then((res) => {
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
          ▪️ [ {user_id} ]님과 [ {trade_user_id} ]님이 오프라인에서 현재
          작품검수를 완료했나요?&nbsp;&nbsp;
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
          ▪️ [ {user_id} ]님과 [ {trade_user_id} ]님 상호간 작품 선수금 지급이
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
          ▪️ [ {user_id} ]님과 [ {trade_user_id} ]님 모두 현재 오프라인에서
          대면으로 함께 계신가요?&nbsp;&nbsp;
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
      <pre className="contractDetail" >
        매수인과 작가 간의 작품 매매계약서

매수인 buyer_id (이하 ‘매수인’)과 작가 owner_id(이하 ‘작가’)는 아래와 같이 미술작품의 매매계약을 체결한다.

본계약에 명시된 buyer_id, owner_id, art_name, price는 클레이튼 네트워크 등록된 본 트랜잭션의 buyer_id, owner_id, art_name, price를 말한다.

제1조(목적) 본 계약은 매도인인 작가가 매수인에게 미술작품(이하 ‘작품 혹은 art_name’)의 소유권을 이전하고 매수인이 작가에게 그 대금을 지급함에 있어서 필요한 제반 사항과 당사자의 권리 및 의무를 규율함에 목적이 있다.

제2조(매매 대상 작품) 작가(owner_id)는 클레이튼 네트워크에 등록된 본 트랜잭션에 art_name으로 작품명이 명시된 작품 1점을 매수인(buyer_id)에게 매도한다.



(지금은 작품 명만 넣는걸로)
제3조(매매대금 및 지급 방법) ① 매수인은 작가에게 작품 매매대금으로 금 (price)원을 원을 지급한다. 그 구체적인 지급 금액과 일정은 다음과 같다.
1. 계약 체결과 동시에 계약금으로 총액의 50% 지급
2. 작품 인도 시 잔금으로 총액의 50% 지급
② 작가는 매수인으로부터 매매대금의 잔금을 수령함과 동시에 작품을 매수인에게 인도하여야 하며, 이로 인하여 소유권이 이전된다.

제4조(작품의 인도) 작가는 협의된 일시까지 협의된 장소로 작품을 인도하여야 한다. 작품의 인도와 관련한 운송료 및 보험료는 양 당사자가 협의하여 부담한다.

제5조(작품의 관리) ① 작품이 제4조에서 정한 인도일 이전에 불가항력적인 사유로 멸실, 파손, 도난되어 계약의 목적을 달성할 수 없게 된 경우 작가는 계약금을 반환하여야 하며, 이 때 매수인은 별도로 손해배상을 청구할 수 없다. 그러나 작가의 귀책사유로 작품이 멸실, 파손, 도난된 경우 작가는 손해배상책임을 부담한다.
② 작가는 제4조에 따른 작품 인도와 함께 작품의 설치, 전시, 유지, 관리 등에 관한 매뉴얼을 매수인에게 제공하여야 한다.
③ 작가는 작품 인도 후 작품이 자연적으로 마모되거나 변색, 변형, 훼손된 경우 작품의 유지, 보수를 위하여 매수인에게 적극적으로 협조하여야 한다.

제6조(확인 및 보증) ① 작가는 작품을 스스로 창작하였고 작품에 대한 소유권을 적법하고 유효하게 보유하고 있어 이에 관한 어떠한 법률적 문제도 없음을 보증한다.
② 작가는 작품의 인도 시 작품이 진품임을 확인하는 내용의 진품 확인서 등 문서를 교부하여야 한다.

제7조(저작권) ① 작품에 대한 소유권 이전에도 불구하고 작품의 저작권은 작가에게 귀속된다.
② 매수인은 작품 원본의 소유자로서 그 저작물을 원본에 의하여 전시할 수 있다. 다만 가로·공원·건축물의 외벽 그 밖에 공중에게 개방된 장소에 항시 전시하는 경우에는 작가의 동의를 얻어야 한다.
③ 매수인은 전항에 따른 전시를 하는 경우 미술계의 관례에 따라 작가의 의사에 반하지 않는 방법으로 작가의 성명, 작품명, 작품의 재료 및 크기를 표시하여야 한다.
④ 매수인은 작품에 대한 변조, 개작, 훼손 등 작가의 인격권을 해하는 방법으로 작품을 이용하여서는 아니 되며, 작품을 철거할 경우에도 작가의 인격권을 존중하여야 한다.
⑤ 작가가 작품에 관한 저작권침해행위에 대하여 법적 조치를 취하기 위해 작품의 원본을 확인하여야 하는 등 필요한 경우 매수인은 작가의 침해배제조치에 협력하여야 한다.

제8조(권리·의무의 양도금지) 양 당사자는 상대방의 사전 동의 없이 본 계약상의 권리·의무를 제3자에게 양도하거나 담보의 목적으로 제공할 수 없다.

제9조(성폭력, 성희롱 등 방지) ① 당사자는 성폭력, 성희롱 그밖에 성범죄를 예방하기 위해 노력하고, 상대방이 가지는 신체에 대한 자기결정권을 존중하여야 한다.
② 당사자는 형법, 성폭력범죄의 처벌 등에 관한 특례법, 성폭력방지 및 피해자보호 등에 관한 법률을 비롯하여 법률상 규정된 성폭력, 성희롱 그밖에 성범죄를 저질러서는 아니 된다.

제10조(계약의 해제) ① 작가는 매수인이 잔금을 지급할 때까지 매수인에게 계약금의 배액을 상환하고 본 계약을 해제할 수 있으며, 매수인은 작가가 매수인에게 작품을 인도할 때까지 계약금을 포기하고 본 계약을 해제할 수 있다.
② 당사자는 천재지변 또는 기타 불가항력으로 계약을 유지할 수 없는 경우에 본 계약을 해제할 수 있다.
③ 당사자는 상대방이 정당한 이유 없이 본 계약을 위반하는 경우에 상당한 기간을 정하여 상대방에게 그 시정을 촉구하고, 상대방이 그 기간이 지나도록 이행하지 아니하는 경우에는 계약을 해제할 수 있다. 다만, 상대방이 명백한 시정 거부 의사를 표시하였거나 위반 사항의 성격상 시정이 불가능하다는 것이 명백히 인정되는 경우에는 위와 같은 촉구 없이 계약을 해제할 수 있다.
④ 당사자는 상대방으로부터 성폭력, 성희롱 그밖에 성범죄를 당한 경우 즉시 계약을 해지할 수 있다.
⑤ 본 계약에 대한 해제권의 행사는 상대방에 대한 손해배상청구권 행사에 영향을 미치지 아니한다.

제11조(손해배상) 당사자가 정당한 이유 없이 본 계약을 위반하는 경우, 그로 인하여 상대방에게 발생한 모든 손해를 배상할 책임이 있다. 다만, 전조 제2항의 사유로 본 계약을 이행하지 못한 경우에는 손해배상책임을 면한다.

제12조(분쟁해결 등) ① 본 계약과 관련하여 분쟁이 발생한 경우 양 당사자는 상호 협의하여 분쟁을 해결하기 위해 노력한다.
② 당사자가 본 계약에 관련된 소송을 제기하는 경우  (상대방의 주소지를 관할하는 법원을 표기한다) 을 제1심 관할법원으로 한다.

제13조(본 계약의 효력) ① 본 계약의 효력은 계약 체결일로부터 발생한다.
② 본 계약은 그 내용과 관련하여 협의, 논의, 합의, 회의록, 비망록, 메모, 이메일, 양해각서 기타 그 명칭 여하를 불문하고 과거로부터 본 계약 체결일까지 당사자 간의 일체의 구두 또는 서면의 합의나 의사에 우선하며, 그와 같은 구두 또는 서면의 합의나 의사는 본 계약의 내용과 충돌하거나 상반되는 한 효력이 없다.
③ 당사자는 본 계약의 내용을 보충·변경하거나 본 계약에서 정하지 아니한 사항을 규정하기 위하여 양 당사자의 합의에 의하여 서면으로 된 부속 합의서를 작성할 수 있으며, 서명날인된 부속 합의서는 클레이튼 네트워크에 등록된 본 계약의 트랜잭션 이외 별도로 서면작성 해야한다

제14조(기타) 본 계약에 명시되지 않은 사항은 양 당사자가 성의를 갖고 상호 협의로 결정하되, 관련 법규, 일반적인 상관례에 따른다.

제 15조(특약) 본계약의 매수인은 작품 재판매 이후 본계약의 작품 매매대금과 재판매된 작품 매매대금의 차액에 10%를 작가에게 지급한다. 지금 시점은 작가가 지급을 요청한 시점으로부터 일주일안으로 한다.

본 계약의 성립 및 내용 증명은 모두 클레이튼 네트워크의 본 트랜잭션으로 기록되어 보관된다.
</pre>


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
