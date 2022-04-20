import axios from 'axios';
import React, { useState } from 'react';


const NewQuestionPage = ({ fetchAllQuestion, setAskQuestion }) => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [tags, setTags] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState([]);


    const handlePostQuestion = async (e) => {
        e.preventDefault();

        if (!title) setError((preval) => [...preval, 'Title cannot be empty!']);
        if (!detail) setError((preval) => [...preval, 'Detail cannot be empty!']);
        if (!tags) setError((preval) => [...preval, 'Tags cannot be empty!']);
        if (!username) setError((preval) => [...preval, 'Username cannot be empty!']);
        if (title.length > 100) setError((preval) => [...preval, 'Title should not be more than 100 character!']);
        if (username.length > 15) setError((preval) => [...preval, 'Username should not be more than 15 character!']);

        if (title && detail && tags && username && title.length <= 100 && username.length <= 15) {
            try {
                const res = await axios.post('http://localhost:8000/api/question/addquestion', {
                    title,
                    text: detail,
                    tags: tags.toLowerCase(),
                    asked_by: username
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            } finally {
                fetchAllQuestion();
                setAskQuestion(false);
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
                <h2>Question Title</h2>
                <p>Title should not be more than 100 character.</p>
                <textarea onChange={(e) => setTitle(e.target.value)} cols="10" rows="2"></textarea>

                <h2>Question Text</h2>
                <p>Add details</p>
                <textarea onChange={(e) => setDetail(e.target.value)} cols="10" rows="2"></textarea>

                <h2>Tags</h2>
                <p>Add keywords seprated by whitespace.</p>
                <textarea onChange={(e) => setTags(e.target.value)} cols="10" rows="2"></textarea>

                <h2>Username</h2>
                <p>Should not be more than 15 character.</p>
                <textarea onChange={(e) => setUsername(e.target.value)} cols="10" rows="2"></textarea>

                <button>Post Question</button>
            </form>
        </div>
    )
};

export default NewQuestionPage;
