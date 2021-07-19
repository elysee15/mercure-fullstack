import { Container, Row, Col, Nav, Button, Badge } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const useEventSource = (url, withCredentials, topic = "") => {
  // const [data, setEvent] = React.useState(null);
  // const [status, setStatus] = React.useState("closed");
  // const source = React.useRef(null);
  // const _url = new URL(url);
  // _url.searchParams.append("topic", topic);
  // const eventSource = new EventSource(_url, {
  //   withCredentials,
  // });
  // source.current = eventSource;
  // eventSource.onmessage = (event) => {
  //   console.log("[EventSource]", event, "Un nouveau message est arrivé");
  //   setEvent(event.data);
  // };
  // eventSource.onerror = (error) => {
  //   console.error("[EventSource] ", error);
  //   setStatus("error");
  // };
  // eventSource.onopen = (ev) => {
  //   console.log("[EventSource]", "Une connexion a été ouverte");
  //   setStatus("opened");
  // };
  // return [data, status];
};

export default function App(props) {
  const [products, setProducts] = React.useState([]);
  const [userInfo] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("__USER__"));
  });

  React.useEffect(() => {
    axios
      .get("http://localhost:3500/products", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("__TOKEN__"),
        },
      })
      .then((response) => {
        const data = response.data.map((item) => {
          const oldId = item._id;
          item["id"] = oldId;
          delete item._id;
          delete item.__v;
          return item;
        });
        setProducts(data);
      })
      .catch((error) => {
        console.error("[App] useEffect:", error.message);
      });
  }, []);

  return (
    <Container className="pt-5">
      <Nav className="border p-2 mb-2">
        <Nav.Item>
          <h3>Bienvenue {userInfo?.name.toUpperCase()}</h3>
        </Nav.Item>
        <Nav.Item className="" style={{ marginLeft: "auto" }}>
          <Button variant="danger" style={{ marginRight: "12px" }}>
            Notification <Badge bg="success">0</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
          <Link to="/create">
            <Button variant="secondary" type="submit">
              Ajouter un produit
            </Button>
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        {products &&
          products.map((product) => {
            return (
              <Col key={product.id}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
