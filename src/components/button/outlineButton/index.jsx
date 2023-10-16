import { Button } from "react-bootstrap";

const OutlineButton = (props) =>
{
    const { text, onClick, style, className, disabled = false } = props;
    return (
        <Button disabled={disabled} style={style} className={`trans-btn ${className}`} onClick={onClick} variant="outline-dark">{text}</Button>
    );
};

export default OutlineButton;