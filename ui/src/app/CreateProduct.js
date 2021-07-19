import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";

export default function CreateProduct(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescripition] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    axios
      .post("http://localhost:3500/products", data, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("__TOKEN__"),
        },
      })
      .then((response) => {
        setProduct(response.data);

        history.push("/app");
      })
      .catch((error) => {
        console.error("[CreateProduct] ", error.message);
      });
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
