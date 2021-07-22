import { Container, Row, Col, Nav, Button, Badge } from "react-bootstrap";
import Product from "../components/Product";
import React from "react";
import { Link } from "react-router-dom";
import { useNotificationCounter } from "../context/notification";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../store/constants/actionTypes";

export default function App(props) {
  // const [products, setProducts] = React.useState([]);
  const [userInfo] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("__USER__"));
  });
  const products = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();
  const [counter] = useNotificationCounter();

  React.useEffect(() => {
    dispatch({ type: types.FETCH_PRODUCT });
  }, [dispatch]);

  return (
    <Container className="pt-5">
      <Nav className="border p-2 mb-2">
        <Nav.Item>
          <h3>Bienvenue {userInfo?.name.toUpperCase()}</h3>
        </Nav.Item>
        <Nav.Item className="" style={{ marginLeft: "auto" }}>
          <Button variant="danger" style={{ marginRight: "12px" }}>
            Notification <Badge bg="success">{counter}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
          <Link to="/create">
            <Button variant="secondary" type="submit">
              Ajouter un produit
            </Button>
          </Link>
        </Nav.Item>
      </Nav>
      {isLoading && <div>Chargement des donnée</div>}
      {!isLoading && (
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </Container>
  );
}
