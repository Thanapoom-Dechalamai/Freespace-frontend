import { useCopyToClipboard } from '../../../hooks/tools';
import OutlineButton from "../outlineButton";
import { toast } from 'react-toastify';
const CopyButton = (props) =>
{
    const { text, value } = props;
    const [copied, copy] = useCopyToClipboard(value);
    return (
        <OutlineButton onClick={() =>
        {
            copy();
            toast.success(`Copied to clipboard`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }} text={text} />
    );
};

export default CopyButton;