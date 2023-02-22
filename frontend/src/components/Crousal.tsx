import Carousel from 'react-bootstrap/Carousel';
import something from "./images/sofa.jpg";
import sec from "./images/sec.jpg";
import third from "./images/third.jpg";
import "./Footer.css"
export function IndividualIntervalsExample() {
  return (
    <Carousel style={{height:300,marginTop:"50px",paddingLeft:"10px",paddingRight:"", marginBottom:"10px"}}>

      <Carousel.Item interval={400} style={{height:300}}> 
        <div>
        <img
         
          className="w-100"
          src={something}
          alt="First slide"
          width={100}
          height={300}
        />
        </div>
        <Carousel.Caption>
          <h3>Sofa</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={400} style={{height:300}}>
        <img
          className="w-100"
          src={sec}
          alt="Second slide"
          width={100}
          height={300}
        />
        <Carousel.Caption>
          <h3>TV</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={400} style={{height:300}}>
        <img
          className=" w-100"
          src={third}
          alt="Third slide"
          width={100}
          height={300}
        />
        <Carousel.Caption>
          <h3>Table</h3>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}





