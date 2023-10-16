import React from 'react';
import Reply from '../reply';
import Post from '../post';

const RepliesContainer = (props) =>
{
    const { replies, post } = props;
    return (
        <div>
            <Post className='underline-container-gray' post={post} interaction={false} />
            {replies.map((reply) =>
            {
                return <Reply key={reply._id} reply={reply} postId={post._id} />;
            })}
        </div>
    );
};

export default RepliesContainer;