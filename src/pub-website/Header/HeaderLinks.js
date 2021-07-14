/*eslint-disable*/
import React, { Fragment } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
// core components
import CustomDropdown from "../components/CustomDropdown/CustomDropdown.js";
import Button from "../components/CustomButtons/Button.js";
import { Select } from 'antd';
import styles from "../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
const { Option } = Select;
export default function HeaderLinks(props) {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  let history = useHistory();
  const handleHomeClick = (e) => {
    history.push(`/`)
  }
  const onLangChange = (e) => {

  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={handleHomeClick}
          aria-label="home navigation link"
        >
          <HomeIcon className={classes.icons} /> Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Fragment>
          <Button
            color="transparent"
            className={classes.navLink}
            aria-label="search navigation link"
          >
            <Link to="/wiki_search" color="transparent">
              <SearchIcon className={classes.icons} />
              Search
            </Link>
          </Button>
        </Fragment>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          aria-label="login navigation link"
        >
          <Link to={`/login`} color="transparent">
            <AccountCircleIcon className={classes.icons} />
            Login
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Select defaultValue="en" aria-label="language select box" style={{ width: 60, marginTop: '0.5rem', marginLeft: '0.5rem' }} onChange={onLangChange}>
          <Option value="en">EN</Option>
          <Option value="fr">FR</Option>
        </Select>
      </ListItem>
    </List>
  );
}
