import React, { useState } from "react";
import { validateEmail } from "../../utils/helpers";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

const ContactForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formState;

  const handleChange = (e) => {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);

      if (!isValid) {
        setErrorMessage("your email is invalid");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });

      console.log(formState.name);
      console.log(formState.email);
      console.log(formState.message);
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    window.location = `mailto:gribbler25@gmail.com?subject=message from ${formState.name}&body=${formState.message}`;
  };
  const contactStyle = { padding: "20px" }
  return (
    <div style={contactStyle}>
      <Typography gutterBottom variant="h3" align="center">
        Quick Cookies
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill out the form and our team will get back to you.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField placeholder="Enter name" label="Name" variant="outlined" name="name" defaultValue={name} onBlur={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" name="email" defaultValue={email} onBlur={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" name="message" defaultValue={message} onBlur={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ContactForm;

// function handleChange(e) {
//     if (e.target.name === "email") {
//       const isValid = validateEmail(e.target.value);
//       console.log(isValid);
//       if (!isValid) {
//         setErrorMessage("your email is invalid");
//       } else {
//         if (!e.target.value.length) {
//           setErrorMessage(`${e.target.name} is required`);
//         } else {
//           setErrorMessage("");
//         }
//         // console.log('errorMessage', errorMessage);
//       }
//     }
