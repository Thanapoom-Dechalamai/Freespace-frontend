import { Button } from "react-bootstrap";

const PrimaryButton = (props) =>
{
    const { text, onClick, className, style } = props;
    return (
        <Button style={style} className={`primary-btn ${className}`} onClick={onClick} variant="dark">{text}</Button>
    );
};

export default PrimaryButton;