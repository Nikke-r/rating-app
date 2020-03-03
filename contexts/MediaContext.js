import React, {useState} from 'react';

const MediaContext = React.createContext();

const MediaProvider = (props) => {
    const [media, setMedia] = useState();

    return (
        <MediaContext.Provider value={[media, setMedia]}>
            {props.children}
        </MediaContext.Provider>
    )
};

export { MediaContext, MediaProvider };