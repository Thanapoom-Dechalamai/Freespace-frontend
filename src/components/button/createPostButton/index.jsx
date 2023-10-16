import React, { useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import CreatePostModal from '../../modals/creatPostModal';

const CreatePostButton = ({ style, className }) =>
{
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <HiOutlinePencilAlt onClick={() => setModalShow(true)} style={style} className={className} />
            <CreatePostModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default CreatePostButton;