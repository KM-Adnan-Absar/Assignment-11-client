import Banner from "../components/Banner";
import Faq from "../components/Faq";
import Features from "../components/Features";
import AssignmentPage from '../pages/AssignmentPage'

const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            
            <Features></Features>
            <Faq></Faq>
            <AssignmentPage></AssignmentPage>
        </div>
    );
};

export default Home;