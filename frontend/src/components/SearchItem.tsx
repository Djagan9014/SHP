import { Button, FormControl, InputGroup } from 'react-bootstrap';
import "./Item.css"
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';
import {  useNavigate } from 'react-router-dom';
export function SearchItem() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search' );
    }
    return(
        <Form onSubmit={submitHandler}>
            <InputGroup>
            <FormControl
            className='sea-0'
            type="text"
            name="q"
            id="q"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="search products...."
            />
            <Button className='sea  btn btn-dark' type="submit">
                <i className='fas fa-search'></i>
            </Button>
            </InputGroup>
        </Form>
    )
}