import { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";


const Features = () => {

const [features , setFeatures] = useState([])

useEffect( () => {
fetch('features.json')
.then(res => res.json())
.then(data => {
    setFeatures(data);
    
})

},[])


    return (
      <div>
        {/* Feature headlines  */}
        <div>
        <h2 className="text-4xl font-extrabold text-center text-blue-950 mt-8">Enhance Your Learning Journey with Our Core Features</h2>

        </div>

        {/* Features map  */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {
           features.map((feature , index) => 
            (<FeatureCard key = {index} feature = {feature}>

            </FeatureCard> ))}
       </div>




      </div>
    );
};

export default Features;