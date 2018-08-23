import React from 'react';
import Control from '../containers/control';
import Display from '../containers/display';

const App = () => {
    return(
        <div className="container">
            <h1>FaceCreate</h1>
            <Display>
                <Control/>
            </Display>
        </div>
    );
}

export default App;