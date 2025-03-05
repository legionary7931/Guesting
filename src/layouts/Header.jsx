import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
          <Link to="/team/create">팀 생성</Link>
          <Link to="/team/applications">신청 목록 조회</Link>
          <Link to="/team/guesting">게스팅 신청</Link>
      </nav>
    </header>
  );
}

export default Header;
