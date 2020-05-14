import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Home from '../Home';
import CreateActivity from '../CreateActivity';
import CreateCategory from '../CreateCategory';
import '../../Register.css';
import Footer from './Footer';
import About from '../About';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Categories from '../Categories';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function handleMenuClick(value) {

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`nav-tabpanel-${value}`}
      aria-labelledby={`nav-tab-${value}`}
    >
    <Home/>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const MenuItemClick=(event)=> {
    return (
      <Typography children={Home}></Typography>
    );
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <div className={classes.root}>
      <div className="app-title"><h1>Activity Tracker</h1></div>
      <AppBar position="sticky" className="desktopMenu">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Home" href="" {...a11yProps(0)} />
          <LinkTab label="About" href="" {...a11yProps(1)} />
          <LinkTab label="Add Activity" href="" {...a11yProps(2)} />
          <LinkTab label="Add Category" href="" {...a11yProps(3)} />
          <LinkTab label="Show Category" href="" {...a11yProps(4)} />
          <LinkTab hidden label=""></LinkTab>
        </Tabs>
      </AppBar>
      <div><AppBar position="relative" className="burger">
      <IconButton edge="start" onClick={handleClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
       <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Home" href="" {...a11yProps(0)} />
          <LinkTab label="About"  href="" {...a11yProps(1)} />
          <LinkTab label="Add Activity" href="" {...a11yProps(2)} />
          <LinkTab label="Add Category" href="" {...a11yProps(3)} />
          <LinkTab label="Show Category" href="" {...a11yProps(4)} />
        </Tabs>
          </Menu>
    </AppBar></div>
      <TabPanel value={value} index={0}>
        <Home/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateActivity></CreateActivity>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CreateCategory></CreateCategory>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Categories></Categories>
      </TabPanel>
      
      <Footer/>
    </div>
    </div>
  );
}