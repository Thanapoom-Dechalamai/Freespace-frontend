import React from 'react';
import { Modal } from 'react-bootstrap';
import UserListContainer from '../../userListContainer';
import { useGetProfileListByUsersQuery } from '../../../redux/apiSlice';

const LikesListModal = (props) =>
{
    const { show, onHide, likes } = props;
    const { data } = useGetProfileListByUsersQuery(likes ?? []); // Get profiles by following
    const profiles = data?.result;
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
                            <p className='fw-bold mb-0'>{likes?.length ?? 0} likes</p>
                        </div>
                    </div>
                </div>
            </header>
            <Modal.Body>
                <UserListContainer profiles={profiles} />
            </Modal.Body>
        </Modal>
    );

};

export default LikesListModal;
