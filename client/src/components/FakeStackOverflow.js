import Model from '../models/model.js';
import AnswersPage from './AnswersPage.js';
import Banner from './Banner.js';
import NewQuestionPage from './NewQuestionPage.js';
import PostAnswer from './PostAnswer.js';
// import QuestionHeader from './QuestionHeader.js';
// import QuestionRow from './QuestionRow.js';
import TagsPage from './TagsPage.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionPage from './QuestionPage.js';


const data = new Model();

let qArray = data.data.questions;
let tagArray = data.data.tags;
let ansArray = data.data.answers;


const FakeStackOverflow = () => {

	const [viewQuestion, setViewQuestion] = useState(false);
	const [modalData, setModalData] = useState(data.data);


	const [tagsPage, setTagsPage] = useState(false);
	const [questions, setQusetions] = useState([]);
	const [tags, setTags] = useState([]);

	// =====================
	const [tabs, setTabs] = useState('1');
	const [viewQusetion, setViewQusetion] = useState({});
	const [viewQues, setViewQues] = useState(false);
	const [filterQusetions, setFilterQusetions] = useState([]);

	const [reset, setReset] = useState(false);
	const [askQuestion, setAskQuestion] = useState(false);
	const [postAnswer, setPostAnswer] = useState(false);
	const [questionId, setQuestionId] = useState('');

	// ============================

	//FETCH ALL QUESTION FROM DATABASE

	const fetchAllQuestion = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/question/getAllquestions');
			setQusetions(res.data);
			const result = await axios.get('http://localhost:8000/api/tag/gettags');
			setTags(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAllQuestion();
	}, [reset])


	useEffect(() => {
		setFilterQusetions(questions);
	}, [questions, reset])


	// =======================



	// HANDLE VIEW QUESTION FROM TAG PAGE
	const handleTagedQuestion = (name) => {
		setTabs('1');
		const filterResult = questions.filter((item) => item.tags.some((data) => data.name === name));
		setFilterQusetions(filterResult);
	};


	// HANDLE SEARCH ON PRESS ENTER KEY
	const handleKeyPress = (event) => {
		const value = event.target.value.split(' ');

		if (event.key === 'Enter') {
			let prepareArr = []

			value.map((item) => {
				if (item.charAt(0) === '[' && item.charAt(item.length - 1) === ']') {
					const filterResult = questions.filter((val) => val.tags.some((tag) => tag.name.toLowerCase().includes(item.replace(/[^a-zA-Z ]/g, "").toLowerCase())))
					prepareArr.push(...filterResult)
				}

				if (item.charAt(0) !== '[' && item.charAt(item.length - 1) !== ']') {
					const filterResult = questions.filter((val) => val.title.toLowerCase().includes(item.toLowerCase()) ||
						val.text.toLowerCase().includes(item.toLowerCase())
					);
					prepareArr.push(...filterResult);
				}
			})
			setFilterQusetions(prepareArr);
		};
	};


	// HANDLE VIEW QUSETION
	const handleViewQuestion = async (id) => {
		setReset(false);
		setQuestionId(id);
		setViewQues(true);
		try {
			const res = await axios.get(`http://localhost:8000/api/question/select/${id}`);
			setViewQusetion(res.data);
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<>
			<Banner
				setTabs={setTabs}
				setViewQues={setViewQues}
				tabs={tabs}
				setReset={setReset}
				setAskQuestion={setAskQuestion}
				setPostAnswer={setPostAnswer}
				handleKeyPress={handleKeyPress}
			/>
			<div className='container mainBody'>
				{
					!postAnswer ?
						<>
							{!askQuestion ?
								<>
									{!viewQues ?
										<>
											{tabs === '1' ?
												<QuestionPage
													questions={filterQusetions}
													handleViewQuestion={handleViewQuestion}
													setAskQuestion={setAskQuestion}
												/>
												:
												<TagsPage
													tags={tags}
													questions={questions}
													handleTagedQuestion={handleTagedQuestion}
													setAskQuestion={setAskQuestion}
												/>
											}
										</>
										:
										<AnswersPage
											viewQusetion={viewQusetion}
											setAskQuestion={setAskQuestion}
											setPostAnswer={setPostAnswer}
										/>
									}
								</>
								:
								<NewQuestionPage
									fetchAllQuestion={fetchAllQuestion}
									setAskQuestion={setAskQuestion}
								/>
							}
						</>
						:
						<PostAnswer
							fetchAllQuestion={fetchAllQuestion}
							questionId={questionId}
							setPostAnswer={setPostAnswer}
						/>

				}
			</div>
		</>

	)
};

export default FakeStackOverflow;
