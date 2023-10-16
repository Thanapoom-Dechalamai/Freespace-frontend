import React from 'react';
import Post from '../post';

const PostContainer = ({ posts }) =>
{

    if (!posts)
    {
        return (
            <div className='text-center'>
                <p className='opacity-75'>Oops, it appears that there are no threads here.</p>
            </div>
        );
    }

    return (
        <div>
            {
                posts?.map(post =>
                {
                    return <Post className='underline-container-gray' post={post} key={post._id} />;
                })
            }
        </div>
    );
};

export default PostContainer;