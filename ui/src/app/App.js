import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import React from "react";

export default function App(props) {
  const [products, setProducts] = React.useState([]);

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
  console.log("pro", products);
  return (
    <Container>
      <Row>
        <Col>
          {products &&
            products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
        </Col>
      </Row>
    </Container>
  );
}
