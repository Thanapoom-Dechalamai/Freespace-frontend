import React from 'react';
import { Modal } from 'react-bootstrap';
import RepliesContainer from '../../repliesContainer';

const PostRepliesModal = (props) =>
{
    const { show, onHide, post } = props;

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
                            <p className='fw-bold mb-0'>{post?.comments?.length} Replies</p>
                        </div>
                    </div>
                </div>
            </header>
            <Modal.Body>
                <RepliesContainer replies={post?.comments} post={post} />
            </Modal.Body>
        </Modal >
    );

};

export default PostRepliesModal;
