import * as React from 'react';
import loadingSVG from '../../assets/images/loading.svg';

const Loading: React.SFC = () => {
    const style = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '150px',
		width: '100vw',
		backgroundColor: 'white'
    };
    
    return (
        <div style={style}>
            <img src={loadingSVG} alt="loading"/>
        </div>
    );
};

export default Loading;
