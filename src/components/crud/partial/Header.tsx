import {Link} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row',
        height:'60px',
        paddingTop:theme.spacing(1),
        '& div': {
            '& a ': {
                display: 'block',
                color: 'white',
                padding: '10px 8px',
                textDecoration:'none'

            }
        }
    },

}));

const Header = () => {
    const classes = useStyles();
    return (
        <>
        <AppBar position={'static'} className={classes.root}>
            <div><Link to={"/"}> Home </Link></div>
            <div><Link to={'/categories'}> Category </Link></div>
            <div><Link to={'/product'}> Product </Link></div>
        </AppBar>
        </>
    )
}
export default Header;