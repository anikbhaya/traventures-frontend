import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm();
    const {googleSignIn, customSignIn, error, setError,setIsLoading} = useAuth()
    const history = useHistory()
    const location = useLocation()
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(userCredential => {
            history.push(location.state?.from||'/home')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onSubmit = data => {
        setIsLoading(true)
        // console.log(data.email, data.password)
        customSignIn(data.email, data.password)
        .then((userCredential) => {
            history.push(location.state?.from||'/home')
          })
          .catch((error) => {
            setError('Email or Password is incorrect')
          })
          .finally(() => setIsLoading(false))
    };

    return (
        <div className="w-96 mx-auto my-10">
            <h2 className="text-3xl text-center font-bold mb-2">Login</h2>
            <p className="text-center">Don't have an account? <NavLink className="text-primary font-medium" to="/register">Register Here</NavLink></p>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input {...register("email")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                    <p className="text-red-500">{errors.exampleRequired && <span>This field is required</span>}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" />
                    <p className="text-red-500">{errors.exampleRequired && <span>This field is required</span>}</p>
                </div>
                <div className="mb-1 text-center text-red-500">{error}</div>
                <div className="flex items-center justify-between">
                    <input type="submit" value="Login" className=" bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer mx-auto w-full" />
                    {/* <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-dark" href="#">
                            Forgot Password?
                        </a> */}
                </div>
            </form>
            <div className="flex items-center">
                <hr className="border-1 border-primary w-full" />
                <p className="px-4">or</p>
                <hr className="border-1 border-primary w-full" />
            </div>
            
            <input onClick={handleGoogleSignIn} className=" border-2 border-primary hover:bg-primary-dark  font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer mx-auto block text-center mt-4 hover:text-white w-full bg-white" type="button" value="Continue with Google" />
        </div>
    );
};

export default Login;