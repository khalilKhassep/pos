import React from 'react';
import ListCategories from './inc/ListCategories';
import Button from '@material-ui/core/Button';
const Category = () => {
    return (
        <>
            <ListCategories />
            <Button variant={'outlined'}> Add new category </Button>
        </>

    )
};
//Build a table to list categories
//Build a dialog component

export default Category;