import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setLoginPage } from "../../../redux/authSlice";
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../redux/apiSlice';
import { toast } from 'react-toastify';

const RegisterForm = () =>
{
    const [register] = useRegisterMutation();
    const dispatch = useDispatch();
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData.entries());
        try
        {
            await register(dataObj).unwrap();
            dispatch(setLoginPage(true));
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
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name='firstname' required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name='lastname' required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name='username' required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' required />
            </Form.Group>


            <Button className='register-button' variant="dark" type="submit">
                Sign up
            </Button>

            <Form.Group>
                <div className='d-flex justify-content-center mt-3 opacity-50'>
                    <p className='text-decoration-underline text-dark' onClick={() => dispatch(setLoginPage(true))}>
                        Already have an account?
                    </p>
                </div>
            </Form.Group>
        </Form>
    );
};

export default RegisterForm;
