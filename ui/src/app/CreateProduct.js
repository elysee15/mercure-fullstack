import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function CreateProduct(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescripition] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    console.log(data);
  };

  return (
    <Container className="col-lg-6">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titre du produit</Form.Label>
          <Form.Control
            type="text"
            placeholder="titre du produit"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={({ target }) => setDescripition(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="text"
            placeholder="prix"
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Créer
        </Button>
      </Form>
    </Container>
  );
}
