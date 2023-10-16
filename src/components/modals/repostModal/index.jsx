import React, { useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { useGetProfile } from '../../../hooks/users';
import ProfileImage from '../../profileImage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import OutlineButton from '../../button/outlineButton';
import { useRepostMutation } from '../../../redux/apiSlice';
import Post from '../../post';

const RepostModal = (props) =>
{
    const { show, onHide, post } = props;
    const navigate = useNavigate();
    const gotoProfile = (username) =>
    {
        navigate(`/profile?username=${username}`);
    };
    const username = useSelector(state => state.authentication?.user?.username);
    const profile = useGetProfile(username);
    const [postText, setPostText] = useState('');
    const [repost] = useRepostMutation();
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
                            <p className='fw-bold mb-0'>Repost</p>
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
                        onClick={() => gotoProfile(username)}
                    />
                    <div className="justify-content-between flex-grow-1 ms-2 d-inline-block">
                        <div className="mb-3">
                            <div className='d-flex justify-content-between'>
                                <p
                                    className="m-0 mb-1 fw-bold underline pointer"
                                    onClick={() => gotoProfile(username)}
                                >
                                    {username}
                                </p>
                            </div>
                            <textarea
                                placeholder={`Start a thread...`}
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                        </div>
                        <div className='border rounded'>
                            <Post className='mt-2' post={post} interaction={false} />
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-row-reverse'>
                    <OutlineButton
                        disabled={postText.length <= 0}
                        style={{ width: "5rem" }}
                        text='Post'
                        onClick={() =>
                        {
                            repost({ content: postText, repost: post?._id });
                            setPostText('');
                            onHide();
                        }}
                    />
                </div>
            </Modal.Body>
        </Modal >
    );

};

export default RepostModal;
