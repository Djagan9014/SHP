import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProductItem } from "../components/ProductItem";
export function Product(){
    const [items, setItem] = useState<any>([]);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`/api/items/${id}`).then((res)=>{setItem(res.data)
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