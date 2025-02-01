

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 -mt-2">
         <div className="flex items-center  ">
         <img className="w-[120px]" src="/src/assets/STUDYHUB.png" alt="" />
         <a className=" font-bold text-xl -ml-8 text-blue-950 hover:text-blue-500">StudyHub</a>
        
         </div>
        </div>
        <div className="flex gap-1">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
   <div className="flex gap-2">
   <button className="btn btn-ghost border bg-blue-950 text-white">SignIn</button>
   <button className="btn btn-ghost bg-blue-950 text-white">SignUp</button>
   </div>
        
        </div>
      </div>
    );
};

export default Navbar;