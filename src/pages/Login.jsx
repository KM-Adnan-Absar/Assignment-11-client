import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const Login = () => {

    const {signInUser , signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
    
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password);
    
        signInUser(email,password)
        .then(result => {
            console.log(result.user)
            e.target.reset()
            navigate('/')
            
        })
   }

  const handleSignInGoogle = () => {

    signInWithGoogle()
    .then(result => {
        console.log(result.user);
        navigate('/')
        
    })
.catch(error => {
    console.log('ERROR',error.message);
    
})

  }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
         
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleLogin} >
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" name = 'email' className="input" placeholder="Email" />
                <label className="fieldset-label">Password</label>
                <input type="password" name = 'password' className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn bg-blue-950 text-white mt-4">Login</button>
                <p>Have you any acoount? <Link to = '/register'>Signup</Link></p>
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

export default Login;