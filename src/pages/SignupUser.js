import React, { useState } from "react";
import "./SignupUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupUser() {
  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  };

  //회원가입 요청
  const onSubmitHandler = () => {
    if (Id.length === 0 || Password.length === 0) {
      alert("ID와 비밀번호를 모두 입력해주세요");
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
    };

    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/join",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        //회원가입 완료 후 로그인페이지로 이동
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //중복검사
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
              onChange={onIdHandler}
              placeholder="ID"
            />
            <button onClick={onDuplicateCheckHandler}>중복 체크</button>
          </div>
          {/* 비밀번호 입력 칸 */}
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="Password"
          />
          {/* 비밀번호 확인 입력 칸 */}
          <input
            type="password"
            value={PasswordConfirm}
            onChange={onPasswordConfirmHandler}
            placeholder="Confirm Password "
          />
        </div>
        {/* 회원가입 신청 버튼 */}
        <div className="submit">
          <button type="submit" onClick={onSubmitHandler}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupUser;
