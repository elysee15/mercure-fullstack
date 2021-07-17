import { Card, Button } from "react-bootstrap";

export default function Product(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.src} />
      <Card.Body>
        <Card.Title>{props.title || "Default title"}</Card.Title>
        <Card.Text>{props.description || "Default description"}</Card.Text>
        <Card.Text>{props.author || "Default author"}</Card.Text>
        <Button variant="primary">Default value</Button>
      </Card.Body>
    </Card>
  );
}
