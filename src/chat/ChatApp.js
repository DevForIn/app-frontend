import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./ChatApp.css";

const ChatApp = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!question.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);

    const newMessage = { type: "question", text: question };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setQuestion("");

    try {
      const response = await axios.post("/api/v1/question",
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
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // 뒤로가기 버튼 클릭 시 대시보드로 이동
  const handleBack = () => {
    navigate("/dashboard"); // 대시보드로 이동
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">🐱 Roo AI Chat!</h1>

      {/* 뒤로가기 버튼 */}
      <button onClick={handleBack} className="back-btn"><h3>◀︎</h3></button>

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
          onKeyDown={handleKeyDown}
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
