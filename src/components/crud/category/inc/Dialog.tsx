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
    const [value, setValue] = useState('');

    useEffect(() => {
        // setOpen(props.open)
    }, []);

    const handleInput = (value: string) => {
        setValue(value);
        console.log(value);
    };

    const handleClose = () => {
        props.setOpen(false);

    };

    return (
        <MuiDialog open={props.open}>
            <DialogTitle>{'Title'}</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl>
                        <TextField
                            variant={'outlined'}
                            value={value} type={'string'}
                            label={value}
                            placeholder={value}
                            onChange={event => {
                                handleInput(event.target.value)
                            }}
                        />
                    </FormControl>
                    <ButtonGroup variant={'contained'} size={'small'} color={'primary'}>
                        <Button> Save</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </ButtonGroup>

                </form>
            </DialogContent>
        </MuiDialog>
    )
};

export default Dialog;