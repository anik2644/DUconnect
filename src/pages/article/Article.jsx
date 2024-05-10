import React, { useState, useEffect } from 'react';
import './article.css';
import { Link } from 'react-router-dom';

const ArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', imageFile: null, content: '' });
    const [errorMessage, setErrorMessage] = useState('');

    // Default list of articles
    const defaultArticles = [
        { id: 1, title: 'Metro DU', imageUrl: 'https://i.ibb.co/N22nbCJ/Du-metro.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 2, title: 'Curzon', imageUrl: 'https://i.ibb.co/CH8K04b/cz.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 3, title: 'Article 3', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 4, title: 'Article 4', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
    ];

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem('articles'));
        console.log("Articles retrieved from local storage:", storedArticles);
        if (storedArticles && storedArticles.length > 0) {
            setArticles(storedArticles);
        } else {
            setArticles(defaultArticles); // Set default articles if no articles are stored
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('articles', JSON.stringify(articles));
        console.log("Articles stored in local storage:", articles);
    }, [articles]);

    const handleAddArticle = () => {
        if (!newArticle.title.trim() || !newArticle.imageFile || !newArticle.content.trim()) {
            setErrorMessage('Please provide title, image, and content.');
            return;
        }

        const newId = articles.length + 1;
        const imageUrl = URL.createObjectURL(newArticle.imageFile); // Create URL for the uploaded image
        setArticles([...articles, { id: newId, title: newArticle.title, imageUrl, content: newArticle.content }]);
        setShowModal(false);
        setNewArticle({ title: '', imageFile: null, content: '' });
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'file' ? e.target.files[0] : value;
        setNewArticle({ ...newArticle, [name]: inputValue });
    };

    const handleDeleteArticle = (id) => {
        setArticles(articles.filter(article => article.id !== id));
    };

    return (
        <div className="article-page">
            <header className="article-header">
                <h1 className="article-title">DU Articles</h1>
            </header>

            <main className="article-main">
                <section className="article-list">
                    {articles.map(article => (
                        <div key={article.id} className="article-item">
                            <div className="article-image" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
                            <div className="article-content">
                                <h2>{article.title}</h2>
                                <p>{article.content}</p>
                                <Link to='/readmore' className="read-more-link">Read More</Link>
                                <button className="delete-article-btn" onClick={() => handleDeleteArticle(article.id)}>delete</button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <button onClick={() => setShowModal(true)} className="add-article-btn">Add Article</button>

            {showModal && (
                <div className="add-article-modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setShowModal(false)}>X</span>
                        <h2>Add New Article</h2>
                        <form onSubmit={handleAddArticle}>
                            <input type="text" name="title" value={newArticle.title} onChange={handleInputChange} placeholder="Title" />
                            <input type="file" name="imageFile" onChange={handleInputChange} />
                            <textarea name="content" value={newArticle.content} onChange={handleInputChange} placeholder="Content"></textarea>
                            <button type="submit">Add</button>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArticlePage;
