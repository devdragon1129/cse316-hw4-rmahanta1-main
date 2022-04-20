import moment from 'moment';
import { useEffect } from 'react';

const AnswersPage = ({ setPostAnswer, setAskQuestion, viewQusetion }) => {

    return (
        <>
            <div className='quesHeader'>
                <h3>{viewQusetion?.answers?.length} Answers</h3>
                <h3>{viewQusetion?.title}</h3>
                <button onClick={() => setAskQuestion(true)}>Ask A Question</button>
            </div>

            <div className='questionRow'>
                <div className='firstColumn'>
                    <h3>{viewQusetion?.views} Views</h3>
                </div>

                <div className='allQuestion'>
                    <p>{viewQusetion?.text}</p>
                </div>

                <div className='thirdColumn'>
                    <p>Asked By <span>{viewQusetion?.asked_by}</span></p>
                    <p>On <span>{moment(viewQusetion?.ask_date_time).format("MMM Do YY")}</span></p>
                    <p>At <span>{moment(viewQusetion?.ask_date_time).format("h:mm")}</span></p>
                </div>
            </div>

            {viewQusetion?.answers?.map((item) => (
                <div className='questionRow'>
                    <div className='allQuestionddd'>
                        <p>
                            {item.text}
                        </p>
                    </div>

                    <div className='thirdColumndd'>
                        <p>Ans By <span>{item.ans_by}</span></p>
                        <p>On <span>{moment(item.ask_date_time).format("MMM Do YY")}</span></p>
                        <p>At <span>{moment(item.ask_date_time).format("h:mm")}</span></p>
                    </div>
                </div>
            ))}

            <div className='answerQuestion'>
                <button onClick={() => setPostAnswer(true)}>Answer Question</button>
            </div>
        </>
    )
};

export default AnswersPage;
