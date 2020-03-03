import React, {useContext} from 'react';
import {List, Container, Spinner, Content, Card, CardItem, View} from 'native-base';
import Item from './Item';
import { MediaContext } from '../contexts/MediaContext';
import { getAll } from '../hooks/APIHooks';

const MediaList = (props) => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = getAll();

    setMedia(data);

    return (
        <Container>
            {loading ?
            <Spinner />
            :
            <List 
                dataArray={media}
                keyExtractor={(item, id) => id.toString()}
                contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}
                renderRow={item => <Item item={item} navigation={props.navigation} />}
            />
            }
        </Container>
    );
};

export default MediaList;
