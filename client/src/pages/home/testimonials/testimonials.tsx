import React from 'react';
import {BsFillStarFill} from 'react-icons/bs';

import "./testimonials.scss";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import dp from "../../../assets/dp/2.jpg";

const Testimonials = () => {
    return (
        <div className="testimonials">
            <ContentWrapper>
                <div className="testimonialTitle">Testimonials</div>
                <div className="testimonialContainer">
                    <div className="testimonial">
                        <div className="left">
                            <div className="vline">
                                <div className="vlineImg">
                                    <Img src={dp} className=''/>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="title">Our Client Feedback</div>
                            <div className="feedback">"Effortlessly managed my player data, equipment details, and stay updated with live match information using this secure and user-friendly sports management platform."</div>
                            <div className="details">
                                <div className="name">SHREY S.</div>
                                <div className="designation">FULL STACK DEVELOPER</div>
                                <div className="stars">
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="left">
                            <div className="vline">
                                <div className="vlineImg">
                                    <Img src={dp} className=''/>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="title">Our Client Feedback</div>
                            <div className="feedback">"Effortlessly managed my player data, equipment details, and stay updated with live match information using this secure and user-friendly sports management platform."</div>
                            <div className="details">
                                <div className="name">SHREY S.</div>
                                <div className="designation">FULL STACK DEVELOPER</div>
                                <div className="stars">
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="left">
                            <div className="vline">
                                <div className="vlineImg">
                                    <Img src={dp} className=''/>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="title">Our Client Feedback</div>
                            <div className="feedback">"Effortlessly managed my player data, equipment details, and stay updated with live match information using this secure and user-friendly sports management platform."</div>
                            <div className="details">
                                <div className="name">SHREY S.</div>
                                <div className="designation">FULL STACK DEVELOPER</div>
                                <div className="stars">
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                    <BsFillStarFill size={18} color='#b2005c'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Testimonials;