import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // token 제거
    navigate("/"); // 로그인 페이지로 이동
  };

  const handleMenuClick = (menu) => {
    if (menu === "Roo ChatBot") {
      navigate("/chat");
    } else if (menu === "Roo 앨범") {
      navigate("/album");
    } else if (menu === "Roo Infomations") {
      navigate("/info");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="title">JeongIn's World!</h1>

      {/* 로그아웃 버튼 */}
      <button onClick={handleLogout} className="logout-btn">☓</button>

      <div className="menu-container">
        <button onClick={() => handleMenuClick("Roo ChatBot")} className="menu-btn">
          Roo ChatBot
        </button>
        <button onClick={() => handleMenuClick("Roo 앨범")} className="menu-btn">
          Roo 앨범
        </button>
        <button onClick={() => handleMenuClick("Roo Infomations")} className="menu-btn">
          Roo Infomations
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
