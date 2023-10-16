import React from 'react';
import { useSelector } from 'react-redux';
import RegisterForm from "../../components/auth/register";
import LoginForm from "../../components/auth/login";
import { ToastContainer } from 'react-toastify';
import { FaCode } from 'react-icons/fa6';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticationPage = () =>
{
    const isLoginPage = useSelector((state) => state.authentication.isLoginPage);
    return (
        <>
            {(
                isLoginPage ?
                    <main className="authentication-page container">
                        <header className="mb-5">
                            <h1>Sign in to FreeSpace&nbsp;<FaCode /></h1>
                        </header>
                        <LoginForm />
                    </main> :
                    <main className="authentication-page container">
                        <header className="mb-5">
                            <h1>Sign up to FreeSpace&nbsp;<FaCode /></h1>
                        </header>
                        <RegisterForm />
                    </main>

            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default AuthenticationPage;