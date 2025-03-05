import { React, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo1 from "../assets/Logo1.png"; // 이미지 파일 import

export default function Login() {
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("📤 Sending request:", JSON.stringify(credentials, null, 2));

    const requestBody = {
      id: Number(credentials.id),
      password: credentials.password,
    };

  console.log("📤 Sending request:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공!");
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류!");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img
        src={logo1}
        alt="Logo"
        className="mb-3"
        style={{ width: "360px", height: "auto" }}
      />
      
      {/* 로그인 폼 */}
      <Form
        className="p-4 shadow-lg rounded"
        style={{ backgroundColor: "#ffffff", width: "350px" }}
        onSubmit={handleLogin}
      >
        <h3 className="text-start fw-bold mb-4 " style={{ color: "#ef66a5" }}>
        Welcome Back!
        </h3>
        {/* ID 입력 필드 */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="fw-bold d-block text-start">ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            placeholder="Enter ID"
            className="p-2 border rounded-3"
            value={credentials.id}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 비밀번호 입력 필드 */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold d-block text-start">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            className="p-2 border rounded-3"
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          className="w-100 mt-3"
          style={{ backgroundColor: "#ef66a5", borderColor: "#ef66a5" }}
        >
          로그인
        </Button>
      </Form>
    </Container>
  );
}
