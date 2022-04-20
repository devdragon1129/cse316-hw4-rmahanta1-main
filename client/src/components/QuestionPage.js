import React from 'react';
import moment from 'moment';

const QuestionPage = ({ questions, handleViewQuestion, setAskQuestion }) => {

    return (
        <>
            <div className='quesHeader'>
                <h3>{questions.length} Questions</h3>
                <h3>All Questions</h3>
                <button onClick={() => {
                    setAskQuestion(true);
                }}>Ask A Question</button>
            </div>

            {questions.length === 0 ?
                <h2 style={{ paddingTop: '50px' }}>No Questions Found</h2>
                :
                <>
                    {questions.map((item) => (
                        <div key={item.qid} className='questionRow'>

                            <div className='firstColumn'>
                                <h3>{item.views} Views</h3>
                                <h3>{item.answerCnt} Answers</h3>
                            </div>

                            <div className='allQuestion'>
                                <h3 onClick={() => handleViewQuestion(item.qid)} >{item.title}</h3>
                                <div className='tags'>
                                    {item.tags == undefined ? <div/> : item.tags.map((tag) => (
                                        <p key={tag.tid}>{tag.name}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='thirdColumn'>
                                <p>Asked by <span>{item.asked_by}</span></p>
                                <p>On <span>{moment(item.ask_date_time).format("MMM Do YY")}</span></p>
                                <p>At <span>{moment(item.ask_date_time).format("h:mm")}</span></p>
                            </div>
                        </div>
                    ))}
                </>
            }
        </>
    )
};

export default QuestionPage;
