import React, { useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { useGetProfile } from '../../../hooks/users';
import ProfileImage from '../../profileImage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import OutlineButton from '../../button/outlineButton';
import { useCreatePostMutation } from '../../../redux/apiSlice';

const CreatePostModal = (props) =>
{
    const { show, onHide } = props;
    const navigate = useNavigate();
    const gotoProfile = (username) =>
    {
        navigate(`/profile?username=${username}`);
    };
    const username = useSelector(state => state.authentication?.user?.username);
    const profile = useGetProfile(username);
    const [postText, setPostText] = useState('');
    const [createPost] = useCreatePostMutation();
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
                            <p className='fw-bold mb-0'>New thread</p>
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
                    <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block underline-container-gray">
                        <div className="mb-3 flex-grow-1">
                            <div className='d-flex justify-content-between'>
                                <p
                                    className="m-0 mb-1 fw-bold underline pointer"
                                    onClick={() => gotoProfile(username)}
                                >
                                    {username}
                                </p>
                            </div>
                            <InputGroup id='reply-input'>
                                <textarea
                                    placeholder={`Start a thread...`}
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </InputGroup>
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
                            createPost(postText);
                            setPostText('');
                            onHide();
                        }}
                    />
                </div>
            </Modal.Body>
        </Modal >
    );

};

export default CreatePostModal;
