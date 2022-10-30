import React, { useState } from 'react';
import CookieModal from '../Modal';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import choco from '../../assets/cookieImages/choco.jpg';
import oatmeal from '../../assets/cookieImages/oatmeal.jpg';
import gingersnap from '../../assets/cookieImages/gingersnap.jpg';
import snicker from '../../assets/cookieImages/snickerdoodle.jpg';

// import ChocolateChip from '../../assets/chocolateChip.jpg';
// import Oatmeal from '../../Components/Oatmeal';

// RESTARTING WITH BASIC MODAL / PROPS TO SEE IF IT WORKS

const Cookie = () => {
    const [open, setOpen] = React.useState(0);
    const handleOpen = event => {console.log(event.target); setOpen(event.target.dataset.id)};
    const handleClose = () => setOpen(false);
    const [cookies, setCookies] = useState([
        { id: 1, name: 'Chocolate Chip', image: [choco], description: 'Melt in your mouth delicious.', calories: 198, fat: 9, carbs: 28, protein: 3, price: 26 },
        { id: 2, name: 'Oatmeal Raisin', image: [oatmeal], description: 'oatmeal description', calories: 218, fat: 9, carbs: 32, protein: 3, price: 30 },
        { id: 3, name: 'Snickerdoodle', image: [snicker], description: 'snickerdoodle description', calories: 92, fat: 4, carbs: 12, protein: 1, price: 34 },
        { id: 4, name: 'Gingersnaps', image: [gingersnap], description: 'gingersnap description', calories: 106, fat: 3, carbs: 19, protein: 1, price: 29 }
    ]);

    return (
        <div className="modal-title">
            
            {cookies.map((cookie) => (
                <Button key={cookie.id} data-id={cookie.id} onClick={handleOpen}>{cookie.name}</Button>
            ))}
            <Modal
                open={!!open}
                onClose={handleClose}
            >
                <div>
                    <CookieModal cookies={cookies.filter(cookie => cookie.id == open)} />
                </div>
            </Modal>
        </div>
    )
};

export default Cookie;