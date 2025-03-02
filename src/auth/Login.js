import React, { useState } from "react";
import axios from "axios";
import './Login.css';  // CSS 파일 임포트

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 관리할 상태 추가

  const handleLogin = async () => {
    try {
      const response = await axios.post("/roo/auth/login", {
        id,
        password,
      });

      // 로그인 성공 시 토큰을 localStorage에 저장
      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token;
        localStorage.setItem("token", token); // 토큰 저장
        alert("로그인 성공!");
        // 로그인 후 대시보드 페이지로 이동
        window.location.href = "/dashboard"; // '/dashboard' 페이지로 이동
      } else {
        setErrorMessage("로그인 정보가 잘못되었습니다.");
      }
    } catch (error) {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  // 엔터 키를 눌렀을 때 로그인 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작 방지 (폼 제출 방지)
      handleLogin(); // 로그인 함수 호출
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>JeongIn's World !</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 */}
        <div className="input-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}  // Enter 키 이벤트 처리
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">PW</label>
          <input
            type="password"
            id="password"
            placeholder="Enter PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}  // Enter 키 이벤트 처리
          />
        </div>
        <button onClick={handleLogin} className="login-btn">Sign In</button>
      </div>
    </div>
  );
};

export default Login;
