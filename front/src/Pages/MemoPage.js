import React from 'react';


const MemoPage = () => {
    const memo = "Write your memo here";

    return (
        <div>
            <h1>Memo Page</h1>
            <input type="text" placeholder="Enter your memo" />
            <button>Save</button>
            <p>{memo}</p>
        </div>
    );
}

export default MemoPage;
