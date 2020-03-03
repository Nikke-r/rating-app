import React from 'react';
import { Container, Content } from 'native-base';
import SearchHeader from '../components/SearchHeader';
import MediaList from '../components/MediaList';

const Home = ({navigation}) => {
    
    return (
        <Container>
            <SearchHeader navigation={navigation} />
            <MediaList navigation={navigation} />
        </Container>
    );
};

export default Home;