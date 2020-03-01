import React, { useEffect } from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem, Tabs, Tab } from 'native-base';
import { Image } from 'react-native';

const Add = ({ route, navigation }) => {
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
                            <Title> {details.Title} <Text note > {details.Type} </Text> </Title>
                            <Text> Genres: {details.Genre} </Text>
                            <Text> Duration: {details.Runtime} </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Button full success>
                    <Text>Add to database</Text>
                </Button>
            </Content>
        </Container>
    );
};

export default Add;
