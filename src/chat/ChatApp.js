import React, { useState } from "react";
import axios from "axios";
import "./ChatApp.css";

const ChatApp = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim() || loading) return; // 🚀 이미 실행 중이면 중복 실행 방지

    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다!");
      return;
    }

    const newMessage = { type: "question", text: question };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);
    setQuestion(""); // 🚀 입력 필드 초기화 (중복 실행 방지)

    try {
      const response = await axios.post(
        "http://192.168.219.101:8090/api/v1/question",
        { q: question },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    if (e.key === "Enter" && !loading) { // 🚀 로딩 중이면 Enter 이벤트 실행 안 함
      e.preventDefault();
      handleSend();
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown} // 🚀 Enter 중복 입력 방지
          placeholder="질문을 입력해라냥 ~"
        />
        <button onClick={handleSend} disabled={loading}>보내기</button>
      </div>
    </div>
  );
};

export default ChatApp;
