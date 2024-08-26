import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { logIn } = this.props;
    const { email, password } = this.state;
    logIn(email, password);
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
    this.setState({ enableSubmit: email !== '' && password !== '' });
  }

  render() {
    const { email, password, enableSubmit } = this.state;
    return (
      <>
        <p>Login to access the full dashboard</p>
        <form
          className={css(styles['label-input'])}
          onSubmit={this.handleLoginSubmit}
        >
          <div>
            <label htmlFor='email-add'>Email:</label>
            <input
              type='email'
              name='email'
              className={css(styles.input)}
              value={email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div>
            <label htmlFor='psw'>Password:</label>
            <input
              type='password'
              name='psw'
              className={css(styles.input)}
              value={password}
              onChange={this.handleChangePassword}
            />
          </div>
          <input type='submit' value='OK' disabled={!enableSubmit} />
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
