import axios from "axios";
import { log } from "console";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { StoreItem } from "../components/Item";
import "./SearchScreen.css"
import { BASE_URL } from "../helper";

export function Search() {
  const { search } = useLocation();
  const [items, setitems] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const seap = new URLSearchParams(search);
  const query = seap.get("query") || "all";
  const price = seap.get('price') || 'all';
  const category = seap.get('category') || 'all';

  const prices = [
    {
      name: "1/- to 5000/-",
      value: "1-5000",
    },
    {
      name: "5000/- to 10000/-",
      value: "5000-10000",
    },
    {
      name: "10000/- to 20000/-",
      value: "10000-20000",
    },
  ];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/items/search/sea?query=${query}&price=${price}&category=${category}`)
      .then((res) => {
        console.log(res.data.items);
        setitems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query,price,category]);

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


  const getFilterUrl = (filter:any) =>{
      const filterQuery = filter.query || query;
      const filterPrice = filter.price || price;
      const filtercategory = filter.category || category;
      return `/search?query=${filterQuery}&price=${filterPrice}&category=${filtercategory}`;
  }
  return (
    <div className="search-box">
      <Row>
        <Col md={2}>
          <div>
            <h2>Category</h2>
            <ul>
              <li>
                <Link to={getFilterUrl({category: "all"})}  className={"all"===category?"after":"before"}>
                  ALL
                </Link>
              </li>
              {categories.map((cat:any)=>(
                <li key={cat}>
                  <Link to={getFilterUrl({category: cat})} className={cat===category?"after":"before"}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Prices</h2>
            <ul>
              <li>
                <Link to={getFilterUrl({price: "all"})} className={"all"===price?"after":"before"}>
                  ALL
                </Link>
              </li>
              {prices.map((p:any)=>(
                <li key={p.name}>
                   <Link to={getFilterUrl({ price: p.value })} className={p.value===price?"after":"before"}>
                        {p.value}
                   </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={10}>
        <div className="card-wrapper">
          <Row>
            {items.map((item: any) => (
              <Col key={item._id} sm={6} md={4} lg={3}>
                <StoreItem item={item}  />
              </Col>
            ))}
          </Row>
        </div>
        </Col>
      </Row>
    </div>
  );
}
