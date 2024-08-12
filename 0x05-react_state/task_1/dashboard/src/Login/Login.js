import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.updateSubmitButtonState = this.updateSubmitButtonState.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.updateSubmitButtonState);
  }

  handleChangePassword(event) {
    this.setState(
      { password: event.target.value },
      this.updateSubmitButtonState
    );
  }

  updateSubmitButtonState() {
    const { email, password } = this.state;
    const enableSubmit = email !== '' && password !== '';
    this.setState({ enableSubmit });
  }

  render() {
    return (
      <>
        <p>Login to access the full dashboard</p>
        <form
          className={css(styles['label-input'])}
          onSubmit={this.handleLoginSubmit}
        >
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              className={css(styles.input)}
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div>
            <label htmlFor='psw'>Password:</label>
            <input
              type='password'
              name='psw'
              id='psw'
              className={css(styles.input)}
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <input type='submit' value='OK' disabled={!this.state.enableSubmit} />
        </form>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: '0.7rem',
  },
  'label-input': {
    '@media (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

export default Login;
