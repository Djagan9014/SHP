import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function EditUsers() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        //console.log(res.data)
        setName(res.data.name);
        setEmail(res.data.email);
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sub = () => {
    axios
      .put(`/api/users/${id}`, { _id: id, name, email, isAdmin })
      .then((res) => {

        navigate("/users");
        Swal.fire("User Updated Successfully");
      })
      .catch((err) => console.log(err));

    navigate("/users");
  };

  return (
    <Container>
      <Form className="wrapper" style={{ width: "30vw" }}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          type="checkbox"
          id="isAdmin"
          label="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <Button type="submit" onClick={sub}>
          Update
        </Button>
      </Form>
    </Container>
  );
}
