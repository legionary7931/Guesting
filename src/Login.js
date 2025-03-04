import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo1 from './assets/Logo1.png'; // 이미지 파일 import

export default function Login() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img src={logo1} alt="Logo" className="mb-1" style={{ width: "360px", height: "auto" }} />
      <Form className="p-4 shadow-lg rounded" style={{ backgroundColor: "#ffffff", width: "350px" }}>
        <h3 className="text-center mb-4 text-primary">Welcome Back</h3>
        {/* ID 입력 필드 */}
        <Form.Group as={Row} className="mb-3" controlId="formBasicText">
          <Form.Label column sm={3} className="fw-bold">ID</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" placeholder="Enter ID" className="p-2 border rounded-3" />
          </Col>
        </Form.Group>

        {/* 비밀번호 입력 필드 */}
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={3} className="fw-bold">Password</Form.Label>
          <Col sm={9}>
            <Form.Control type="password" placeholder="Enter Password" className="p-2 border rounded-3" />
          </Col>
        </Form.Group>

        {/* 로그인 버튼 */}
        <Button as={Link} to="/" className="w-100 btn btn-danger mt-3">
          로그인
        </Button>
      </Form>
    </Container>
  );
}