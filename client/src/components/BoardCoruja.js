import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';

const BoardCoruja = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getCorujaBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (
                    error.response && error.data &&
                    error.response.data.message
                ) ||
                error.message || error.toString();
                setContent(_content);
            }
        );
    }, []);

    return (
        <div className='container'>
            <header className='jumbotron'>
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardCoruja;