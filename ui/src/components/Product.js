import { Card, Button } from "react-bootstrap";

export default function Product({ product }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product?.src} />
      <Card.Body>
        <Card.Title>{product?.title || "Default title"}</Card.Title>
        <Card.Text>{product?.description || "Default description"}</Card.Text>
        <Button variant="primary" disabled>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
}
