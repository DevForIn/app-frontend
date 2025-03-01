import React, { useState } from "react";
import axios from "axios";
import "./ChatApp.css";

const ChatApp = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다!");
      return;
    }

    // 1. 질문 추가 (보내기 전에 화면에 나타날 수 있도록)
    const newMessage = { type: "question", text: question };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);
    setQuestion(""); // 질문 입력란 초기화

    try {
      const response = await axios.post(
        "http://192.168.219.101:8090/api/v1/question",
        { q: question },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. AI의 답변 추가 (로딩 끝난 후)
      const answerMessage = { type: "answer", text: response.data.data };
      setMessages((prevMessages) => [...prevMessages, answerMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "answer", text: "오류 발생! 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 기본 동작 방지 (줄 바꿈 방지)
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">🐱 Roo AI Chat!</h1>

      <div className="chat-box">
        {/* 메시지들이 쌓이는 영역 */}
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

        {/* 로딩 중 회전하는 원 표시 */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className="input-area">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
          placeholder="질문을 입력해라냥 ~"
        />
        <button onClick={handleSend}>보내기</button>
      </div>
    </div>
  );
};

export default ChatApp;
