import React, { useState } from "react";
import "./SignupUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupUser() {
  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onSubmitHandler = () => {
    //유효성 검사
    if (
      Id.length === 0 ||
      Password.length === 0 ||
      Name.length === 0 ||
      Birth.length === 0
    ) {
      alert("정보를 모두 입력해주세요");
      return;
    } else if (Birth.length !== 6) {
      alert("생년월일을 6자리 형식으로 입력해 주세요.  ex)950123");
      return;
    }

    //비밀번호 유효성 검사
    if (Password !== PasswordConfirm) {
      alert("비밀번호 확인을 다시 입력해 주세요");
      return;
    }

    let body = {
      user_id: Id,
      user_pass: Password,
      user_name: Name,
      user_birth: Birth,
    };

    //회원가입 요청
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/join",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        alert("회원가입이 완료되었습니다. 로그인 해 주세요.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //중복 체크
  const onDuplicateCheckHandler = () => {
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/checkId",
        data: { user_id: Id },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.message;
        if (data === "already in use") {
          alert("이미 사용중인 아이디입니다.");
        } else {
          alert("사용 가능한 아이디입니다.");
          setBtnDisabled(false);
        }
      });
  };
  return (
    <div className="signup_user">
      <div className="form_container">
        <div className="title">회원 가입</div>
        <div className="inputs">
          <div>
            {/* 아이디 입력 칸 */}
            <input
              type="text"
              value={Id}
              onChange={(e) => {
                setId(e.currentTarget.value);
                setBtnDisabled(true); //추가로 입력하면 다시 가입하기 버튼 비활성화
              }}
              placeholder="ID"
            />
            <button onClick={onDuplicateCheckHandler}>중복 체크</button>
          </div>
          <div>
            <div className="duplicateCheck-ment">
              중복체크가 되어야 가입하기 버튼이 활성화 됩니다.
            </div>
          </div>
          {/* 비밀번호 입력 칸 */}
          <input
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="Password"
          />
          {/* 비밀번호 확인 입력 칸 */}
          <input
            type="password"
            value={PasswordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.currentTarget.value);
            }}
            placeholder="Confirm Password "
          />
          {/* 이름 입력 칸 */}
          <input
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            placeholder="실제 본인 실명"
          />
          {/* 생년월일 입력 칸 */}
          <input
            type="number"
            value={Birth}
            onChange={(e) => {
              setBirth(e.currentTarget.value);
            }}
            placeholder="생년월일 6자리"
          />
        </div>
        {/* 회원가입 신청 버튼 */}
        <div className="submit">
          <button
            type="submit"
            onClick={onSubmitHandler}
            disabled={btnDisabled}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupUser;
