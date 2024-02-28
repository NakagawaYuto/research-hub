import React from 'react';


const ThemePage = () => {
    const researchTheme = "Write your theme here";

    return (
        <div>
            <h1>Theme Page</h1>
            <input type="text" placeholder="Enter your theme" />
            <button>Save</button>
            <p>{researchTheme}</p>
        </div>
    );
}

export default ThemePage;
