import React, { Component } from 'react';
import './new_login.css';

import { connect } from 'react-redux';
import { loginUser, signInWithGoogle } from '../../actions';

import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
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
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser(email, password);
    event.preventDefault();
  };

  googleSignIn = () => {
    const { signInWithGoogle } = this.props;
    signInWithGoogle();
  };

  render() {
    const { email, password } = this.state;
    const { isAuthenticated, loginError } = this.props;

    return isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to
            <Link className="title ml-2" to="/">
              4attik
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login to your account.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            />
          </div>
          <div className="form-group">
            {loginError ? <p className="text-danger">{loginError}</p> : null}
            <button className="btn btn-primary px-5" type="submit">
              Login
            </button>
          </div>
          <p>You can also log in with any of these services</p>
          <button
            className="btn btn-danger mr-2"
            type="button"
            onClick={this.googleSignIn}
          >
            Sign in with Google
          </button>
          <button className="btn btn-secondary" type="button" disabled>
            Sign in with GitHub
          </button>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    loginError: auth.loginError,
    isAuthenticated: auth.isAuthenticated,
  };
}

const mapDispatchToProps = {
  loginUser,
  signInWithGoogle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
