

const FeatureCard = ({feature}) => {

    const {title , description , image } = feature

    return (
        <div>
          <div className="card bg-base-100 w-96 shadow-sm mt-8">
        <figure className="px-10 pt-10">
          <img 
            src={image}
            alt="assignment"
            className="rounded-xl w-96 h-72 object-cover" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          
        </div>
 </div>

      
        </div>
    );
};

export default FeatureCard;