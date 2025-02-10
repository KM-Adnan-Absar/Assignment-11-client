import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from 'sweetalert2';

const Register = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

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
        setLoading(true); // 

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;

        if (!regExp.test(password)) {
            setMessage("Password does not match with the requirements.");
            setLoading(false); // 
            return; 
        }

        console.log(name, email, photoUrl, password);

        // Create User & Redirect to Login
        createUser(email, password)
            .then(() => {
                e.target.reset();
                setPassword(""); 
                setMessage("");
                Swal.fire({
                    title: "Successfully Signed Up! Please log in.",
                    icon: "success",
                    draggable: true
                });
                navigate('/login'); 
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                setLoading(false); 
            });
    };

    const handleSignInGoogle = () => {
        setLoading(true);
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                setLoading(false);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div>
                                <label className="fieldset-label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Name" required />

                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="fieldset-label">Photo URL</label>
                                <input type="text" name="photoUrl" className="input" placeholder="Photo URL" />

                                <div>
                                    <label className="fieldset-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input border p-2 rounded-md"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {message && <p className="text-red-500 text-sm">{message}</p>}
                                </div>

                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button 
                                    className="btn bg-blue-950 text-white mt-4 ml-12" 
                                    type="submit"
                                    disabled={loading} 
                                >
                                    {loading ? "Signing up..." : "Signup"}
                                </button>

                                <p>Already have an account? <Link to='/login'>Signin</Link></p>
                                <p className="text-center">
                                    <button 
                                        onClick={handleSignInGoogle} 
                                        className="btn btn-ghost"
                                        disabled={loading} 
                                    >
                                        {loading ? "Signing in..." : "Google"}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
