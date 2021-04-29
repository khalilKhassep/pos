import React, {useState, useEffect} from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useSnackbar} from "notistack";


const Dialog = (props: any) => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [cat, setCat] = useState({
        name: '',
    });


    useEffect(() => {
        setCat((prevState: any) => {
            if (props.item && props.action !== 'new') {
                return {
                    ...prevState,
                    name: props.item.name,
                    id: props.item.id
                }
            }
            return {...prevState, name: 'New category'}
        })
    }, []);

    const handleInput = (_value: string) => {
        setCat({...cat, name: _value});
    };

    const handleClose = () => {
        enqueueSnackbar("Are you sure want to close ? ", {
            variant: 'warning',
            action,
        });

    };

    const onEnter = () => {
        if (props.item && props.action !== 'new') {
            setCat((prevState: any) => {
                return {
                    name: props.item.name
                }
            })
        }
    };


    const post = async (item: { name: string }) => {

        const request = await fetch(`${process.env.REACT_APP_BASE_URL}cat`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        if (request.ok) {

            const response = await request.json();

            enqueueSnackbar(response.message);

            const newDataArr = [...props.data, {
                id: response.id,
                name: response.values.$name,
                created_at: response.values.$created_at,
                updated_at: ''
            }]

            props.setData(newDataArr);
            setCat({...cat, name: ''});
            props.setOpen(false);
        }
    };
    const edit = async (item: any) => {
        item = props.item;

        const request = await fetch(`${process.env.REACT_APP_BASE_URL}cat/update/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(cat),
        });
        if (request.ok) {
            const response = await request.json();
            console.log('Insdie response', props.data);

            await props.setData((props.data.map((_cat: any) => {
                if (_cat.id === item.id) {
                    return {
                        ..._cat,
                        name: response.values.$name,
                        updated_at: response.values.$updated_at,
                    }
                }
                return _cat;
            })));

            props.setOpen(false);
            enqueueSnackbar(response.message);
        }

    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'new' :
                post(cat);
                break;
            case 'edit' :
                edit(cat);
                break;
            default:
                console.log(cat);
                break;

        }
    };

    const action = (key: any) => (
        <>
        <Button onClick={() => {
            props.setOpen(true);
            closeSnackbar(key)
        }}>
            No
        </Button>
        <Button onClick={() => {
            props.setOpen(false);
            closeSnackbar(key)
        }}>
            Yes
        </Button>
        </>
    );


    return (
        <MuiDialog open={props.open} onEnter={onEnter}>
            <DialogTitle>{props.action} : {cat.name}</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl fullWidth={true} margin={'normal'}>
                        <TextField
                            variant={'outlined'}
                            value={cat.name} type={'string'}
                            label={cat.name !== undefined || cat.name !== '' ? cat.name : 'New cat'}
                            placeholder={cat.name}
                            fullWidth={true}
                            onChange={event => {
                                handleInput(event.target.value)
                            }}
                        />
                    </FormControl>
                    <DialogActions>
                        <ButtonGroup variant={'contained'} size={'small'} color={'primary'}>
                            <Button onClick={() => handleAction(props.action)}> Submit</Button>
                            <Button onClick={handleClose}>Close</Button>
                        </ButtonGroup>
                    </DialogActions>


                </form>
            </DialogContent>
        </MuiDialog>
    )
};


export default Dialog;