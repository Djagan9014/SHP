import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../components/Item.css";
import { IndividualIntervalsExample } from "../components/Crousal";
import { StoreItem } from "../components/Item";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";

export function Home() {
  const navigate = useNavigate();
  const [items, setItem] = useState<any>([]);
  const [items1, setItem1] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [type, setType] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        await axios
          .get(`${BASE_URL}/api/items/categories/all`)
          .then((res) => {
          
            setCategories(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  useEffect(() => {
    categories.map((cat: any) => {
      setType(cat);
    });
  }, []);
  useEffect(() => {
    const fetchdata1 = async () => {
      let one = axios.get(`${BASE_URL}/api/items/categories/at/Furniture`);
      let two = axios.get(`${BASE_URL}/api/items/categories/at/Decorators`);
      try {
        await axios
          .all([one, two])
          .then(
            axios.spread((...res) => {
              setItem(res[0].data);
              setItem1(res[1].data);
            })
          )
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata1();
  }, []);
  return (
    <>
      <Navbar  className="me-auto category" variant="dark">
        {categories.map((category: any) => (
          <Nav.Item key={category}>
            <Nav.Link
              style={{ paddingRight: "30px" }}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                if ((e.target as HTMLButtonElement).innerText == "Furniture") {
                  window.scrollTo({
                    left: 0,
                    top: 330,
                    behavior: "smooth",
                  });
                } else if (
                  (e.target as HTMLButtonElement).innerText == "Decorators"
                ) {
                  window.scrollTo({
                    left: 0,
                    top: 700,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Navbar>
      
      <IndividualIntervalsExample />
      <div style={{ marginLeft: 0, paddingTop: "10px" }}>
        <div className="content">
          <h3 style={{ marginLeft: 20 }}>Furniture <Button onClick={()=>(navigate("/search?query=all&price=all&category=Furniture"))} variant="dark" style={{right:10,position:"absolute"}}>View All</Button></h3>
          <div
            className="card-wrapper"
            style={{ paddingTop: "20px", paddingLeft: "20px" }}
          >
            {items?.map((item: any) => (
              <StoreItem key={item._id} item={item} />
            ))}
          </div>
          <h3 style={{ marginLeft: 20 }}>Decorators <Button onClick={()=>(navigate("/search?query=all&price=all&category=Decorators"))} variant="dark" style={{right:10,position:"absolute"}}>View All</Button></h3>
          <div
            className="card-wrapper"
            style={{ paddingTop: "20px", paddingLeft: "20px" }}
          >
            {items1?.map((item: any) => (
              <StoreItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
