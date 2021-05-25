import React, { useEffect, useState } from "react";
// @material-ui/core components

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import People from "@material-ui/icons/People";
// core components
import Header from "../Header/Header.js";
import HeaderLinks from "../Header/HeaderLinks.js";
// import Footer from "../components/Footer/Footer.js";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import Link from '@material-ui/core/Link';
// import image from "assets/img/bg7.jpg";
// import image from "/img/blog-work-dis.png";
import DiswikiApi from '../../services/DiswikiApi';
import AuthService from '../../services/AuthService';
import { message } from 'antd';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import RegisterPage from './RegisterPage';



const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const LoginPage = (props) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  let history = useHistory();
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const loginAlert = (type, msg) => {
    if (type == 'success') {
      message.success({
        content: 'Successfully loged in',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    if (type == 'logout') {
      message.success({
        content: 'Successfully logged out ',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    else if (type == 'required') {
      message.warn({
        content: 'Required username and password : ',
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
    else if (type == 'error') {
      message.error({
        content: 'Something went wrong ' + msg,
        className: 'custom-class',
        style: {
          marginTop: '4vh',
        },
      });
    }
  }
  const handleLoginClick = (e) => {
    // history.push('/admin')
    if (userName && password) {
      AuthService.login_dis_wiki(userName, password)
        .then(res => {
          window.sessionStorage.setItem("userConfig", JSON.stringify(res.data));
          window.sessionStorage.setItem("userName", res.data.username);
          loginAlert("success")
          history.push('/admin')
        })
        .catch(err => loginAlert("error", err))
    } else {
      loginAlert("required")
    }
    // debugger
  }
  const handleForgotPasswordClick = (e) => {

  }
  const handleEmailChange = (e) => {
    setUserName(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLogoClick = (e) => {
    debugger
    props.history.push('/')
  }
  const handleClickShowPassword = (e) => {
    debugger
    setShowPassword(!showPassword);
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          // backgroundImage: '/img/blog-work-dis.png',
          backgroundImage: "url(/img/blog-work-dis.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Paper square>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Login" />
                  <Tab label="Create" />
                </Tabs>
              </Paper>
              <TabPanel value={tabValue} index={0}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h2>Login</h2>

                    </CardHeader>
                    <p className={classes.divider}>Disability Wiki Login</p>
                    <CardBody>

                      <Input
                        inputProps={{
                          'aria-label': 'Username',
                        }}
                        type='email'
                        style={{ marginTop: '1rem' }}
                        placeholder="Email"
                        value={userName}
                        onChange={handleEmailChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                            >
                              <Email />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Input
                        placeholder="Password"
                        id="standard-adornment-password"
                        style={{ marginTop: '2rem', marginBottom: '1rem' }}

                        inputProps={{
                          'aria-label': 'Password',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleClickShowPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />

                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={handleLoginClick}>
                        Login
                    </Button>
                      <Button simple color="primary" size="lg" onClick={handleForgotPasswordClick}>
                        Forgot password
                    </Button>
                    </CardFooter>
                  </form>


                </Card>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <RegisterPage />
              </TabPanel>

            </GridItem>
          </GridContainer>

        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}

export default LoginPage;