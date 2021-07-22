import { Card, Button } from "react-bootstrap";

export default function Product({ product }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product?.src} />
      <Card.Body>
        <Card.Title>{product?.title || "N/D"}</Card.Title>
        <Card.Text>{product?.description || "N/D"}</Card.Text>
        <Button variant="primary" disabled>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
}
