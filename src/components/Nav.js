import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const navigate = useNavigate();
  const user_id = JSON.parse(sessionStorage.getItem("user_id"));
  const user_artistname = JSON.parse(sessionStorage.getItem("user_artistname"));

  // 로그아웃 함수
  function logout() {
    axios 
      .request({
        method: "POST",
        url: "https://localhost:4000/api/user/logout",
        withCredentials: true,
      })
      .then((res) => {
        sessionStorage.clear(); // 세션 지우기
        //window.location.replace("/"); //메인화면으로 새로고침
        navigate("/")
        alert("로그아웃 되었습니다."); //로그아웃 알림창 띄우기
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="nav_link">
        {/* 삼항연산자 */}
        {user_artistname ? (
          <>
            <Link to="mypage1">
              <div>마이페이지</div>
            </Link>
            <button onClick={logout}>
              <div>로그아웃</div>
            </button>
          </>
        ) : user_id ? (
          <>
            <Link to="mypage2">
              <div>마이페이지</div>
            </Link>
            <button onClick={logout}>
              <div>로그아웃</div>
            </button>
          </>
        ) : (
          <>
            <Link to="login">
              <div>로그인</div>
            </Link>
            <Link to="signupChoice">
              <div>회원 가입</div>
            </Link>
          </>
        )}
      </div>
      <div className="nav_logo">
        <img
          alt="block in art logo image"
          onClick={() => navigate("/")}
          src="https://www.blockart.institute/wp-content/uploads/2018/10/blockart-logo.png"
        />
      </div>
    </div>
  );
}

export default Nav;
