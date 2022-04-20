import React from 'react';

const TagsPage = ({ handleTagedQuestion, setAskQuestion, setTagsPage, questions, tags }) => {
    return (
        <div>
            <div className='quesHeader'>
                <h3>{tags.length} Tags</h3>
                <h3>All Tags</h3>
                <button onClick={() => {
                    setAskQuestion(true);
                    setTagsPage(false);
                }}>Ask A Question</button>
            </div>

            <div className='tagsContainer'>
                {tags.map((tag) => (
                    <div onClick={() => handleTagedQuestion(tag.name)} key={tag.tid} className='tagsBlock'>
                        <h3>{tag.name}</h3>
                        <p>{tag.qCnt}question</p>                        
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TagsPage;
