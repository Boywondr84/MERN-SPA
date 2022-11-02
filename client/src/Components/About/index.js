import React from 'react';
import { Typography } from '@mui/material/';
import assortmentEdit from '../../assets/assortmentEdit.jpg';


function About() {
    return (
        <div className="wrapper">
            <div className="row">
                <div className="about">
                    <div className="hero">
                        <Typography mr={3} fontSize={'20px'}>
                            Quick Cookies started out as a simple coding project but has rapidly grown into a multi-million dollar online business.<br></br><br></br>
                            With award winning, fresh cookies delivered to your door, there's no reason not to join the club!<br></br><br></br>
                            No more wondering what to bring to the company holiday party, the neighborhood block party or your next birthday celebration!<br></br><br></br>
                            As a member, you can sign up for regularly scheduled cookie deliveries. Select your cookies, quantity, delivery window and Quick Cookies will do the rest!<br></br><br></br>
                            When there's nothing left but crumbs, don't forget to leave a review about your recent cookie box!<br></br><br></br>
                        </Typography>
                    </div>
                    <div className="sideBanner">
                        <img src={assortmentEdit} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;

