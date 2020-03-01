import React from 'react';
import { Container, Content, Text, Header, Body, Title } from 'native-base';
import UploadForm from '../components/UploadForm';

const Upload = ({ navigation }) => {
    return (
        <Container>
            <UploadForm navigation={navigation} />
        </Container>
    );
};

export default Upload;
