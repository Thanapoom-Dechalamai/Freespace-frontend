import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setAccessToken, setLoginPage } from "../../../redux/authSlice";
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../redux/apiSlice';
import { toast } from 'react-toastify';

const LoginForm = () =>
{
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData.entries());
        try
        {
            let result = await login(dataObj).unwrap();
            dispatch(setAccessToken(result.accessToken));
        } catch (error)
        {
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
        <Form className='w-100' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" name='email' required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' required />
            </Form.Group>
            <Button className='register-button' variant="dark" type="submit">
                Sign in
            </Button>
            <Form.Group>
                <div className='d-flex justify-content-center mt-3 opacity-50'>
                    <p className='text-decoration-underline text-dark' onClick={() => dispatch(setLoginPage(false))}>
                        You don't have an account yet?
                    </p>
                </div>
            </Form.Group>
        </Form>
    );
};

export default LoginForm;
