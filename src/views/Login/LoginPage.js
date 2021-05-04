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

const useStyles = makeStyles(styles);

const LoginPage = (props) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [textValues, setTextValues] = useState({ 'userName': '', 'password': '', 'showPassword': false })

  let history = useHistory();
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const handleLoginClick = (e) => {
    // history.push('/admin')
    console.log(textValues)
    debugger
  }
  const handleForgotPasswordClick = (e) => {

  }
  const handleEmailChange = (e) => {
    setTextValues({ 'userName': e.target.value })
  }
  const handlePasswordChange = (e) => {
    setTextValues({ 'password': e.target.value })
  }
  const handleLogoClick = (e) => {
    debugger
    props.history.push('/')
  }
  const handleClickShowPassword = (e) => {
    debugger
    setTextValues({ 'showPassword': !textValues.showPassword });
  }


  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Disability Wiki Project"
        onClick={() => handleLogoClick}
        // onLeftIconButtonClick={() => handleLogoClick}
        rightLinks={<HeaderLinks />}
        {...rest}
      />
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
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Login</h2>
                    <div className={classes.socialLine}>
                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button> */}
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Disability Wiki Login</p>
                  <CardBody>

                    <Input
                      fullWidth='true'
                      labelText="asdasdsad"
                      inputProps={{
                        'aria-label': 'Username',
                      }}
                      type='email'
                      style={{ marginTop: '1rem' }}
                      placeholder="Email"
                      value={textValues.userName}
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
                      fullWidth='true'
                      style={{ marginTop: '2rem', marginBottom: '1rem' }}

                      inputProps={{
                        'aria-label': 'Password',
                      }}
                      type={textValues.showPassword ? 'text' : 'password'}
                      value={textValues.password}
                      onChange={handlePasswordChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleClickShowPassword}
                          >
                            {textValues.showPassword ? <Visibility /> : <VisibilityOff />}
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
                <Button simple style={{ color: "#757ce8" }} size="sm">
                  Create a new account
                </Button>

              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}

export default LoginPage;