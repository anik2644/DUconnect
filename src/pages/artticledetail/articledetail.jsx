import React from 'react';
import './article-detail.scss';
import { Link } from 'react-router-dom';

const ArticleDetailPage = () => {
    return (
        <div className="article-detail-page">
            <div className="author-info">
                <div className="profile-picture">
                    <img src="https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg" alt="Profile" />
                </div>
                <div className="author-details">
                    <h2>Anik Abdullah</h2>
                    <p>BSc in Computer Science and Engineering, University of Dhaka</p>
                </div>
            </div>
            <h1 className="article-title">Curzon Hall</h1>
            <div className="cover-photo">
                <img src="https://i.ibb.co/h2Yfp6f/dud.jpg" alt="Cover Photo" />
            </div>
            <div className="article-description">
                <div className="scrollable-description">
                    <p>
                        The Dhaka Metro Rail project stands as a monumental initiative in Bangladesh's quest for modernization and urban development. In a city plagued by traffic congestion and inadequate transportation infrastructure, the metro rail system promises to revolutionize the way people commute, connect, and thrive. This essay delves into the significance, challenges, and potential impact of the Dhaka Metro Rail on the city and its inhabitants.
                        <br /><br />
                        The significance of the Dhaka Metro Rail cannot be overstated. As one of the largest infrastructure projects in Bangladesh's history, it represents a beacon of hope amidst the chaos of Dhaka's streets. With the city's population swelling and traffic congestion reaching unbearable levels, the metro rail offers a lifeline for commuters seeking a faster, more reliable mode of transportation. Beyond mere convenience, the metro rail embodies the aspirations of a city striving for progress and prosperity.
                        <br /><br />
                        However, the journey towards realizing the Dhaka Metro Rail has been fraught with challenges. From land acquisition disputes to funding shortages, the project has faced formidable obstacles at every turn. Delays in construction and logistical hurdles have tested the patience of both policymakers and citizens alike. Yet, amidst these challenges, there lies a resilience and determination to surmount them, driven by the belief in the transformative potential of the metro rail system.
                        <br /><br />
                        Once operational, the Dhaka Metro Rail has the power to reshape the city's transportation landscape and catalyze economic growth. By providing a swift, efficient mode of transit, it will enhance connectivity, reduce travel time, and stimulate commerce. Moreover, the metro rail's capacity to alleviate traffic congestion and reduce emissions holds the promise of a cleaner, more sustainable urban environment. As Dhaka embraces the metro rail era, it embarks on a journey towards a more vibrant, inclusive, and resilient future.
                        <br /><br />
                        In conclusion, the Dhaka Metro Rail represents more than just a means of transportation—it embodies the hopes and aspirations of a city striving for progress and prosperity. Despite the challenges encountered along the way, the relentless pursuit of this transformative vision underscores the resilience and determination of Bangladesh's people. As the metro rail system takes shape, it holds the potential to redefine Dhaka's identity, unlocking new opportunities and possibilities for generations to come.
                        <br /><br />
                        In conclusion, the Dhaka Metro Rail represents more than just a means of transportation—it embodies the hopes and aspirations of a city striving for progress and prosperity. Despite the challenges encountered along the way, the relentless pursuit of this transformative vision underscores the resilience and determination of Bangladesh's people. As the metro rail system takes shape, it holds the potential to redefine Dhaka's identity, unlocking new opportunities and possibilities for generations to come.
                    </p>
                </div>
            </div>

            <Link to="/article" className="exit-button">Exit</Link>
        </div>
    );
}

export default ArticleDetailPage;
