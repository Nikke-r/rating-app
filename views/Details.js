import React from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem, Tabs, Tab } from 'native-base';
import { Image } from 'react-native';

const Details = ({ route, navigation }) => {
    const { details } = route.params;

    return (
        <Container>
            <Header>
                <Left>
                    <Button iconLeft transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                        <Text style={{fontSize: 20}}>Back</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>Add</Title>
                </Body>
                <Right />
            </Header>
            <Content scrollEnabled={false}>
                <Card>
                    <CardItem bordered>
                        {details.Poster ? <Image source={{uri: details.Poster}} style={{height: 200, width: null, flex: 1}} /> : null}
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Title> {details.Title} </Title>
                            <Text> Genres: {details.Genre} </Text>
                            <Text> Duration: {details.Runtime} </Text>
                        </Body>
                    </CardItem>
                    <CardItem bordered>
                        {details.Ratings.map(rating => {
                            <Text> {rating.Source}: {rating.Value} </Text>
                        })}
                    </CardItem>
                    <CardItem bordered>
                        <Text> {details.Plot} </Text>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};

export default Details;
