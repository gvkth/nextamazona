import { Button, List, ListItem, TextField, Typography,Link } from '@material-ui/core'
import axios from 'axios';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useContext } from 'react';

export default function Login() {
    const router = useRouter();
    const {redirect}=router.query;
    const classes = useStyles();
    const {state,dispatch}=useContext(Store);
    const {userInfo}=state;
    useEffect(()=>{
        if (userInfo){
            router.push('/');
            // window.location='/';
        }
    },[]);
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const onsubmitHandler = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/users/login',{email,password});
            dispatch({type:'USER_LOGIN',payload:data});
            Cookies.set('userInfo',JSON.stringify(data));
            // alert('success login');
            router.push(redirect || '/');
        }
        catch(e){
            alert( e.response.data? e.response.data.message : e.message);
        }
    }
    return (
        <Layout title="Login">
            <form className={classes.form} onSubmit={(e)=>onsubmitHandler(e)}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id="email" label="Email" inputProps={{type:'email'}}
                            onChange = {e=>setEmail(e.target.value)}
                            ></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id="password" 
                            label="Password" 
                            inputProps={{type:'password'}}
                            onChange = {e=>setPassword(e.target.value)}
                        ></TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don&apos;t have an account?&nbsp;<NextLink href="/register" passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
