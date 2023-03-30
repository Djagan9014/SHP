import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import dazn from "../dazn.jpeg";
import axios from "axios";
import { useState } from "react";
import "./Signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { log } from "console";
import { BASE_URL } from "../../helper";
export function Signup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [toasty, setToast] = useState(false);
  const [toasty1, setToast1] = useState(false);
  const [toasty2, setToast2] = useState(false);

  // let [result4, setToast4] = useState(true); 
  let [result11, setToast11] = useState(false);
  let [result21, setToast21] = useState(false);
  let [result31, setToast31] = useState(false);
  let [result41, setToast41] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [imag, setimag] = useState<any>();
  let [urn, seturn] = useState(false);
  
  let pattern1 = /^[a-zA-Z0-9]{5,10}$/;
  let result1 = pattern1.test(name);
  if (
    (document.getElementById("name") as HTMLInputElement) &&
    (document.getElementById("name1") as HTMLInputElement)
  ) {
    if (!result1) {
      (document.getElementById("name") as HTMLInputElement).style.color = "red";
    } else {
      (document.getElementById("name") as HTMLInputElement).style.color =
        "black";
    }
  }

  let pattern2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  let result2 = pattern2.test(password);
  if (
    (document.getElementById("password") as HTMLInputElement) &&
    (document.getElementById("password1") as HTMLInputElement)
  ) {
    if (!result2) {
      (document.getElementById("password") as HTMLInputElement).style.color =
        "red";
    } else {
      (document.getElementById("password") as HTMLInputElement).style.color =
        "Black";
    }
  }

  let pattern3 = /@./;
  let result3: boolean = pattern3.test(email);
  if (
    (document.getElementById("email") as HTMLInputElement) &&
    (document.getElementById("email1") as HTMLInputElement)
  ) {
    if (!result3) {
      (document.getElementById("email") as HTMLInputElement).style.color =
        "red";
    } else {
      (document.getElementById("email") as HTMLInputElement).style.color =
        "Black";
    }
  }


  // if (document.getElementById("confirmPassword") as HTMLInputElement) {
  //   if (password === confirmPassword) {
  //     setToast4(true);
  //     (
  //       document.getElementById("confirmPassword") as HTMLInputElement
  //     ).style.color = "Black";
  //   } else if (confirmPassword != "") {
  //     setToast4(false);
  //     (
  //       document.getElementById("confirmPassword") as HTMLInputElement
  //     ).style.color = "red";
  //   }
  // }

  // const sub = (e: any) => {
  //   e.preventDefault();
  //   console.log(imag);
  //   var f = new FormData();
  //   f.append("file", imag.name);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   axios
  //     .post(
  //       "/file/upload",
  //       {
  //         f,
  //       },
  //       config
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const filehandler = (event: any) => {
  //   setimag(event.target.files[0]);
  //   //setimag(URL.createObjectURL(event.target.files[0]));
  // };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (result1 && result2 && result3) {
      e.preventDefault();
      if (password != confirmPassword) {
        setToast(true);
        setToast41(true);
        setTimeout(() => {
          setToast41(false);
        }, 300);
        setTimeout(() => {
          setToast(false);
        }, 3000);



      } else {
        axios
          .post(`${BASE_URL}/api/users/signup`, {
            name,
            email,
            password,
          })
          .then((res) => {
            if (res.data.message == "user Already Present") {
              setToast1(true);
              setTimeout(() => {
                setToast1(false);
              }, 3000);
            } else if (res.data.name) {
              console.log(res.data.name);

              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log(result1)
      if(!result1){
        setToast11(true);
        setTimeout(() => {
          setToast11(false);
        }, 300);
      }
      if(!result2){
        setToast21(true);
        setTimeout(() => {
          setToast21(false);
        }, 300);
      }
      if(!result3){
        setToast31(true);
        setTimeout(() => {
          setToast31(false);
        }, 300);
      }
      // if(!result4){
      //   setToast41(true);
      //   setTimeout(() => {
      //     setToast41(false);
      //   }, 300);
      // }
      console.log(result11)
      setToast2(true);
      setTimeout(() => {
        setToast2(false);
      }, 3000);
    }
  };
  return (
    <Container className="  justify-content-center">
      <Form
        className="wrapper"
        style={{ width: "30vw" }}
        onSubmit={submitHandler}
      >
        <div className="logo">
          <img src={dazn} alt="" />
        </div>
        <Form.Group
          className={result1 || name == ""? "mt-3 form-field right": (result11 ? " mt-3 form-field wrong subb":" mt-3 form-field wrong")}
          controlId="name"
        >
          <span className="far fa-user"></span>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        {result1 || name == "" ? (
          ""
        ) : (
          <span style={{ color: "red", display: "block" }} id="name1">
            Name should be more than 4 characters and doesn't
            include special characters
          </span>
        )}

        <Form.Group
          className={result3 || email == "" ?"mt-3 form-field right": (result31 ? " mt-3 form-field wrong subb":" mt-3 form-field wrong")}
          controlId="email"
        >
          <span className="fa fa-envelope"></span>
          <input
            placeholder="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {result3 || email == "" ? (
          ""
        ) : (
          <span style={{ color: "red" }} id="email1">
            Email Should Contain "@" Symbol and data after it
          </span>
        )}

        <Form.Group
         className={result2 || password == "" ?"mt-3 form-field right": (result21 ? " mt-3 form-field wrong subb":" mt-3 form-field wrong")}
          controlId="password"
        >
          <span className="fas fa-key"></span>
          <input
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {result2 || password == "" ? (
          ""
        ) : (
          <span style={{ color: "Red" }} id="password1">
            Must contain at least one number and one uppercase &
            lowercase letter, and at least 8 or more characters
          </span>
        )}

        <Form.Group
         className={ (!toasty) || confirmPassword == "" ?"mt-3 form-field right": (result41 ? " mt-3 form-field wrong subb":" mt-3 form-field wrong")}
          controlId="confirmPassword"
        >
          <span className="fas fa-key"></span>
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* {result4 || confirmPassword == "" ? (
          ""
        ) : (
          <span style={{ color: "Red" }} id="cpassword1">
           Confirm Password Should be equal to password
          </span>
        )} */}

        <div className="mb-3">
          <Button type="submit" className="border-0">
            Register
          </Button>
        </div>
        <div className="mb-3">
          Already have an account?{" "}
          <Link to={`/login?redirect=${redirect}`}>Log In</Link>
        </div>
        {toasty ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            id="toa"
            role="alert"
          >
            <div className="toast-body">PassWord Dont Match</div>
          </div>
        ) : (
          ""
        )}
        {toasty1 ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            id="toa"
            role="alert"
          >
            <div className="toast-body">User Already Present</div>
          </div>
        ) : (
          ""
        )}
        {toasty2 ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            id="toa"
            role="alert"
          >
            <div className="toast-body">Fill All Fields Correctly</div>
          </div>
        ) : (
          ""
        )}
      </Form>

      {/* <form  >
        <div className='custom-file mb-3'>
          <input type="file" name="file" id="file"  onChange={filehandler}  className="custom-file-input" />
          <label htmlFor="file" className='custom-file-label'>Choose File</label>
        </div>
        <input type="submit" onClick={sub} value="Submit" className="btn btn-primary btnp-block" />
        <img src={imag} />
      </form> */}
    </Container>
  );
}
