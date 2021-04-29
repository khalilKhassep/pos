import { useState, useEffect, useRef, FormEvent } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiFormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel'
import Box from '@material-ui/core/Box';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

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
    const [formData, setFormData] = useState({
        product_name: "product name set",
        code: "code set",
        raw_price: "khalil",
        price: "price set",
        color: "color set",
        file_img: "img set",
        category: "milk",
        description: "desc set",
        stock_count: "stock count set",
        exp_date: "exp date set"
    })
    const elementFormRef = useRef(null);
    const [form,setFrom] = useState({});
    const elementRef = useRef();
    useEffect(() => {
        setFrom(elementFormRef.current);
    }, [])
    const handleSelectRawPrice = (event: any) => {
        setFormData(prevState => {
            return {
                ...prevState,
                raw_price: event.target.value,
            }
        })
    };
    const handleSelectCategory = (event: any) => {
        setFormData(prevState => {
            return { 
                ...prevState,
                category: event.target.value
            }
        })
    };
    const handleForm = async (event: any) => {
        event.preventDefault();
        let payload: any = {};
        const el = (Object.entries(form));
        let a: any = [];
        for (let i = 0; i < el.length; i++) { 
            const _el = el[i].splice(1, 1);
            if (i < 18) {
                a.push(_el[0]);
            }
        };
        a = a.filter(function (item: any) {
            return item.type === 'radio' && item.checked || item.type === 'text' || item.type === 'textarea' && !item.readOnly || item.type === 'date'
        });


        a = a.map(function (item: any) {
            const name = item.getAttribute('name');
            const value: any = item.value;
            return payload[name] = value;
        })
        setFormData((prevState: any) => {
            return {
                ...prevState, ...payload
            }
        });
    };
    const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
        obj[key];


    return (
        <form className={classes.root} ref={elementFormRef} onSubmit={(event :FormEvent<HTMLFormElement>) => {handleForm(event)}}> 
            <div className={classes.formHeader}>
                <h4>Add product</h4>
            </div>
            <FormControl>
                <TextField variant={'outlined'} label={'Product name'} name={'product_name'} />
            </FormControl>
            <FormControl>
                <TextField variant={'outlined'} label={'Code'} name={'code'} />
            </FormControl>
            <FormControl variant="filled">
                <label htmlFor='raw-price-select' >Raw price</label>
                <select id='raw-price-select' name={'raw_price'} onChange={handleSelectRawPrice}>
                   <option value={'khalil'}>{formData.raw_price}</option> 
                   <option value={'Normal'}>Normal</option> 
                   <option value={'zero'}>Zero</option> 
                   <option value={'Hign'}>Hieh</option> 
                </select>
            </FormControl>
            <FormControl>
                <TextField variant={'outlined'} label={'Price'} name={'price'} />
            </FormControl>
            <Box>
                <FormLabel component="div">Select color for product</FormLabel>
                <RadioGroup name="color">
                    <FormControlLabel value={'color_1'} control={<Radio />} label={"C1"} />
                    <FormControlLabel value={'color_2'} control={<Radio />} label={"C2"} checked={false} />
                    <FormControlLabel value={'color_3'} control={<Radio />} label={"C3"} checked={false} />
                    <FormControlLabel value={'color_4'} control={<Radio />} label={"C4"} checked={false} />
                </RadioGroup>
            </Box>
            <FormControl>
                <p>Upload product image</p>
                <Input id={'fileUpload'} type={'file'} name={'file_img'} onChange={(event) => console.log((event.target as HTMLInputElement).files) } />
            </FormControl>
            <FormControl variant="filled">
                <label htmlFor='select-cat'> {'category'}</label>
                <select id={'select-cat'} name={'category'} onChange={handleSelectCategory}>
                    <option value={'khalil'}>{formData.category}</option>
                    <option value={'Normal'}>Normal</option>
                    <option value={'zero'}>Zero</option>
                    <option value={'Hign'}>Hieh</option>
                </select>
            </FormControl>
            <FormControl hiddenLabel={true}>
                <InputLabel htmlFor={'description'}> Description</InputLabel>
                <TextareaAutosize id={'description'} aria-label="maximum height" rowsMin={5} name={"description"} />
            </FormControl>
            <FormControl>
                <TextField name="stock_count" variant={'outlined'} color={'primary'} label={'Stock Count'} placeholder={'count'} />
            </FormControl>

            <FormControl>
                <TextField name={'exp_date'} variant={'outlined'} type={'date'} />
            </FormControl>

            <FormControl>
                <Button type="submit"> Submit</Button>
            </FormControl>
        </form>
    )
};
export default Form;