import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const user_id = JSON.parse(sessionStorage.getItem("user_id"));

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  useEffect(() => {
    //로그인 돼 있으면 로그인페이지 진입 못하게
    if (user_id) {
      console.log("이미 로그인 되었습니다.");
      navigate("/");
    }
    return () => {};
  }, []);

  const onSubmitHandler = () => {
    if (Id.length === 0 || Password.length === 0) {
      alert("ID와 비밀번호를 모두 입력해주세요");
      return;
      //return이 있어야 로그인요청으로 더이상 진행 안됨.
      //없으면 alert띄우고 로그인 진행돼버림.
    }
    let body = {
      user_id: Id,
      user_pass: Password,
    };

    //로그인 요청
    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/login",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        alert("로그인 되었습니다.");
        const user = res.data.data; //로그인하면 받는 유저 정보

        sessionStorage.setItem("user_id", JSON.stringify(user.user_id));
        sessionStorage.setItem(
          "user_artistname",
          JSON.stringify(user.user_artistname)
        );
        //sessionStorage를 이용해서 로그인후 받은 data를 세션스토리지에 저장
        //JSON.stringify화 해야 [object Object] 로 저장 안됨

        const user_id = JSON.parse(sessionStorage.getItem("user_id"));
        const user_artistname = JSON.parse(
          sessionStorage.getItem("user_artistname")
        );
        // string화 시킨 것을 다시 json화

        // console.log(user_id);
        // console.log(user_artistname);

        //로그인 완료 후 메인으로 가기
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("등록되지 않은 계정입니다.");
      });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  return (
    <div className="login">
      <div className="form_container">
        <div className="title">Login</div>
        <form className="inputs">
          <input type="id" value={Id} onChange={onIdHandler} placeholder="ID" />
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="Password"
            onKeyPress={onKeyPress}
          />
        </form>
        <div className="submit">
          <button type="submit" onClick={onSubmitHandler}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
