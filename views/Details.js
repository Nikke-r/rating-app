import React from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem, Tabs, Tab } from 'native-base';
import { Image } from 'react-native';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/'

const Details = ({ route, navigation }) => {
    const { details } = route.params;
    const info = JSON.parse(details.description);

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
                    <Title> {details.title} </Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Review</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Card>
                    <CardItem bordered>
                        <Image source={{uri: mediaUrl + details.filename}} style={{height: 300, width: null, flex: 1}} />
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Body>
                                <Text> {details.title} </Text>
                                <Text> Genres: {info.genres}  </Text>
                                <Text> Duration: {info.duration}  </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text> {info.description} </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                        {info.ratings.map(item => {
                            return (
                                <Text key={item.Source}> {item.Source}: {item.Value} </Text>
                            )
                        })}
                        </Body>
                    </CardItem>
                    <CardItem bordered>
                        <Text> Cast: {info.cast} </Text>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};

export default Details;
