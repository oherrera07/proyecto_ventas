import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardButton() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
      onClick={goToDashboard}
      
    >
      Inicio
    </button>
  );
}
