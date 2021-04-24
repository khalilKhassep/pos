import React from 'react';
import {useState} from 'react';
import MuiTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from './Dialog';

const Table = (props: any): any => {

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({});
    const [action, setAction] = useState('');
    const tableHeaders: string[] | string = props.data[0] !== undefined && props.data[0] !== null ? Object.keys(props.data[0]) : '';


    const edit = (item: any) => {
        setAction('edit');
        setOpen(true);
        setCategory(item);
    };
    const del = async (item: any) => {
        const request = await fetch(`${process.env.REACT_APP_BASE_URL}cat/${item.id}`, {method: 'delete'});
        if (request.ok) {
            const response = await request.json();
            props.setData(props.data.filter((cat: any) => {
                return cat.id !== item.id;
            }))
        }
    };


    return <React.Fragment>

        <TableContainer>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        {Array.isArray(tableHeaders) && tableHeaders.length ? tableHeaders.map((head, index) => {
                            return index + 1 === tableHeaders.length ? (  // Addding none exisiting head | proparity bu checking the last index of array then adding a ne one
                                <>
                                <TableCell align={'left'}
                                           key={Math.floor(Math.random() * 100)}>{head}</TableCell>
                                <TableCell align={'left'}
                                           key={Math.floor(Math.random() * 100)}>{'Action'}</TableCell>
                                </>
                            ) : <TableCell align={'left'} key={index}>{head}</TableCell>;

                        }) : <TableCell align={'left'}>{'Loading'}</TableCell>}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(props.data) && props.data.length ? props.data.map((item: any): any => {
                        return (
                            <TableRow key={item.id}>
                                {Array.isArray(tableHeaders) && tableHeaders.map((head: any) => {
                                    return <TableCell align={'left'}>{item[head]}</TableCell>
                                })}

                                <TableCell align={'left'}>
                                    <ButtonGroup variant={'outlined'} size={'small'} color={'primary'}
                                                 orientation={'horizontal'}>

                                        <Button onClick={() => edit(item)}> Edit</Button>
                                        <Button> View</Button>
                                        <Button onClick={() => del(item)} color={'secondary'}> Delete</Button>

                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>

                        )
                    }) : <TableRow><TableCell>There is no data to show </TableCell></TableRow>}
                </TableBody>
            </MuiTable>
        </TableContainer>

        <Dialog open={open} setOpen={setOpen} action={action} item={category} data={props.data}
                setData={props.setData}/>


    </React.Fragment>
};

export default Table;