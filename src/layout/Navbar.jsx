import { Link } from 'react-router-dom';
import img from '../assets/adnan.jpg'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
const {user , signOutUser} = useContext(AuthContext);


const handleSignOutUser = () => {
signOutUser()
.then(() => {
  Swal.fire({
title: "Successfully LogOut",
icon: "success",
draggable: true
});
})
.catch(error => 
  console.log('ERROR',error.message))
}



    return (
        <div className="navbar bg-base-100 shadow-sm h-[80px]">
        <div className="flex-1 mt-2">

         <div className="lg:flex items-center">
         <img className="w-[120px]" src="/src/assets/STUDYHUB.png" alt="" />
         <a className=" font-bold text-2xl -ml-8 text-blue-950 hover:text-blue-500">StudyHub</a>
        </div>
        </div>
        <div className="flex gap-1">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

   <div className="flex gap-2">
   <div>
    {
      user ? <>
     
       <button onClick={handleSignOutUser} className="btn btn-ghost border bg-blue-950 text-white">Signout</button>
      
      </> 
      :
      <button className="btn btn-ghost border bg-blue-950 text-white"><Link to = '/login'>SignIn</Link></button>
    }
  
   </div>
   <button className="btn btn-ghost bg-blue-950 text-white"><Link to = '/register'>SignUp</Link></button>
   </div>
   </div>
   <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

{
  user ? <div className="w-10 rounded-full">
   
  <img
 
    alt="User Profile"
    src={img}
  />
</div> 
:
<>
<div>
  {/* nothing  */}
  </div>
  </>
}

    
  </div>
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  >
    <li>
      <Link to = '/createassignmentpage' className="justify-between">
        Create Assignment
       
      </Link >
    </li>
    <li><Link to = 'attemptedassignment'>My Attempted Assignments</Link></li>
    <li><Link to = '/pendingAssignment'>Pending Assignments</Link></li>
    <li><a onClick={handleSignOutUser}>Logout</a></li>
  </ul>
</div>

      </div>
    );
};

export default Navbar;