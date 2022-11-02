import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
import { QUERY_COOKIE, QUERY_REVIEWS } from '../../utils/queries';

const ReviewForm = () => {
    const [reviewText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [open, setOpen] = React.useState(false);
    // const { register, handleSubmit, reset, formState} = useForm();

    // const { register, handleSubmit } = useForm();
    // const onSubmit = (event, data) => {
    //     if (event.target.value.length <= 50) {
    //         setText(event.target.value);
    //         setCharacterCount(event.target.value.length);
    //         console.log(data);
    //     }
    // };

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = event => {
        if (event.target.value.length <= 50) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addReview({
                variables: { reviewText }
            });

            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    const [addReview, { error }] = useMutation(ADD_REVIEW, {
        update(cache, { data: { addReview } }) {
            try {
                const { cookie } = cache.readQuery({ query: QUERY_REVIEWS });
                cache.writeQuery({
                    query: QUERY_REVIEWS,
                    data: { cookie: { ...cookie, reviews: [...cookie.reviews, addReview] } },
                });
            } catch (e) {
                console.error(e);
            }

            const { reviews } = cache.readQuery({ query: QUERY_COOKIE });

            cache.writeQuery({
                query: ADD_REVIEW,
                data: { reviews: [addReview, ...reviews] }
            });
        }
    });

    // return (
    //     <div>
    //         <p className={`m=0 ${characterCount === 50 || error ? 'text-error' : ''}`}>
    //             Character Count: {characterCount}/50
    //             {error && <span>Something went wrong</span>}
    //             </p>
    //             <Modal
    //             hideBackdrop
    //             open={open}
    //             onClose={handleClose}
    //             >
    //                 <Box sx={{...style, width: 500 }}>
    //                     <text label="Add Review Here" variant="standard" />
    //                     <form onSubmit={handleFormSubmit}>
    //                         <textarea
    //                         value={reviewText}
    //                         onChange={handleChange}
    //                         ></textarea>
    //                         <div>
    //                             <Button type="submit">Leave Review</Button>
    //                         </div>
    //                     </form>
    //                     <Button onClick={handleClose}>Close The Reviews</Button>
    //                     {/* Add Reviews here */}
    //                     <ReviewForm />
    //                 </Box>
    //             </Modal>
    //     </div>
    // )
};

export default ReviewForm;