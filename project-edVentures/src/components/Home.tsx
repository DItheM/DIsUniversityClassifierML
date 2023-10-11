import {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import Image_1 from '../assets/c1.jpg';
import Image_2 from '../assets/c2.jpg';
import Image_3 from '../assets/c3.jpg';
import Image_4 from '../assets/c4.jpg';
import Image_s from '../assets/services_logo.png';

interface Props {
    setPage: (item: string) => void;
}

export default function Home({setPage} : Props) {

    const [showAnimationDesc, setShowAnimationDesc] = useState(false);

    useEffect(() => {
        setShowAnimationDesc(true);
      }, []);

  return (
    <div className={showAnimationDesc ? 'fade-in' : 'hide'}>

        <div className="d-flex justify-content-center align-items-center header-bg rounded hover_element">
            <div className="d-flex justify-content-center align-items-center header-bg-layer rounded">
                <div style={{textAlign: 'center'}}>
                    <h1><b>EdVentures.</b></h1>
                    <p className='text-light' style={{marginTop: "-20px"}}>Unlock your career potential with EdVentures</p>
                </div>  
            </div>
        </div>

        <div className='hover_element'>
            <Carousel>
                <Carousel.Item>
                    <CarouselImage image={Image_1} />
                    <Carousel.Caption>
                    <h3>Find Best Universities</h3>
                    <p>Find the best universities tailored to your preferences.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage image={Image_2} />
                    <Carousel.Caption>
                    <h3>Find Best Programs</h3>
                    <p>Discover the finest programs that match your aspirations.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage image={Image_3} />
                    <Carousel.Caption>
                    <h3>Get Summarized Reviews</h3>
                    <p>
                    Access concise user reviews for quick insights.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselImage image={Image_4} />
                    <Carousel.Caption>
                    <h3>Get Demand Trends</h3>
                    <p>
                    Track job demand trends with ease.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

        <div className="service-bg rounded hover_element">
            <div className="row">
                <div className="col-md-6" style={{paddingRight: "20px"}}>
                    <h2>Our Services</h2>
                    <p className='text-padding'>Our services empower you to make informed decisions about your educational and career journey. Explore and discover the ideal university tailored to your preferences with 'Find The Best Suited University.' Gain insights into the job market's future with 'Job Role Demand Prediction.' We provide the tools you need to shape your path with confidence.</p>
                    <img src={Image_s} alt="Image" className="img-fluid mx-auto d-block" width='50%' style={{marginTop: "-50px"}}/>
                </div>
                
                <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12 hover_element  bg-col rounded">
                        <h3>Find The Best Suited University</h3>
                        <p className='text-padding'><b></b>Discover your ideal educational path with 'Find The Best Suited University.' Explore personalized recommendations and tailored insights to help you make the right choice for your future.</p>
                        <button className="btn btn-primary" onClick={() => setPage("cu")}>Use Tool</button>
                    </div>
                    
                    <div className="col-md-12 mt-4 hover_element  bg-col rounded">
                        <h3>Job Role Demand Prediction</h3>
                        <p className='text-padding'>Navigate the ever-changing job market with confidence using 'Job Role Demand Prediction.' Gain insights into future job demand trends and make informed career decisions that align with the dynamic employment landscape.</p>
                        <button className="btn btn-primary" onClick={() => setPage("pd")}>Use Tool</button>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="about-us-bg rounded hover_element">
            <div className="row">
                <div className="col-md-6" style={{paddingRight: "20px"}}>
                    <h2 className='text-light'>About Us</h2>
                    <div className="hover_element bg-col-2 rounded">
                        <p className='text-padding'>Hello!</p>
                        <p className='text-padding'> We are a group of university students, embarking on an exciting final project journey that merges the world of academia with cutting-edge technology. Our passion for innovation has brought us together to create a dynamic platform that harnesses the power of machine learning.</p>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="hover_element bg-col-2 rounded">
                        <p className='text-padding'>Our project is the culmination of our collective efforts and encompasses a range of invaluable functions, including job role demand prediction, personalized university recommendations, and summarized user reviews. With four dedicated members at the helm, we've combined our skills, knowledge, and enthusiasm to deliver a comprehensive solution that empowers you to make informed decisions about your educational and career path. Welcome to our world of discovery, powered by machine learning and driven by a shared commitment to helping you shape your future with confidence.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
