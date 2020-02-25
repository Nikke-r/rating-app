import React from 'react';
import { Container } from 'native-base';
import SearchHeader from '../components/SearchHeader';

const Home = ({navigation}) => {
    return (
        <Container>
            <SearchHeader navigation={navigation} />
        </Container>
    );
};

export default Home;