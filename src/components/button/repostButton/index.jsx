import React, { useState } from 'react';
import { PiArrowsClockwiseFill } from 'react-icons/pi';
import RepostModal from '../../modals/repostModal';

const RepostButton = ({ style, className, post }) =>
{
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <PiArrowsClockwiseFill onClick={() => setModalShow(true)} style={style} className={className} />
            <RepostModal show={modalShow} onHide={() => setModalShow(false)} post={post} />
        </>
    );
};

export default RepostButton;