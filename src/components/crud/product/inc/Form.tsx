import { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiFormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel'
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '50%',
        margin: '0 auto',
        '& .MuiFormControl-root ': {
            display: 'block',
            '& > *:not([type=checkbox])': {
                width: '100%'
            }
        },
    },
    formHeader: {
        backgroundColor: blue[400],
        padding: theme.spacing(2),
        textAlign: 'center'
    }

}));

const FormControl = withStyles((theme: any) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}))((props: any) => <MuiFormControl variant={'outlined'} {...props} />);


const Form = () => {
    const classes = useStyles();
    const [rawPrice, setRawPrice] = useState('standred');
    const [category, setCategory] = useState('Category');

    const handleSelectRawPrice = (event: any) => {
        setRawPrice(event.target.value);
    };
    const handleSelectCategory = (event: any) => {
        setCategory(event.target.value);
    };

    return (
        <form className={classes.root} action="#">
            <div className={classes.formHeader}>
                <h4>Add product</h4>
            </div>
            <FormControl>
                <TextField variant={'outlined'} label={'Product name'} />
            </FormControl>
            <FormControl>
                <TextField variant={'outlined'} label={'Code'} />
            </FormControl>
            <FormControl variant="filled">
                <InputLabel id={'raw-price-select'}>Raw Price</InputLabel>
                <Select labelId={'raw-price-select'} value={rawPrice} onChange={handleSelectRawPrice}>
                    <MenuItem value={rawPrice}>
                        {rawPrice}
                    </MenuItem>
                    <MenuItem value={'default'}>
                        {'default'}
                    </MenuItem>
                    <MenuItem value={'normal'}>
                        {'normal'}
                    </MenuItem>
                    <MenuItem value={'High'}>
                        {'Highe'}
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <TextField variant={'outlined'} label={'Price'} />
            </FormControl>
            <Box>
                <FormLabel component="div">Select color for product</FormLabel>
                <FormGroup row>
                    <FormControlLabel control={<Radio name="color_1" color={'primary'} />} label={"C1"} />
                    <FormControlLabel control={<Radio name="color_1" color={'primary'} />} label={"C2"} />
                    <FormControlLabel control={<Radio name="color_1" color={'primary'} />} label={"C3"} />
                    <FormControlLabel control={<Radio name="color_1" color={'primary'} />} label={"C4"} />
                </FormGroup>
            </Box>
            <FormControl>
                <p>Upload product image</p>
                <Input id={'fileUpload'} type={'file'} />
            </FormControl>
            <FormControl variant="filled">
                <InputLabel id={'category-label-id'}>{'category'}</InputLabel>
                <Select labelId={'category-label-id'} value={category} placeholder={category}
                    onChange={handleSelectCategory}>
                    <MenuItem value={category}>
                        {category}
                    </MenuItem>
                    <MenuItem value={'default'}>
                        {'default'}
                    </MenuItem>
                    <MenuItem value={'normal'}>
                        {'normal'}
                    </MenuItem>
                    <MenuItem value={'Highe'}>
                        {'Highe'}
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl hiddenLabel={true}>
                <InputLabel htmlFor={'description'}> Description</InputLabel>

                <TextareaAutosize id={'description'} aria-label="maximum height" rowsMin={5} />
            </FormControl>
            <FormControl>
                <TextField variant={'outlined'} color={'primary'} label={'Stock Count'} placeholder={'count'} />
            </FormControl>

            <FormControl>

                <TextField variant={'outlined'} type={'date'} />
            </FormControl>

            <FormControl>
                <Button variant={'outlined'} color={'primary'}>Submit</Button>
            </FormControl>
        </form>
    )
};
export default Form;