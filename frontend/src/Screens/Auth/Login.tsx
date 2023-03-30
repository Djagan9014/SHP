import dazn from "../dazn.jpeg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helper";

export function Login() {
  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [toastify1, settoastify1] = useState(false);
  let [toastify2, settoastify2] = useState(false);

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/users/signin`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        if (res.data.name) {
          console.log(res);
          localStorage.setItem("HasUser", res.data.name);
          if (res.data.isAdmin === true) {
            localStorage.setItem("isAdmin", res.data.isAdmin);
          }
          navigate("/");
          window.location.reload();
        } else if (res.data.message == "Invalid User") {
          console.log("Invalid User");
          settoastify2(true);
          setTimeout(() => {
            settoastify2(false);
          }, 2000);
        } else if (res.data.message == "Invalid Password") {
          console.log("Invalid Password");
          settoastify1(true);
          setTimeout(() => {
            settoastify1(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="wrapper" style={{ width: "30vw" }}>
      <div className="logo">
        <img src={dazn} alt="" />
      </div>
      {/* <div className="text-center mt-4 name">Dazn</div> */}
      <form className="p-3 mt-3" onSubmit={HandleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="fa fa-envelope"></span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-field d-flex align-items-center" id="password">
          <span className="fas fa-key"></span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
        </div>

        <button className="btn mt-3">Login</button>
      </form>
      <div className="text-center fs-6">
        Not Have An Account? <Link to={`/signup`}>Sign Up</Link>
      </div>
      {toastify1 ? (
        <div
          className="alert alert-warning alert-dismissible fade show "
          role="alert"
        >
          <div className="toast-body">Wrong Password</div>
        </div>
      ) : (
        ""
      )}
      {toastify2 ? (
        <div
          className="alert alert-warning alert-dismissible fade show "
          role="alert"
        >
          <div className="toast-body">User Not Found</div>
        </div>
      ) : (
        ""
      )}
    </div>

    //   <Container className=" small-containr d-flex justify-content-center" style={{ marginTop:'100px'}}>
    //     <Image style={{marginRight:'250px',height:400,width:400}}
    //     src={dazn}

    //   />
    //   <Form onSubmit={HandleSubmit}>
    //     <h1>Log In</h1>
    //     <br></br>
    //     <Form.Group className="mb-3" controlId="email">
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control
    //         type="email"
    //         required
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         required
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     <div className="mb-3">
    //       <Button  type="submit"  className="border-0">Log in</Button>
    //     </div>
    //     {toastify1?<div className='alert alert-warning alert-dismissible fade show ' role="alert"><div className='toast-body'>Wrong Password</div></div>:""}
    //     {toastify2?<div className='alert alert-warning alert-dismissible fade show ' role="alert"><div className='toast-body'>User Not Found</div></div>:""}

    //   </Form>
    // </Container>
  );
}
