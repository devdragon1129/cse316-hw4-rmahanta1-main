import React, { useState } from 'react'


const Banner = ({ setPostAnswer, setTabs, setReset, tabs, handleKeyPress, setViewQues, setAskQuestion }) => {

    return (
        <div className='banner'>
            <div className='bannerMenu'>
                <p style={{ background: `${tabs === '1' ? '#0281E8' : ''}` }} onClick={() => {
                    setTabs('1');
                    setViewQues(false);
                    setReset(true);
                    setAskQuestion(false);
                    setPostAnswer(false);
                }}>Questions</p>
                <p
                    style={{ background: `${tabs === '2' ? '#0281E8' : ''}` }}
                    onClick={() => {
                        setTabs('2');
                        setViewQues(false);
                        setReset(false);
                        setAskQuestion(false);
                        setPostAnswer(false);
                    }}
                >Tags</p>
                <h1>Fake Stack Overflow</h1>
            </div>

            <input onKeyPress={handleKeyPress} placeholder='Search...' />
        </div>
    )
}

export default Banner
