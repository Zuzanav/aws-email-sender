// DEPENDENCIES -----------------------------------------------------------------------------

import React, {Component} from "react";
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// ==========================================================================================

// FORM COMPONENT ----------------------------------------------------------------------------
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
      // When user clicks 'Submit' button ...
        handleSubmit = event => {
            event.preventDefault();

            // when button is clicked, the button will confirm email was sent, and reset itself after 5 seconds
            this.setState({ submitted: true }, () => {
                setTimeout(() => this.setState({ submitted: false }), 5000);
            });

            // user inputs saved into state
            const {name, email, message } = this.state;

            // empty the fields after submit button is clicked
            this.setState({ 
                name: '',
                email: '',
                message: ''
            });
            
            // User input from the contact form is sent to the API Gateway
            axios.post(
                'https://5f62e6uxdk.execute-api.us-west-2.amazonaws.com/delta/myFunction2',
                { key1: {name},
                key2: {email}, 
                key3: {message}
                }
            )
            .then(function (response) {
                console.log(response);
            })
      }

// ----------------------------------------------------------------------------------------
  
    render() {

        const { submitted } = this.state;

        return (
        <div>
            <ValidatorForm 
                ref="form"
                onSubmit={this.handleSubmit}>

                <Grid container spacing={3}>

                    {/* FORM FOR NAME, EMAIL, MESSAGE & SUBMIT BUTTON */}
        
                        {/* NAME INPUT */}
                        <Grid item xs={12}>
                        <TextValidator
                            required 
                            id="standard-required standard-full-width" 
                            name="name"
                            label="Name" 
                            variant="outlined" 
                            fullWidth
                            margin="normal"
                            value={this.state.name} 
                            onChange={this.handleInputChange} 
                            validators={['matchRegexp:^[a-zA-Z ]+$']}
                            errorMessages={['please enter a valid name']}
                        />
                        </Grid>

                        {/* EMAIL INPUT */}
                        <Grid item xs={12}>

                        <TextValidator
                            required 
                            id="standard-required" 
                            name="email"
                            label="Email" 
                            variant="outlined" 
                            fullWidth
                            margin="normal"
                            value={this.state.email} 
                            onChange={this.handleInputChange} 
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                        </Grid>

                        {/* MESSAGE INPUT */}
                        <Grid item xs={12}>
                        <TextField 
                            id="outlined-multiline-static" 
                            name="message"
                            multiline 
                            rows="4" 
                            label="Message" 
                            variant="outlined" 
                            fullWidth
                            margin="normal"
                            value={this.state.message} 
                            onChange={this.handleInputChange} 
                        />
                        </Grid>

                        {/* SUBMIT BUTTON */}
                        <Grid item xs={12}>
                        <Button 
                            id="submit-button" 
                            type="submit" 
                            variant="contained" 
                            color="secondary">
                            {
                            (submitted && 'Email Sent!')
                            || (!submitted && 'Submit')
                        }
                        </Button>
                        </Grid>

                </Grid>
            </ValidatorForm>
        </div>
      );
    }
  }
  
  export default Form;