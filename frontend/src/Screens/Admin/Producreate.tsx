import "../pro.css";
import dazn from "../dazn.jpeg";
import axios from "axios";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import Swal from "sweetalert2";
export function Producreate() {
  const [item, setItem] = useState<any>({ title: "", image: "",category:"", price: "",Description:"",countInStock:""});
  const [items, setItems] = useState<any>([]);
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const result = await axios
      .post("/api/items/", item)
      .then((res) => {
        console.log(res);
        Swal.fire("product Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    setItems([...items, result]);
    setItem({ title: "", image: "",category:"", price: "",Description:"",countInStock:"" });
  };

  console.log(item.title);

  return (
    <div className="wrapper" style={{ width: "30vw" }}>
      <div className="logo">
        <img src={dazn} alt="" />
      </div>
      <div className="text-center mt-4 name">Dazn</div>
      <form action="" onSubmit={onSubmitHandler} className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            className="input-field"
            value={item.title}
            placeholder="Product Name"
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fa fa-file-image-o"></span>
          <input
            type="number"
            className="input-field"
            value={item.price}
            placeholder="Product Price"
            onChange={(e) => setItem({ ...item, price: e.target.value })}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <input type="text" 
          className="input-field" 
          value={item.category}
          placeholder="Product Category" 
          onChange={(e)=>{setItem({...item, category: e.target.value})}} />
        </div>
        <div className="form-field d-flex align-items-center">
          <input
            type="number"
            className="input-field"
            value={item.countInStock}
            placeholder="Product Stock"
            onChange={(e) => setItem({ ...item, countInStock: e.target.value })}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <input type="text" 
          className="input-field" 
          value={item.Description}
          placeholder="Product Description" 
          onChange={(e)=>{setItem({...item, Description: e.target.value})}} />
        </div>
        <div className="form-field d-flex align-items-center">
          <FileBase64
            className="form-field d-flex align-items-center"
            type="file"
            multiple={false}
            onDone={({ base64 }: any) => {
              setItem({ ...item, image: base64 });
            }}
          />
        </div>

        <button className="btn mt-3">Add Product</button>
      </form>
    </div>
  );
}
