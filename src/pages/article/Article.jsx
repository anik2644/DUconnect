import "../../style.scss"
import React from 'react';
import './article.css'; // Import your custom CSS file for styling
import '../../style.scss';

const ArticlePage = () => {
    // Sample data for articles with image URLs
    const articles = [
        { id: 1, title: 'Article 1', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 2, title: 'Article 2', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 3, title: 'Article 3', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 4, title: 'Article 4', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 5, title: 'Article 5', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 6, title: 'Article 6', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 7, title: 'Article 7', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 8, title: 'Article 8', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 9, title: 'Article 9', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 10, title: 'Article 10', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
    ];

    return (
        <div className="article-page">
            <header className="article-header">
                <h1 className="article-title">DU Connect Articles</h1>
            </header>
            <main className="article-main">
                <section className="article-list">
                    {articles.map(article => (
                        <div key={article.id} className="article-item">
                            <div className="article-image" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
                            <div className="article-content">
                                <h2>{article.title}</h2>
                                <p>{article.content}</p>
                                <button className="read-more-btn">Read More</button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <footer className="article-footer">
                <p>Explore more articles on DU Connect!</p>
            </footer>
        </div>
    );
}

export default ArticlePage;
