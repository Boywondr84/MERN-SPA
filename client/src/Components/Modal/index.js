import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { textAlign } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
};

export default function CookieModal(props) {
    const cookies = props.cookies;


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, reset, formState } = useForm();
    // you're getting to this point and then not using your data, because it's just being logged
    // you have a reviewForm component that is not being used. It has no information being returned
    // just perform your query or mutation from this file under the onSubmit
    //good luck!
    function cookieReviews(data) {
        // const reviews = data.review;
        let newReview = document.createElement("ul");
        newReview.textContent = data.review;
        const getReviewEl = document.querySelector("#reviewEl");
        getReviewEl.appendChild(newReview);
        console.log(data);
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ review: "" });
        }
    });
    // console.log(props);
    // console.log(cookies);

    return (
        <div>
            <Box sx={style} className="modal-image">
                {cookies.map((cookie) => (
                    <div>
                        <img src={cookie.image}></img>
                        <h3>{cookie.description}</h3>
                    </div>
                ))}
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cookie</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cookies.map((cookie) => (

                                // {cookies.filter(cookie => cookie.id).map(filteredCookie => (
                                <TableRow
                                    key={cookie.id}
                                    sx={{ '&:last=child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {cookie.name}
                                    </TableCell>
                                    <TableCell align="right">{cookie.calories}</TableCell>
                                    <TableCell align="right">{cookie.fat}</TableCell>
                                    <TableCell align="right">{cookie.carbs}</TableCell>
                                    <TableCell align="right">{cookie.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    {cookies.map((cookie) => (
                        <div>
                            <h3>Price: ${cookie.price} / dozen cookies</h3>
                        </div>
                    ))}
                </div>
                <Button onClick={handleOpen}>Add Your Review</Button>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={{ ...style, width: 500 }}>
                        <TextField label="Add Review Here: " variant="standard" />
                        <form onSubmit={handleSubmit(cookieReviews)}>
                            <div>
                                <TextField {...register("review", { required: true })} />
                            </div>
                            <div>
                                <Button type="submit">Leave Review</Button>
                            </div>
                        </form>
                        <Button onClick={handleClose}>Close The Reviews</Button>

                        {/* <ReviewForm /> */}
                    </Box>
                </Modal>
                {cookies.map((cookie) => (
                    <div>
                        <div id="reviewEl">
                            <h4>Reviews:</h4>
                            <ul>"{cookie.reviews}"</ul>
                        </div>
                    </div>
                ))}
            </Box>
        </div>
    )
}

// export default CookieModal;