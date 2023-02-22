import { Button, Card, ListGroupItem } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
type ProductProps = {
    _id: number;
    title: string;
    price: number;
    image: string;
    Description: string;
    prepy:any;
  };

export function ProductItem({ _id, title, price, image,Description }: ProductProps){
    return(
        <>
            <div className="card" style={{height:"50vh" ,flexDirection:"row-reverse"}}>
                <img src={image} style={{width:"70vw"}} className="card-img-top" alt="..." />
                <div className="card-img-overlay center" style={{color:"white",backgroundImage: "linear-gradient(to right,black,black,transparent, transparent)",paddingTop:"100px",paddingLeft:"50px"}}>
                <h1 className="card-title">{title}</h1>
                <p className="card-text" style={{width:"30vw"}}>{Description}</p>
                <p className="card-text"> &#8377;{price}</p>
                </div>
            </div>
            
         

        </>
    )
}


