import React from "react";
import { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const accesstoken = (localStorage.getItem("accessToken"));
  const handleOnClickLogin = (id) => {
    navigate("/login");
  }; 

  const handleOnClickRegister = (id) => {
    navigate("/register");
  }; 

  useEffect(() => {
    if (!accesstoken) {
      navigate('/login')
    } 
  }, [])
  return (
    <div>
      Home
      <button style={{marginRight: 50, marginLeft:100}} className="btn btn-primary" onClick={handleOnClickLogin}>Đăng Nhập</button>
      <button className=" btn btn-primary" onClick={handleOnClickRegister}>Đăng Kí</button>
    </div>
  );

}
