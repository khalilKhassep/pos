import {useState} from 'react';
import { useFormik } from 'formik';
import {makeStyles,withStyles} from '@material-ui/core/styles'
import * as yup from 'yup';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import type { TypeProduct } from '../helpers/types'

const useStyles = makeStyles((theme) => ({
    root:{

    },
    fullHeight:{
        height: '100px', 
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-input':{
            height:theme.spacing(8),
        }
    } 
}))

const FormControl = withStyles((theme) => ({
    root:{ 
        display:'block'
    },
    marginNormal:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }    	
}))((props: any) => <MuiFormControl margin='normal' fullWidth={true} variant='outlined' {...props} />);


const TextField = withStyles((theme) => ({
    root:{}
}))((props : any) => <MuiTextField fullWidth={true} variant='outlined' {...props} />) ;
 

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Product name required '),
    code: yup.string().required('Code is required'),
    raw_price: yup.string(),
    price: yup.number().positive().required('Price is reqired'),
    color: yup.string(),
    category_id: yup.number().positive(),
    img: yup.object(),
    description: yup.string().min(5 , 'The min string is 5 ').max(100 , 'You reached the max limit 100'),
    exp_date: yup.date().required('Enter Experation date')



});

const Form = () => {

   const [rawPrice,setRawPrice] = useState<Array<string>>(['Standard' , 'Exported' , 'Highe' , 'Normal']);
           const classes = useStyles();
   
    const initialValues: TypeProduct = {
        name: '',
        code: '',
        raw_price: '',
        price: 0,
        color: '',
        category_id: 0,
        img: {}, 
        description: '',
        stock_count: 0,
        exp_date: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => { console.log(values) },

    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
              <FormControl  required={true}>
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
                  <InputLabel id='rawPriceLabel'>Raw price</InputLabel>
                  <Select fullWidth={true} labelId='rawPriceLabel' id="rawPrice" name='raw_price' 
                  value={formik.values.raw_price} 
                  onChange={formik.handleChange}> 
                   {rawPrice.map((item:string) => {
                       return <MenuItem value={item}>{item}</MenuItem>
                   })}
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>

              <FormControl >
                  <TextField id='code' name="code" value={formik.values.code}
                  label='Product code'
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code} 
                  />
              </FormControl>
 
              <Button fullWidth={true} variant='contained' color={'primary'} type='submit'>Submit</Button>
            </form>
        </>
    )
}

export default Form;