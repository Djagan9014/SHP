import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  let par: any = localStorage.getItem("userInfo");
  par = JSON.parse(par);
  const [_id, setid] = useState(par._id);
  const [name, setName] = useState(par.name);
  const [email, setEmail] = useState(par.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (event: any) => {
    event.preventDefault();
    console.log("hiii");
    await axios
      .patch("/api/users/profile", { _id, name, email, password })
      .then((res) => {
        //console.log(res);
        localStorage.setItem("HasUser", res.data.name);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="wrapper"
      style={{ width: "40vw" }}
    >
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <div className="mb-3">
        <Button type="submit">Update</Button>
      </div>
    </Form>
  );
}
