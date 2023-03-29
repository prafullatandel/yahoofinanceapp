import * as React from 'react';
import { NavLink } from 'react-router-dom';

import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, useNavigate  } from 'react-router'

const pages = [
    {pageTitle: 'Home', href: "/"}, 
    // {pageTitle: 'Add Stock', href: "/addStock"},
    {pageTitle: 'Charts', href: "/charts"}
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function MainLayout() {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            Yahoo Finance
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <List>
                                    {pages.map((item) => (
                                    <ListItem
                                        key={item.pageTitle}
                                        disablePadding
                                        component={NavLink}
                                        // onClick={() => {
                                        //     navigate(item.href)
                                        //     handleCloseNavMenu()
                                        // }}
                                        // >
                                        to={item.href}
                                        >
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={item.pageTitle} />
                                        </ListItemButton>
                                    </ListItem>
                                    ))}
                                </List>
                            </Menu>
                        </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Yahoo Finance
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                        <Button
                            key={page.pageTitle}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.pageTitle}
                        </Button>
                        ))} */}
                        <List style={{display: "flex", flexDirection: 'row'}}>
                                    {pages.map((item) => (
                                    <ListItem
                                        key={item.pageTitle}
                                        disablePadding
                                        to={item.href}
                                        component={NavLink}
                                        sx={{color: "white"}}
                                        >
                                        <ListItemButton sx={{ textAlign: 'center', minWidth: "100px" }}>
                                        <ListItemText primary={item.pageTitle} />
                                        </ListItemButton>
                                    </ListItem>
                                    ))}
                                </List>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                    <Outlet />
                </Box>  
            </Container>
        </>
    )
}