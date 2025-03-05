import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BodyContainer({ activeComponent }) {
  return (
    <Container 
      className="d-flex flex-column align-items-center justify-content-center" 
      style={{ backgroundColor: "white", height: "90vh", marginTop: "20px", marginBottom: "20px", overflowY: "auto"}}
    >
      {activeComponent}
    </Container>
  );
}

export default BodyContainer;
