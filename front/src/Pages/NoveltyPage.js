import React from 'react';


const NoveltyPage = () => {
    const novelty = "Write your novelty here";

    return (
        <div>
            <h1>Novelty Page</h1>
            <input type="text" placeholder="Enter your novelty" />
            <button>Save</button>
            <p>{novelty}</p>
        </div>
    );
}

export default NoveltyPage;
