import React, {useEffect, useRef, useState} from "react";
import {useFormik} from 'formik';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {useSnackbar} from "notistack";
import * as yup from 'yup';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import {TypeCategory, TypeProduct} from '../helpers/types'
import {getCategories} from "../helpers/modules";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(10)
    },
    fullHeight: {
        height: '100px',
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-input': {
            height: theme.spacing(8),
        },

    },
    checkBox: {
        position: 'relative',
        margin: '0',
        background: 'red',
        padding: '11px',
        '& > .inputCustomLabel': {
            position: 'absolute',
            zIndex: '-1',
            left: '0'
        }
    }

}));

const FormControl = withStyles((theme) => ({
    root: {
        display: 'block',
        '& .MuiInputLabel-formControl': {
            backgroundColor: 'white',
        }
    },
    marginNormal: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}))((props: any) => <MuiFormControl margin='normal' fullWidth={true} variant='outlined' {...props} />);


const TextField = withStyles(() => ({
    root: {}
}))((props: any) => <MuiTextField fullWidth={true} variant='outlined' {...props} />);


const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Product name required '),
    code: yup.string().required('Code is required'),
    raw_price: yup.string().required("Requuired field"),
    price: yup.number().positive().required('Price is reqired'),

    category_id: yup.number().positive(),
    img: yup.object().nullable(),
    description: yup.string().min(5, 'The min string is 5 ').max(100, 'You reached the max limit 100'),
    exp_date: yup.date().required('Enter Experation date')


});

const Form = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [categories, setCategories] = useState<Array<TypeCategory>>([]);
    const [rawPrice] = useState<Array<string>>(['Standard', 'Exported', 'Highe', 'Normal']);
    const [colors] = useState<Array<string>>(['#d9263e', '#a723dc', '#58a79c', '#5cc43b', '#2a8fd5']);
    let labelRef: any = useRef([]);
    const classes = useStyles();

    useEffect(() => {
        if (!labelRef.current) {
            return;
        }
        labelRef.current = colors.map(
            (color, index) => labelRef.current[index] = React.createRef()
        );

    }, []);
    useEffect(() => {
        getCategories(process.env.REACT_APP_BASE_URL + 'cat').then((resolved) => {
            if (!resolved) {
                return;
            }
            setCategories(resolved);
        });
    }, []);

    const initialValues: TypeProduct = {
        name: '',
        code: '',
        raw_price: '',
        price: 0,
        color: '',
        category_id: 119,
        img: {},
        description: '',
        stock_count: 0,
        exp_date: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log(values);
            storeProduct(values);
            actions.resetForm();
        },

    });

    const handleLabel = (index: number, color: string) => {
        if (labelRef.current[index] === null) {
            return
        }
        const input = labelRef.current[index].current.childNodes[1];
        if (input.checked) {

            input.checked = false;
            labelRef.current[index].current.style.backgroundColor = '#eee';
        } else if (!input.checked) {
            input.checked = true;

            labelRef.current[index].current.style.backgroundColor = color;
            // set other input to false [clear all inputs but one clicked : next ]

        }
    };

    const storeProduct = async (values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach((key: string) => {
            formData.append(key, values[key])
        });
        const request = await fetch(`${process.env.REACT_APP_BASE_URL}product`, {
            method: 'POST',
            body: formData
        });
        if (request.ok && request.status === 200) {
            enqueueSnackbar("Product aded");
        }

    };
    return (
        <>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <FormControl required={true}>
                    <TextField id="name" name='name' value={formik.values.name}
                               label='Product Name'
                               onChange={formik.handleChange}
                               error={formik.touched.name && Boolean(formik.errors.name)}
                               helperText={formik.touched.name && formik.errors.name}
                    />
                </FormControl>
                <FormControl>
                    <TextField id='description' name='description' value={formik.values.description}
                               label={'Description'}
                               onChange={formik.handleChange}
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}
                               className={classes.fullHeight}
                    />
                </FormControl>

                <FormControl>
                    <TextField id='code' name="code" value={formik.values.code}
                               label='Product code'
                               onChange={formik.handleChange}
                               error={formik.touched.code && Boolean(formik.errors.code)}
                               helperText={formik.touched.code && formik.errors.code}
                    />
                </FormControl>
                <FormControl>
                    <TextField name='price' onChange={formik.handleChange} label={'Price'}/>
                </FormControl>
                <FormControl error={formik.touched.raw_price && Boolean(formik.errors.raw_price)}>
                    <InputLabel id='rawPriceLabel'>Raw price</InputLabel>
                    <Select fullWidth={true} labelId='rawPriceLabel' id="rawPrice" name='raw_price'
                            value={formik.values.raw_price}
                            onChange={formik.handleChange}>
                        {rawPrice.map((item: string) => {
                            return <MenuItem key={`${item}-id`} value={item}>{item}</MenuItem>
                        })}
                    </Select>
                    {formik.touched.raw_price && Boolean(formik.errors.raw_price) ?
                        <FormHelperText> {formik.errors.raw_price} </FormHelperText> : ''}
                </FormControl>

                <FormControl>
                    <p>Select color</p>
                    {colors.map((color: string, index) => {
                        return <label key={index} className={classes.checkBox} ref={labelRef.current[index]}
                                      htmlFor={`checkbox${index}`} onClick={() => handleLabel(index, color)}
                                      style={{backgroundColor: color}}
                        >
                            {`C${index}`}
                            <input className={'inputCustomLabel'} name={'color'} value={color}
                                   onChange={(event: any) => formik.setFieldValue('color', event.target.value)}
                                   type="radio"
                                   id={`radio${index}`}/>
                        </label>
                    })}
                </FormControl>
                <FormControl>
                    <InputLabel id={'selectCategory'}>Select category</InputLabel>
                    <Select labelId='selectCategory' name={'category_id'} value={formik.values.category_id}
                            onChange={formik.handleChange}>
                        {categories.map((cat: TypeCategory) => {
                            return <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        })}
                    </Select>
                    {formik.touched.category_id && Boolean(formik.errors.category_id) ?
                        <FormHelperText> {formik.errors.category_id} </FormHelperText> : ''}

                </FormControl>

                <FormControl>
                    <label style={{display: 'block'}} htmlFor="fileUpload">Product Image</label>
                    <TextField id='fileUpload' name='img'
                               onChange={((event: any) => formik.setFieldValue('img', event.currentTarget.files[0]))}
                               type="file"
                               error={formik.touched.img && Boolean(formik.errors.img)}
                               helperText={formik.touched.img && formik.errors.img}
                    />
                </FormControl>
                <FormControl>
                    <TextField name={'stock_count'} value={formik.values.stock_count} onChange={formik.handleChange}
                               label='Stock Count' type={'number'}/>
                </FormControl>

                <FormControl>
                    <TextField label={'Expire date'} name={'exp_date'} onChange={formik.handleChange} type={'date'}
                               error={formik.touched.exp_date && Boolean(formik.errors.exp_date)}
                               helperText={formik.touched.code && formik.errors.exp_date}/>
                </FormControl>
                <Button fullWidth={true} variant='contained' color={'primary'} type='submit'>Submit</Button>
            </form>
        </>
    )
};

export default Form;