// TODO create separate component for register/login form to provide user friendlier UI
import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, registerUser } from '../../actions';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      email: '',
      password: ''
    };
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    this.state.signUp
      ? dispatch(registerUser(email, password))
      : dispatch(loginUser(email, password));
  };

  switchSignUp = () => {
    this.setState({
      signUp: !this.state.signUp
    });
  };

  render() {
    const { loginError, signUpError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to='/' />;
    } else {
      return (
        <Container component='main' maxWidth='xs'>
          <Paper className='paper'>
            <Avatar className='avatar'>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {this.state.signUp ? 'Register' : 'Log in'}
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              onChange={this.handleEmailChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={this.handlePasswordChange}
            />
            {(loginError || signUpError) && (
              <Typography component='p' className='errorText'>
                {loginError ? "Incorrect email or password." : "Valid email and password > 6 character"}
              </Typography>
            )}
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              className='submit'
              onClick={this.handleSubmit}
            >
              {this.state.signUp ? 'Sing up' : 'Sign in'}
            </Button>
            <a onClick={this.switchSignUp}>
              {this.state.signUp ? 'Go to login' : 'No account? Register!'}
            </a>
          </Paper>
        </Container>
      );
    }
  }
}

function mapStateToProps({ auth }) {
  return {
    isLoggingIn: auth.isLoggingIn,
    loginError: auth.loginError,
    signUpError: auth.signUpError,
    isAuthenticated: auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Login);
