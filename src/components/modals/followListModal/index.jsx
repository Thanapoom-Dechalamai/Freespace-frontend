import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import UserListContainer from '../../userListContainer';
import { useGetProfileListByUsersQuery } from '../../../redux/apiSlice';

const FollowListModal = (props) =>
{
    const { show, onHide, profile } = props;
    const [selectedList, setSelectedList] = useState(0);
    const { data: followingResponse } = useGetProfileListByUsersQuery(profile?.following ?? []); // Get profiles by following
    const { data: followersResponse } = useGetProfileListByUsersQuery(profile?.followers ?? []); // Get profiles by followers
    const following = followingResponse?.result;
    const followers = followersResponse?.result;
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                className=''
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <header>
                    <div className='d-flex'>
                        <div className='p-0 flex-grow-1 pointer' onClick={() => setSelectedList(0)}>
                            <div className={`text-center mt-3 ${selectedList === 0 ? 'followlist-header-selected' : 'followlist-header'}`}>
                                <p className='fw-bold mb-0'>Followers</p>
                                <p className='mb-2'>{profile?.followers?.length}</p>
                            </div>
                        </div>
                        <div className='p-0 flex-grow-1 pointer' onClick={() => setSelectedList(1)}>
                            <div className={`text-center mt-3 ${selectedList === 1 ? 'followlist-header-selected' : 'followlist-header'}`}>
                                <p className='fw-bold mb-0'>Following</p>
                                <p className='mb-2'>{profile?.following?.length}</p>
                            </div>
                        </div>
                    </div>
                </header>
                <Modal.Body>
                    <UserListContainer profiles={selectedList === 0 ? followers : following} />
                </Modal.Body>
            </Modal>
        </>
    );

};

export default FollowListModal;
