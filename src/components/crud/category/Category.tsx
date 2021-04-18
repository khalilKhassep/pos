import React from 'react';
import {useState, useEffect} from 'react';
import ListCategories from './inc/ListCategories';
import Button from '@material-ui/core/Button';

const Category = () => {
    //Fetch categories 
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories(process.env.REACT_APP_BASE_URL, 'cat')
            .then(resolved => setCategories(resolved))
    }, []);

    const fetchCategories = async (url: any, params: string) => {
        const _url: string = url + params;
        const request = await fetch(_url, {method: 'GET'});
        if (request.ok) {
            const response = await request.json();
            return Promise.resolve(response.data);
        } else {
            return Promise.reject([request, 'There is an error']);
        }
    }

    return (
        <>
        <ListCategories categories={categories}/>
        <Button variant={'outlined'}> Add new category </Button>
        </>

    )
};
//Build a table to list categories
//Build a dialog component

export default Category;