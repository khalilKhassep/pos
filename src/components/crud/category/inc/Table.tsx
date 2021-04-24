import React from 'react';
import MuiTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Table = (props: any): any => {
    const tableHeaders: string[] | string = props.data[0] !== undefined && props.data[0] !== null ? Object.keys(props.data[0]) : '';
    return (
        <React.Fragment>

            <TableContainer>
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            {Array.isArray(tableHeaders) && tableHeaders.length ? tableHeaders.map((head, index) => {
                                return index + 1 === tableHeaders.length ? (
                                    <>
                                    <TableCell align={'left'} key={Math.floor(Math.random() * index + Math.floor(Math.random() * 10))}>{head}</TableCell>
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
                                    <TableCell align={'left'}>{item.id}</TableCell>
                                    <TableCell align={'left'}>{item.name}</TableCell>
                                    <TableCell align={'left'}>{item.created_at}</TableCell>
                                    <TableCell align={'left'}>{item.updated_at}</TableCell>
                                    <TableCell align={'left'}>
                                        <ButtonGroup variant={'outlined'} size={'small'} color={'primary'}
                                                     orientation={'horizontal'}>
                                            <Button> Edit</Button>
                                            <Button> View</Button>
                                            <Button color={'secondary'}> Delete</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>

                            )
                        }) : <TableRow><TableCell>There is no data to show </TableCell></TableRow>}
                    </TableBody>
                </MuiTable>
            </TableContainer>

        </React.Fragment>
    )
};

export default Table;