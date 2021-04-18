import React from 'react';
import {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import ListCategories from './inc/ListCategories';
import Button from '@material-ui/core/Button';
import Dialog from './inc/Dialog';
const Category = () => {
    //Fetch categories 
    const [categories, setCategories] = useState([]);
    const [open , setOpen] = useState(false);

    useEffect(() => {
        fetchCategories(process.env.REACT_APP_BASE_URL, 'cat')
            .then(resolved => setCategories(resolved))
    }, []);

    const handleOpen  = () => {
        setOpen(true);
        console.log(open)
    };

    const fetchCategories = async (url: any, params: string) => {
        const _url: string = url + params;
        const request = await fetch(_url, {method: 'GET'});
        if (request.ok) {
            const response = await request.json();
            return Promise.resolve(response.data);
        } else {
            return Promise.reject([request, 'There is an error']);
        }
    };

    const addCategory = () => {

    };

    return (
        <>
        <ListCategories categories={categories}/>
        <Box mt={4}>
            <Button  onClick={handleOpen} variant={'outlined'}> Add  category </Button>
        </Box>
        <Dialog open={open} setOpen={setOpen}/>
        </>

    )
};
//Build a table to list categories
//Build a dialog component

export default Category;