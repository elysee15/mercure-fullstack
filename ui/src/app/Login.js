import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleUsernameChange = ({ target }) => setUsername(target.value);

  const handlePasswordChange = ({ target }) => setPassword(target.value);
  const handleSignInClick = (e) => {
    e.preventDefault();
    const data = { name: username, password };
    axios
      .post("http://localhost:3500/users/login", data)
      .then(async (response) => {
        await window.localStorage.setItem("__TOKEN__", response.data.jwt);
        await window.localStorage.setItem(
          "__USER__",
          JSON.stringify(response.data.user)
        );

        history.push("/app");
      })
      .catch((error) => {
        console.error("[Login]", error.message);
      });
  };

  return (
    <div
      className="row container col-lg-3 col-sm-12 mx-auto"
      style={{ minHeight: "100vh" }}
    >
      <Form className="my-auto" onSubmit={handleSignInClick}>
        <h1>Connexion</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le nom d'utilisateur"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Se connecter
        </Button>
        <div>
          <Link to="/signin">Inscription</Link>
        </div>
      </Form>
    </div>
  );
}
