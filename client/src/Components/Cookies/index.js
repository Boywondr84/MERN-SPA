import React, { useState } from 'react';
import CookieModal from '../Modal';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import choco from '../../assets/cookieImages/choco.jpg';
import oatmeal from '../../assets/cookieImages/oatmeal.jpg';
import gingersnap from '../../assets/cookieImages/gingersnap.jpg';
import snicker from '../../assets/cookieImages/snickerdoodle.jpg';


const Cookie = () => {
    const [open, setOpen] = React.useState(0);
    // nextline is an error on dev tools
    const handleOpen = event => { console.log(event.target); setOpen(event.target.dataset.id) };
    const handleClose = () => setOpen(false);
    const [cookies, setCookies] = useState([
        { id: 1, name: 'Chocolate Chip', image: [choco], description: 'Melt in your mouth delicious.', calories: 198, fat: 9, carbs: 28, protein: 3, price: 26, reviews: "Decadent" },
        { id: 2, name: 'Oatmeal Raisin', image: [oatmeal], description: 'oatmeal description', calories: 218, fat: 9, carbs: 32, protein: 3, price: 30 },
        { id: 3, name: 'Snickerdoodle', image: [snicker], description: 'snickerdoodle description', calories: 92, fat: 4, carbs: 12, protein: 1, price: 34 },
        { id: 4, name: 'Gingersnaps', image: [gingersnap], description: 'gingersnap description', calories: 106, fat: 3, carbs: 19, protein: 1, price: 29 }
    ]);

    const cookieStyle = { display: 'flex', padding: "20px",  flexDirection: "row"}
    return (
        <div className="modal-title" >
            <div style={cookieStyle}>
                <div style={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "center", textAlign: "center"}}>
                    {cookies.map((cookie) => (
                        <div>
                            <Button key={cookie.id} ><img data-id={cookie.id} onClick={handleOpen} src={cookie.image} style={{ height: "300px", width: "300px" }}></img></Button>
                            <p>{cookie.name}</p>
                        </div>
                    ))}
                </div>
                {/* <Gallery currentGroup={cookies}/> */}
                <Modal
                    open={!!open}
                    onClose={handleClose}
                >
                    <div>
                        <CookieModal cookies={cookies.filter(cookie => cookie.id == open)} />
                    </div>
                </Modal>
            </div>
        </div>
    )
};

export default Cookie;