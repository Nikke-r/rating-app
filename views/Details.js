import React, {useState, useEffect} from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem, View, Form, Textarea, Toast, Root } from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import { fetchGet, fetchPost } from '../hooks/APIHooks';
import Modal from 'react-native-modal';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/'

const Details = ({ route, navigation }) => {
    const { details } = route.params;
    const info = JSON.parse(details.description);
    const [reviews, setReviews] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userReview, setUserReview] = useState();
    const [token, setToken] = useState();

    //Get the reviews (comments) from the server for the current movie
    const getReviews = async () => {
        try {
            const response = await fetchGet('comments/file', details.file_id, '');
            setReviews(response);
        } catch (error) {
            console.log('getComments error: ', error.message);
        }
    };

    //Get token from storage to authenticate the user (see if the user is signed in or not)
    const getToken = async () => {
        try {
            const tokenFromStorage = await AsyncStorage.getItem('token');
            setToken(tokenFromStorage);
        } catch (error) {
            console.log('getToken error: ', error.message);
        }
    }

    //Handle new reviews
    const sendReview = async () => {
        try {
            const data = {
                file_id: details.file_id,
                comment: userReview
            }
            const response = await fetchPost('comments', data, token);
            if (response.comment_id) {
                getReviews();
                setModalVisible(false);
                Toast.show({
                    text: 'Review added!',
                    position: 'top',
                    type: 'success'
                })
            }
        } catch (error) {
            console.log('sendReview error: ', error.message);
        }
    }

    useEffect(() => {
        getReviews();
        getToken();
    }, []);

    return (
        <Root>
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
                    {token ? 
                    <Button transparent onPress={() => setModalVisible(true)}>
                        <Text>Add a review</Text>
                    </Button> 
                    : 
                    <Button transparent onPress={() => Toast.show({text: 'Login to review', position: 'top'})}>
                        <Text>Add a review</Text>
                    </Button>}
                </Right>
            </Header>
            <Content>
                <Card>
                    <CardItem cardBody bordered style={{justifyContent: 'center'}}>
                        <Image source={{uri: mediaUrl + details.filename}} style={{height: 300, width: 200}} />
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
                    <CardItem>
                        <Body>
                            <Button transparent full iconRight onPress={() => navigation.push('Reviews', {reviews: reviews, update: getReviews})}>
                                <Text> Reviews: {reviews.length} </Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                >
                    <View style={{backgroundColor: 'white', borderRadius: 15}}>
                        <Title style={{padding: 5}}>Write a review</Title>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder='Review...' onChangeText={text => setUserReview(text)} />
                        </Form>
                        <Button success full style={{borderRadius: 15}} onPress={sendReview}>
                            <Text>Send</Text>
                        </Button>
                    </View>
                </Modal>
            </Content>
        </Container>
        </Root>
    );
};

export default Details;
