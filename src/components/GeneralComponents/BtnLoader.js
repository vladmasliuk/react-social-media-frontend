import React from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';

const BtnLoader = () => {
    return (
        <CircularProgress size={25} style={{color: "#7ed6df", marginLeft: 20}}/>
    )
};

export default BtnLoader;
