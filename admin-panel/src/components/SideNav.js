import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login';
import Contacts from './Contacts';
import FoodItems from './FoodItems';
import Foodoutlet from './Foodoutlet';
import MessMenu from './MessMenu';
import Role from './Role';
import User from './User';
import BusTimings from './BusTimings';
import FerryTimings from './FerryTimings';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [component, setComponent] = useState('Login');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          'User',
          'Role',
          'Contacts',
          'Mess Menu',
          'Food Items',
          'Food Outlets',
          'Bus Timings',
          'Ferry Timings',
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              if (text === 'User') {
                navigate('/user');
                setComponent('User');
              }
               else if (text === 'Role') {
                navigate('/role');
                setComponent('Role');
              } else if (text === 'Contacts') {
                navigate('/contacts');
                setComponent('Contacts');
              } else if (text === 'Mess Menu') {
                navigate('/mess-menu');
                setComponent('Mess Menu');
              } else if (text === 'Food Items') {
                navigate('/food-items');
                setComponent('Food Items');
              } else if (text === 'Food Outlets') {
                navigate('/food-outlets');
                setComponent('Food Outlets');
              } else if (text === 'Bus Timings') {
                navigate('/bus-timings');
                setComponent('Bus Timings');
              } else if (text === 'Ferry Timings') {
                navigate('/ferry-timings');
                setComponent('Ferry Timings');
              }
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const loadComponent = () => {
    switch (component) {
      case 'User':
        return <User />;
      case 'Role':
        return <Role />;
      case 'Contacts':
        return <Contacts />;
      case 'Mess Menu':
        return <MessMenu />;
      case 'Food Items':
        return <FoodItems />;
      case 'Food Outlets':
        return <Foodoutlet />;
      case 'Bus Timings':
        return <BusTimings />;
      case 'Ferry Timings':
        return <FerryTimings />;
      default:
        return <User />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>{loadComponent()}</Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
