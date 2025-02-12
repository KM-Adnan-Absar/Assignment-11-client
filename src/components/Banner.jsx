import banner from '../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="relative w-full h-[550px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
      {/* Background Image */}
      <img className="w-full h-full object-cover" src={banner} alt="Banner" />

      {/* Text Over Image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Collaborate. Learn. Succeed.
        </h1>
        <p className="text-sm md:text-lg lg:max-w-2xl drop-shadow-md">
          Join the future of group learning! Create assignments, submit work, and evaluate peers with ease.
        </p>
        <button className="mt-6 bg-blue-950 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-extrabold hover:bg-yellow-500 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
