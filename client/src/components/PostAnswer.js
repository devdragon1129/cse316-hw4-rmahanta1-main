import axios from 'axios';
import React, { useState } from 'react';


const PostAnswer = ({ fetchAllQuestion, questionId, setPostAnswer }) => {
    const [detail, setDetail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState([]);


    const handlePostQuestion = async (e) => {
        e.preventDefault();

        if (!detail) setError((preval) => [...preval, 'Answer cannot be empty!']);
        if (!username) setError((preval) => [...preval, 'Username cannot be empty!']);
        if (username.length > 15) setError((preval) => [...preval, 'Username should not be more than 15 character!']);
        if (detail && username && username.length <= 15) {
            try {
                const res = await axios.post(`http://localhost:8000/api/answer/postanswer/${questionId}`, {
                    text: detail,
                    ans_by: username
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            } finally {
                fetchAllQuestion();
                setPostAnswer(false);
            }
        };
    };
    return (
        <div className='newQuestion'>
            {error ?
                <div className='errorMessage'>
                    <ul>
                        {error.map((err, index) => <li key={index}>{err}</li>)}
                    </ul>
                </div> : ''
            }

            <form onSubmit={handlePostQuestion}>
                <h2>Answer Text</h2>
                <p>Add details</p>
                <textarea onChange={(e) => setDetail(e.target.value)} cols="10" rows="5"></textarea>

                <h2>Username</h2>
                <p>Should not be more than 15 character.</p>
                <textarea onChange={(e) => setUsername(e.target.value)} cols="10" rows="2"></textarea>

                <button>Post Answer</button>
            </form>
        </div>
    )
};

export default PostAnswer;
