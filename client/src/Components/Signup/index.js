import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


const Signup = () => {
    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSignupFormState({
            ...signupFormState,
            [name]: value,
        });
    };

    //submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...signupFormState }
            });
            console.log(data)
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e)
        }
    };

    const containerStyle = { display: 'flex', marginTop: '10%' }
    const paperStyle = { padding: 20, height: '50vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    return (
        <div style={containerStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOpenOutlinedIcon /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                    <TextField label='Username' name='username' type='username' id='username' value={signupFormState.username} onChange={handleChange} fullWidth required />
                    <TextField label='Email' name='email' type='email' id='email' value={signupFormState.email} onChange={handleChange} fullWidth required />
                    <TextField label='Password' name='password' type='password' id='password' value={signupFormState.password} onChange={handleChange} fullWidth required />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
                </form>
                {error ? <div>Sign up failed</div> : null}
            </Paper>
        </div>
    );
};

export default Signup;

