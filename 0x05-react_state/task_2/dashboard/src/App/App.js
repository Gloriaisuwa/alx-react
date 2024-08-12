import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import { AppContext, defaultUser, defaultLogOut } from './AppContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: defaultUser,
      logOut: this.logOut.bind(this),
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: getLatestNotification() },
  ];

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({
      user: defaultUser,
    });
  }

  render() {
    const { displayDrawer, user, logOut } = this.state;

    return (
      <AppContext.Provider value={{ user, logOut }}>
        <React.Fragment>
          <div className={css(styles.App)}>
            <div>
              <Notifications
                listNotifications={this.listNotifications}
                displayDrawer={displayDrawer}
                handleDisplayDrawer={this.handleDisplayDrawer}
                handleHideDrawer={this.handleHideDrawer}
              />
              <Header />
            </div>
            <div className={css(styles.body)}>
              {user.isLoggedIn ? (
                <BodySectionWithMarginBottom title='Course list'>
                  <CourseList listCourses={this.listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title='Log in to continue'>
                  <Login logIn={this.logIn} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title='News from the School'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                  explicabo cupiditate! Voluptas maxime omnis, incidunt sapiente
                  odit quae sint possimus cumque corrupti quos atque quam
                  repudiandae ducimus rem, commodi error!
                </p>
              </BodySection>
            </div>
            <div className={css(styles.footer)}>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    fontSize: '1.2rem',
    padding: '1rem',
    height: '100vh',
  },

  body: {
    padding: '2rem',
    height: '100%',
    borderBottom: '4px solid #e0364b',
  },

  footer: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: '2rem',
  },
});

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
