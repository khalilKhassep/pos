import React from 'react';
import {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import ListCategories from './inc/ListCategories';
import Button from '@material-ui/core/Button';
import Dialog from './inc/Dialog';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');

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
    };

    const addCategory = () => {
        setAction('new');
        setOpen(true);

    };

    return (
        <>
        <ListCategories categories={categories} setCategories={setCategories}/>

        <Box mt={4} mb={4}>
            <Button onClick={addCategory} variant={'outlined'}> Add category </Button>
        </Box>

        <Dialog open={open} setOpen={setOpen} action={action} data={categories} setData={setCategories}
        />
        </>

    )
};
//Build a table to list categories
//Build a dialog component
//Fetch categories


export default Category;