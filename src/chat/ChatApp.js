import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./ChatApp.css";

const ChatApp = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 환경 변수에서 API 주소 가져옴
  const API_BASE_URL = process.env.REACT_APP_API_URL; 

  const handleSend = async () => {
    if (!question.trim()) return;
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");  // 
      return;  // 로그인 안 된 경우, 함수 종료
    }
  
    if (loading) return; // 이미 요청 중이라면 함수 종료 (중복 요청 방지)
  
    setLoading(true); // 로딩 상태 시작
  
    // 1. 질문을 화면에 보여주기
    const newMessage = { type: "question", text: question };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    // 2. 전송 후 입력 필드 비우기 (이 부분을 맨 마지막에 처리)
    setQuestion(""); // 입력란을 즉시 비움
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/question`,
        { q: question },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // 3. AI의 답변을 메시지에 추가
      const answerMessage = { type: "answer", text: response.data.data };
      setMessages((prevMessages) => [...prevMessages, answerMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "answer", text: "오류 발생! 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 기본 동작 방지 (줄 바꿈 방지)
      handleSend(); // 질문 전송
    }
  };
  
  
  

  return (
    <div className="chat-container">
      <h1 className="chat-title">🐱 Roo AI Chat!</h1>

      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${message.type}`}
              style={{
                animation: message.type === "question" ? "slideUp 0.5s" : "fadeIn 1s",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      <div className="input-area">
        <textarea
          value={question} // 입력된 텍스트
          onChange={(e) => setQuestion(e.target.value)} // 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
          placeholder="질문을 입력해라냥 ~"
        />
        <button onClick={handleSend} disabled={loading}>
          보내기
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
