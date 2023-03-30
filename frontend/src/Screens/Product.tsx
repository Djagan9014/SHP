import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProductItem } from "../components/ProductItem";
import { BASE_URL } from "../helper";
export function Product(){
    const [items, setItem] = useState<any>([]);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`${BASE_URL}/api/items/${id}`).then((res)=>{setItem(res.data)
        }).catch((err)=>{console.log(err);
        })
    } 
        ,[])
    return(
        <>
        <ProductItem key={items._id} {...items} />
        </>
    )
}