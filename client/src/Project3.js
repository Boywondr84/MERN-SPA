import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import NavHeaders from './Navigation';
import About from './Components/About';
import ProjectCookies from './Components/Cookies';
import Contact from './Components/Contact';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Order from './Components/Order';
import Auth from './utils/auth';


function Project() {
    const initialPage = window.location.hash || '#about'
    const [currentPage, setCurrentPage] = useState(initialPage);

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    const renderPage = () => {
        if (currentPage === '#about') {
            return <About />;
        }
        if (currentPage === '#cookies') {
            return <ProjectCookies />;
        }
        if (currentPage === '#contact') {
            return <Contact />;
        }
        if (currentPage === '#signup') {
            return <Signup />;
        }
        if (currentPage === '#login') {
            return <Login />;
        }
        if (currentPage === '#order') {
            return <Order />;
        }
    }

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <AppBar>
                <Toolbar
                    className="toolbar">
                    <Button color="inherit"
                        href="#about" onClick={() => handlePageChange('#about')}
                        className={currentPage === '#about' ? 'nav-link active' : 'nav-link'}>About Us
                    </Button>
                    <Button color="inherit"
                        href="#cookies" onClick={() => handlePageChange('#cookies')}
                        className={currentPage === '#cookies' ? 'nav-link active' : 'nav-link'}>Cookies
                    </Button>
                    <Button color="inherit"
                        href="#contact" onClick={() => handlePageChange('#contact')}
                        className={currentPage === '#contact' ? 'nav-link active' : 'nav-link'}>Contact
                    </Button>
                    {Auth.loggedIn() ? (
                        <>

                            <Button color="inherit" href="#about" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit"
                                href="#signup" onClick={() => handlePageChange('#signup')}
                                className={currentPage === '#signup' ? 'nav-link active' : 'nav-link'}>Signup
                            </Button>
                            <Button color="inherit"
                                href="#login" onClick={() => handlePageChange('#login')}
                                className={currentPage === '#login' ? 'nav-link active' : 'nav-link'}>Login
                            </Button>
                        </>
                    )}

                    <Button color="inherit"
                        href="#order" onClick={() => handlePageChange('#order')}
                        className={currentPage === '#order' ? 'nav-link active' : 'nav-link'}>Place Order
                    </Button>
                </Toolbar>
            </AppBar>
            {renderPage()}
        </div>
    );
}
export default Project;