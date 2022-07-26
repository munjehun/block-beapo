import React from "react";
import "./SignupChoice.css";
import { useNavigate } from "react-router-dom";

function SignupChoice() {
  const navigate = useNavigate();

  return (
    <div className="signup_choice">
      <div className="form_container">
        <div className="title">Choice User Type</div>
        <div className="submit">
          <button onClick={() => navigate("/signupPainter")}>
            작가 사용자
          </button>
          <button onClick={() => navigate("/signupUser")}>일반 사용자</button>
        </div>
      </div>
    </div>
  );
}

export default SignupChoice;
