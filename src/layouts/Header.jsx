import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Create from "../pages/Create";
import Application from "../pages/Application";
import Guesting from "../pages/Guesting";

function Header({ setActiveComponent }) {
  return (
    <Navbar expand="lg" className="shadow" style={{ backgroundColor: "#EF66A5" }}>
      <Container>
        <Nav className="justify-content-center w-100 d-flex gap-3">
          <h2 style={{ color: "white", marginLeft: "-10px" }}>Guesting</h2>
          <Button
            onClick={() => setActiveComponent(<Create />)}
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
            onClick={() => setActiveComponent(<Application />)}
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
            onClick={() => setActiveComponent(<Guesting />)}
            style={{
              backgroundColor: "#ef66a5",
              borderColor: "#ef66a5",
              fontSize: "14px",
              padding: "5px 10px",
            }}
          >
            게스팅 신청
          </Button>
          <Nav className="ms-auto"> {/* ms-auto로 오른쪽 정렬 */}
            <Button
              style={{
                backgroundColor: "#ef66a5",
                borderColor: "#ef66a5",
                fontSize: "14px",
                padding: "5px 10px",
              }}
            >
              Mypage
            </Button>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

