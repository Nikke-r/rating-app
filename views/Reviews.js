import React from 'react';
import {Container, Header, Body, Title, Left, Button, Icon, Right, Content, Card, CardItem, Text, List} from 'native-base';
import SingleReview from '../components/SingleReview';

const Reviews = ({ route, navigation }) => {
    const { reviews } = route.params;

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Reviews</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                {reviews.map(review => {
                    return (
                        <SingleReview key={Math.random()} review={review} title={title} navigation={navigation} />
                    )
                })}
            </Content>
        </Container>
    );
};

export default Reviews;
