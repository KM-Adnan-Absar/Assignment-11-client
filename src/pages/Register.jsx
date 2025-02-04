import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Register = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // Password Validation
    const handleChange = (e) => {
        const value = e.target.value; 
        setPassword(value);

        if (!regExp.test(value)) { 
            setMessage("Password must have at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long.");
        } 
        else {
            setMessage(""); 
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;
        

        if (!regExp.test(password)) {
            setMessage("Password does not match with the requirements.");
            return; 
        }
        console.log(name, email, photoUrl, password);
        // Create User
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                setMessage("");
                navigate('/');
            })
            .catch(error => {
                console.log('ERROR', error.message);
            });
    };

    const handleSignInGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.log('ERROR', error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Name" />

                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />

                                <label className="fieldset-label">PhotoUrl</label>
                                <input type="text" name="photoUrl" className="input" placeholder="PhotoUrl" />

                                <div>
                                    <label className="fieldset-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input border p-2 rounded-md"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    {message && <p className="text-red-500 text-sm">{message}</p>}
                                </div>

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-blue-950 text-white mt-4">Signup</button>
                                <p>Already have an account? <Link to='/login'>Signin</Link></p>
                                <p className="text-center">
                                    <button onClick={handleSignInGoogle} className="btn btn-ghost">Google</button>
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
