import React, { useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { useGetProfile, useIsClientUser } from '../../../hooks/users';
import ProfileImage from '../../profileImage';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import OutlineButton from '../../button/outlineButton';
import { useGetPostByIdQuery, useReplyPostMutation } from '../../../redux/apiSlice';
import Post from '../../post';

const PostReplyModal = (props) =>
{
    const { show, onHide, post } = props;
    const profile = post?.profile;
    const { data } = useGetPostByIdQuery(post?.repost, { skip: !post?.repost });
    const repost = data?.result;
    const navigate = useNavigate();
    const gotoProfile = (username) =>
    {
        navigate(`/profile?username=${username}`);
    };
    const isClient = useIsClientUser(profile?.username);
    const clientUsername = useSelector(state => state.authentication?.user?.username);
    const clientProfile = useGetProfile(clientUsername);
    const [replyText, setReplyText] = useState('');
    const [replyPost] = useReplyPostMutation();
    return (
        <Modal
            show={show}
            onHide={onHide}
            className=''
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <header>
                <div className='d-flex'>
                    <div className='p-0 flex-grow-1 pointer'>
                        <div className={`text-center mt-3`}>
                            <p className='fw-bold mb-0'>Reply</p>
                        </div>
                    </div>
                </div>
            </header>
            <Modal.Body>
                <div className='d-flex mb-3'>
                    <ProfileImage
                        className="mt-1 pointer"
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        src={profile?.picture}
                        onClick={() => gotoProfile(profile?.username)}
                    />
                    <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block underline-container-gray">
                        <div className="mb-3 flex-grow-1">
                            <div className='d-flex justify-content-between'>
                                <p
                                    className="m-0 mb-1 fw-bold underline pointer"
                                    onClick={() => gotoProfile(profile?.username)}
                                >
                                    {profile?.username}
                                </p>
                                <div>
                                    <span className="me-3 opacity-50">{post?.timeAgo}</span>
                                    {isClient && <BsThreeDots />}
                                </div>
                            </div>
                            <p className="m-0 mb-3">
                                {post?.content}
                            </p>
                            {repost &&
                                <div className='border rounded mb-3'>
                                    <Post className='mt-2' post={repost} interaction={false} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='d-flex mb-3'>
                    <ProfileImage
                        className="mt-1 pointer"
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        src={clientProfile?.picture}
                        onClick={() => gotoProfile(clientUsername)}
                    />
                    <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block underline-container-gray">
                        <div className="mb-3 flex-grow-1">
                            <div className='d-flex justify-content-between'>
                                <p
                                    className="m-0 mb-1 fw-bold underline pointer"
                                    onClick={() => gotoProfile(clientUsername)}
                                >
                                    {clientUsername}
                                </p>
                            </div>
                            <textarea
                                placeholder={`Reply to ${profile?.username}`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-row-reverse'>
                    <OutlineButton
                        disabled={replyText.length <= 0}
                        style={{ width: "5rem" }}
                        text='Post'
                        onClick={() =>
                        {
                            replyPost({ postId: post?._id, content: replyText });
                            setReplyText('');
                            onHide();
                        }}
                    />
                </div>
            </Modal.Body>
        </Modal >
    );

};

export default PostReplyModal;
