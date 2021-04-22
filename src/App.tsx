

import React from 'react';
import {Switch, Route, Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
//Partial Imports
import Header from './components/crud/partial/Header';
//App imports
import Category from './components/crud/category/Category';
import Product from './components/crud/product/index';

const useStyle = makeStyles(theme => ({

    root: {
        '& .navCard': {
            display: 'flex',
            flexWrap: 'wrap',
            '& .MuiPaper-root': {
                textAlign: 'center',
                '& a': {
                    textDecoration: 'none',
                    padding: '50px 0',
                    display: ' block',
                    fontSize: '20px',
                }
            },
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
            },
        }
    }
}));

function App() {
    const classes = useStyle();
    return (
        <Container className={classes.root} fixed>
            <Header/>
            <Box mt={5}>

                <Switch>
                    <Route exact path={'/'}>
                        <Box className={'navCard'}>
                            <Paper>
                                <Link to={'/categories'}>Categories</Link>
                            </Paper>
                            <Paper>
                                <Link to={'/product'}>Products</Link>

                            </Paper>
                        </Box>

                    </Route>

                    <Route path={'/categories'}>
                        <Category/>
                    </Route>
                    <Route path={'/product'}>
                     <Product/>
                    </Route>
                </Switch>
            </Box>
        </Container>
    );
}

export default App;
