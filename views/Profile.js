import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Title, Content, Text, Left, Right, Button, Icon, Card, CardItem, Spinner } from 'native-base';
import { AsyncStorage, Image } from 'react-native';
import { fetchGet } from '../hooks/APIHooks';
const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({ navigation }) => {
    const [user, setUser] = useState();
    const [reviews, setReviews] = useState([]);

    //Get the info of the current user from the server
    const getUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userInfo = await fetchGet('users/user', '', token);
            const avatar = await fetchGet('tags', 'avatar_' + userInfo.user_id);
            setUser({
                userInfo: userInfo,
                avatar: avatar[0].filename,
            });
        } catch (error) {
            console.log('getUserInfo error: ', error.message);
        }
    };

    //Get reviews user have written
    const getOwnReviews = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetchGet('comments', '', token);
            setReviews(response);
        } catch (error) {
            console.log('getOwnReviews error: ', error.message);
        }
    }

    //Handle the logout
    const logout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Home');
        } catch (error) {
            console.log('logout error: ', error.message);
        }
    };

    useEffect(() => {
        getOwnReviews();
        getUserInfo();
    }, []);

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                        <Text>Home</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
            </Header>
            {user !== undefined ? <Content>
                <Card>
                    <CardItem header bordered>
                        <Left>
                            <Title>Username: { user.userInfo.username } </Title>
                        </Left>
                        <Body />
                        <Right>
                            <Button bordered transparent iconRight onPress={() => navigation.navigate('EditProfile')}>
                                <Text>Edit Profile</Text>
                                <Icon name='color-wand' />
                            </Button>
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        {user.avatar ? <Image source={{uri: mediaURL + user.avatar}} style={{width: null, height: 250, flex: 1}} /> : <Text note>No avatar available</Text>}
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>Full name: { user.userInfo.full_name } </Text>
                            <Text>Email: { user.userInfo.email } </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Body>
                            <Button full onPress={() => navigation.navigate('Reviews', {reviews: reviews, update: getOwnReviews})}>
                                <Text>Own reviews: {reviews.length} </Text>
                            </Button>
                            <Button danger full onPress={logout}>
                                <Text>Logout</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            :
            <Spinner />
            }
        </Container>
    );
};

export default Profile;
