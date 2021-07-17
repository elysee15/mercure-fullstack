import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";

export default function App(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Product />
        </Col>
      </Row>
    </Container>
  );
}
