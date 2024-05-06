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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo. Phasellus dictum fermentum lorem. Morbi vehicula mauris id scelerisque condimentum. Curabitur nec nunc ac libero consequat dapibus at eget nunc. Vivamus consequat metus vel elit dapibus malesuada. Donec sollicitudin nunc vitae dui faucibus, eu gravida turpis tincidunt. Nullam scelerisque lacus sit amet diam sodales, ac blandit eros pulvinar. Cras sollicitudin rhoncus ex, eget feugiat mauris ullamcorper sit amet.
                        <br /><br />
                        Pellentesque vel justo in enim fringilla finibus. Vestibulum nec arcu vitae est bibendum pharetra. Aliquam auctor ligula sed libero congue, sed rhoncus sapien iaculis. In vitae diam nisi. Nullam dapibus ligula sit amet felis rhoncus convallis. Maecenas posuere vel mi eu placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum euismod ut metus sit amet laoreet. Duis tempus ante in semper eleifend. In hac habitasse platea dictumst.
                        <br /><br />
                        Proin vel eleifend velit, in bibendum sem. In hac habitasse platea dictumst. Mauris tempor dui vel felis volutpat, eu viverra nisl lacinia. Sed auctor rutrum erat, eu fermentum metus bibendum ut. Nam convallis, magna sed venenatis consectetur, ligula libero tincidunt turpis, non aliquet metus lorem a purus. Proin ultrices erat ut nisi eleifend tempus. In hac habitasse platea dictumst. Aliquam ut odio sit amet ipsum consectetur viverra non eget dolor. Cras volutpat nunc sit amet sollicitudin fringilla.
                    </p>
                </div>
            </div>

            <Link to="/article" className="exit-button">Exit</Link>
        </div>
    );
}

export default ArticleDetailPage;
