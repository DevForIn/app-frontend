import React, { useState } from "react";
import axios from "axios";
import './Login.css';  // CSS 파일 임포트

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 관리할 상태 추가
  

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8090/auth/login", {
        id,
        password,
      });

      // 로그인 성공 시 토큰을 localStorage에 저장
      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token;
        localStorage.setItem("token", token); // 토큰 저장
        alert("로그인 성공!");
        // 로그인 후 채팅 페이지로 이동
        window.location.href = "/chat"; // 예시로 '/chat' 페이지로 이동
      } else {
        setErrorMessage("로그인 정보가 잘못되었습니다.");
      }
    } catch (error) {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 */}
        <div className="input-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-btn">로그인</button>
      </div>
    </div>
  );
};

export default Login;
