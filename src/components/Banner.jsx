import banner from '../assets/banner.jpg';

const Banner = () => {

return (
    <div className="relative w-full h-[550px]">
      {/* Background Image */}
      <img className="w-full h-full object-cover " src={banner} alt="Banner" />

        {/* Text Over Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Collaborate. Learn. Succeed.
        </h1>
        <p className="text-lg max-w-2xl drop-shadow-md">
          Join the future of group learning! Create assignments, submit work, and evaluate peers with ease.
        </p>
        <button className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-extrabold hover:bg-yellow-500 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
