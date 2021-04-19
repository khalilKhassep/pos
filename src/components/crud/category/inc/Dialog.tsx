import React, {useState, useEffect} from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Dialog = (props: any) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        name: '',
    });

    useEffect(() => {
    }, []);

    const handleInput = (_value: string) => {
        setItem({...item, name: _value});
    };

    const handleClose = () => {
        props.enqueueSnackbar("Are you sure want to close ? ", {
            variant: 'warning',
            action,
        });

    };


    const postItem = async (item: { name: string }) => {

        const request = await fetch(`${process.env.REACT_APP_BASE_URL}cat`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        if (request.ok) {
            const response = await request.json();
            props.enqueueSnackbar(response.message);
            const newDataArr = [...props.data, {
                id: response.id,
                name: response.values.$name,
                created_at: response.values.$created_at,
                updated_at: ''
            }];
            props.setData(newDataArr);
            setItem({...item, name: ''})
        }
    };


    const handleAction = (action: string) => {
        switch (action) {
            case 'new' :
                postItem(item);
                break;
            default:
                console.log(item);
                break;

        }
    };

    const action = (key: any) => (
        <>
        <Button onClick={() => {
            props.setOpen(true);
            props.closeSnackbar(key)
        }}>
            No
        </Button>
        <Button onClick={() => {
            props.setOpen(false);
            setItem({...item, name: ''})
            props.closeSnackbar(key)
        }}>
            Yes
        </Button>
        </>
    );


    return (
        <MuiDialog open={props.open}>
            <DialogTitle>{props.action}</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl fullWidth={true} margin={'normal'}>
                        <TextField
                            variant={'outlined'}
                            value={item.name} type={'string'}
                            label={item.name}
                            placeholder={item.name}
                            fullWidth={true}
                            onChange={event => {
                                handleInput(event.target.value)
                            }}
                        />
                    </FormControl>
                    <ButtonGroup variant={'contained'} size={'small'} color={'primary'}>
                        <Button onClick={() => handleAction(props.action)}> Save</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </ButtonGroup>

                </form>
            </DialogContent>
        </MuiDialog>
    )
};


export default Dialog;