import { getAuth, updateProfile } from '@firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {customSignUp, error, setError, googleSignIn,setIsLoading} = useAuth()
    const history = useHistory()
    const location = useLocation()

    const handleGoogleSignIn = () => {
        setIsLoading(true)
        googleSignIn()
        .then(result => {
            history.push(location.state?.from||'/home')
        })
        .catch(error => {
            if(String(error.code) === 'auth/popup-closed-by-user')
            setError('Popup Closed')
        })
        .finally(() => setIsLoading(false))
    }

    
    const auth = getAuth()

    const onSubmit = data => {
        setIsLoading(true)
        customSignUp(data.email, data.password)
        .then(async (userCredential) => {

            await updateProfile(auth.currentUser, {
                displayName: data.displayName
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });

            console.log(userCredential)
            history.push(location.state?.from||'/home')
          })
          .catch((error) => {
            if(String(error.code) === 'auth/email-already-in-use')
            setError('Email already used!')
        
            if(String(error.code) === 'auth/weak-password')
            setError('Password should be at least 6 characters')
          })
          .finally(() => setIsLoading(false))
    };

    return (
        <div className="w-96 mx-auto my-10">
            <h2 className="text-3xl text-center font-bold mb-2">Register Here</h2>
            <p className="text-center">Already have an account? <NavLink className="text-primary font-medium" to="/login">Login Here</NavLink></p>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                        Full Name
                    </label>
                    <input  id="displayName" {...register("displayName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Full Name" />
                    <p className="text-red-500">{errors.exampleRequired && <span>This field is required</span>}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input  id="email" {...register("email")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                    <p className="text-red-500">{errors.exampleRequired && <span>This field is required</span>}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input id="password" {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" />
                    <p className="text-red-500">{errors.exampleRequired && <span>This field is required</span>}</p>
                </div>
                <div className="mb-1 text-center text-red-500">{error}</div>
                <div className="flex items-center justify-between">
                    <input type="submit" value="Register" className=" bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer mx-auto w-full" />
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

export default Register;