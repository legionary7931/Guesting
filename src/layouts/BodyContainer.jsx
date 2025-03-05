import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BodyContainer({ activeComponent }) {
  return (
    <Container 
      className="d-flex flex-column align-items-center justify-content-center" 
      style={{ backgroundColor: "white", height: "60vh", marginTop: "20px" }}
    >
      {activeComponent}
    </Container>
  );
}

export default BodyContainer;
