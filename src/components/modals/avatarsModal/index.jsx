import { Modal, Image } from 'react-bootstrap';
import { useGetAvatarsQuery } from '../../../redux/apiSlice';

const AvatarsModal = (props) =>
{
    const { show, onHide, setSelectedAvatar } = props;
    const { data, error, isLoading } = useGetAvatarsQuery();
    const images = data?.result;
    if (isLoading)
    {
        return (
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Avatars
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Loading avatars...</h2>
                </Modal.Body>
            </Modal>
        );
    }
    if (error)
    {
        return (
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Avatars
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Error {error?.data?.message}</h2>
                </Modal.Body>
            </Modal>
        );
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Avatars
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-wrap gap-2'>
                    {images?.map((image) =>
                        <div key={image} className='circle-image-con'>
                            <Image onClick={() =>
                            {
                                setSelectedAvatar(image);
                                onHide();
                            }} src={image} className='circle-image' />
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );

};

export default AvatarsModal;
