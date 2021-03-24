import React, { useState, useEffect } from 'react';
import Password from './Password';
import { Grid, TextField, InputAdornment, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },

    
//   }));

function Signup() {

    // const classes = useStyles();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    
    const history = useHistory();
    // to check single user and no repeat
    const [unique, setUnique] = useState(false);
    const [msg, setMsg] = useState('');
    const [show, setShow] = useState(true);
    
    const [errorMsg, setErrorMsg ] = useState('');

    const validate = () => {
        if (name === '' || name === undefined || name === null)
            return false
        else if(email === '' || email === undefined || email === null)
            return false
        else if (pwd === '' || pwd === undefined || pwd === null)
            return false
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = validate();
        if (valid == false){
            alert('Complete the form')
        }
        else {
        let user = {name, email, pwd};
        console.log(user)
            axios.post('http://localhost:4000/api/users', user)
            .then(res => {
                console.log(res.data);
                if(res.data.errorMsg != '' || res.data.errorMsg != undefined) {
                    setErrorMsg(res.data.errorMsg)
                   }
                else {
                    history.push('/');
                }   
            })
            .catch(err=>console.log(err,'error'));
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                
                <Grid item xs={1} md={2} lg={3}>
                </Grid>
                
                <Grid item xs={10} md={8} lg={6} className='form-container' >
                    {errorMsg === '' ? <span></span> :
                    <span className='error'>{errorMsg}</span>
                    }
                    <Typography variant='h4' className='title' >Sign Up</Typography>

                    <form className='signup-form' onSubmit={handleSubmit} >

                    <Grid className='signup-inputs' container spacing={1} alignItems="flex-end">
                        <Grid className='' item sm={1} md={1}>
                            <PersonIcon className='icon'/>
                        </Grid>
                        <Grid  className='input-container' item sm={10} md={6}>
                            <TextField label="Username" className='input-textfield'
                            onChange={(e)=>setName(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid className='signup-inputs' container spacing={1} alignItems="flex-end">
                        <Grid item sm={1} md={1}>
                            <EmailIcon className='icon' />
                        </Grid>
                        <Grid item item sm={10} md={6}>
                            <TextField className='input-textfield' label="Email" type='email'
                            onChange={(e)=>setEmail(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid className='signup-inputs' container spacing={1} alignItems="flex-end">
                        <Grid item sm={1} md={1}>
                            <LockIcon className='icon' />
                        </Grid>
                        <Grid item item sm={10} md={6}>
                            <TextField className='input-textfield' label="Password"  type='password'
                            onChange={(e)=>setPwd(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid className='signup-inputs' container spacing={1} alignItems="flex-end">
                        <Grid item item sm={10} md={6}>
                           <Button type='submit' variant='contained' className='submit'>Sign up</Button>
                        </Grid>
                    </Grid>

                    <Grid className='signup-inputs' container spacing={1} alignItems="flex-end">
                        <Grid item item sm={10} md={6}>
                            Already have an account? Sign in <a href=''>here</a>
                        </Grid>
                    </Grid>



                    {/* to unchange width and center effects of form back to original*/}
                    {/* <Grid className='signup-input' container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField label="Password" />
                        </Grid>
                    </Grid> */}

                    </form>
                </Grid>
                
                <Grid item xs={1} md={2} lg={3}>
                {/* <Password /> */}
                </Grid>

            </Grid>
                
        </div>
    )
}

export default Signup
