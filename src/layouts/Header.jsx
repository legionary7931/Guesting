import { Navbar, Nav, Button, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="lg" className="shadow" style={{ backgroundColor: "#EF66A5" }}>
      <Container>
        <Nav className="ms-auto d-flex gap-3">
          <Button
            style={{
              backgroundColor: "#ef66a5",
              borderColor: "#ef66a5",
              fontSize: "14px",
              padding: "5px 10px",
            }}
          >
            팀 생성
          </Button>
          <Button
            style={{
              backgroundColor: "#ef66a5",
              borderColor: "#ef66a5",
              fontSize: "14px",
              padding: "5px 10px",
            }}
          >
            신청 목록 조회
          </Button>
          <Button
            style={{
              backgroundColor: "#ef66a5",
              borderColor: "#ef66a5",
              fontSize: "14px",
              padding: "5px 10px",
            }}
          >
            게스팅 신청
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
