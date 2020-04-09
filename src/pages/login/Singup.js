import React, { Component } from 'react';
import './new_login.css';

import { connect } from 'react-redux';
import { registerUser, signInWithGoogle } from '../../actions';

import { Link, Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    const { registerUser } = this.props;
    const { email, password } = this.state;
    registerUser(email, password);
    event.preventDefault();
  };

  googleSignIn = () => {
    const { signInWithGoogle } = this.props;
    signInWithGoogle();
  };

  render() {
    const { email, password } = this.state;
    const { isAuthenticated, signUpError } = this.props;

    return isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <div className="container">
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
            <Link className="title ml-2" to="/">
              4attik
            </Link>
          </h1>
          <p className="lead">Fill in the form below to create an account.</p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={email}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            ></input>
          </div>
          <div className="form-group">
            {signUpError ? <p className="text-danger">{signUpError}</p> : null}
            <button className="btn btn-primary px-5" type="submit">
              Sign up
            </button>
          </div>
          <p>You can also sign up with any of these services</p>
          <button
            className="btn btn-danger mr-2"
            type="button"
            onClick={this.googleSignIn}
          >
            Sign up with Google
          </button>
          <button className="btn btn-secondary" type="button" disabled>
            Sign up with GitHub
          </button>
          <hr></hr>
          <p>
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    signUpError: auth.signUpError,
    isAuthenticated: auth.isAuthenticated,
  };
}

const mapDispatchToProps = {
  registerUser,
  signInWithGoogle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
