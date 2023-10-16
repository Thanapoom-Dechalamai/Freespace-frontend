import { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import AvatarsModal from "../avatarsModal";
import { toast } from 'react-toastify';
import { useEditProfileMutation } from '../../../redux/apiSlice';
import { useNavigate } from 'react-router';

const EditProfileModal = (props) =>
{
    const { show, onHide, profile } = props;
    const [avatarsModalShow, setAvatarsModalShow] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(profile?.picture);
    const [editProfile] = useEditProfileMutation();
    const navigate = useNavigate();
    const handleSubmit = async (event, selectedAvatar) =>
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('picture', selectedAvatar);
        const dataObj = Object.fromEntries(formData.entries());
        try
        {
            let result = await editProfile(dataObj).unwrap();
            if (result.status === 200)
            {
                onHide();
                toast.success(`Success`, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/profile');
            }
        } catch (error)
        {
            console.log(error);
            toast.error(`${error.data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    };
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-100 d-flex justify-content-end'>
                        <div className="circle-image-con">
                            <Image onClick={() => setAvatarsModalShow(true)} className="circle-image" src={selectedAvatar} />
                        </div>
                    </div>
                    <Form className='w-100' onSubmit={(event) => handleSubmit(event, selectedAvatar)}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" name='firstname' defaultValue={profile?.firstname} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" name='lastname' defaultValue={profile?.lastname} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' defaultValue={profile?.username} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" placeholder="Enter bio" name='caption' defaultValue={profile?.caption} />
                        </Form.Group>

                        <Button className='register-button' variant="dark" type="submit">
                            Done
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <AvatarsModal className="w-50" show={avatarsModalShow} onHide={() => setAvatarsModalShow(false)} setSelectedAvatar={setSelectedAvatar} />
        </>
    );

};

export default EditProfileModal;
