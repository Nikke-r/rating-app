import React, {useEffect, useState} from 'react';
import {Card, CardItem, Text, Left, Body, Right, Button } from 'native-base';
import {fetchGet, fetchDel} from '../hooks/APIHooks';
import {AsyncStorage, Alert} from 'react-native';

const SingleReview = (props) => {
    const [user, setUser] = useState();
    const [reviewed, setReviewed] = useState();

    //Check if the logged user has reviewed current movie
    const getCurrUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userInfo = await fetchGet('users/user', '', token);
            if (userInfo.user_id === props.review.user_id) {
                setReviewed(true);
            }
        } catch (error) {
            console.log('getUser error: ', error.message);
        }
    };

    //Get info of reviewed user
    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetchGet('users', props.review.user_id, token);
            setUser(response);
        } catch (error) {
            console.log('Get user error: ', error.message);
        }
    };

    const confirm = () => {
        Alert.alert(
            'Warning!',
            'Are you sure you want to delete?',
            [
                {text: 'Cancel'},
                {text: 'Delete', onPress: () => deleteReview()}
            ]
        );
        const deleteReview = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                await fetchDel('comments', props.review.comment_id, token);
                props.update();
                props.navigation.goBack();
            } catch (error) {
                console.log('deleteReview error: ', error.message);
            }
        }
    }

    useEffect(() => {
        getCurrUser();
        getUser();
    }, []);

    return (
        <Card key={Math.random()}>
            <CardItem bordered>
                <Left>
                    {user ? <Text> User: {user.username}  </Text> : null}
                </Left>
                <Right>
                    <Text> Date: {props.review.time_added.split('T')[0]} </Text>
                </Right>
            </CardItem>
            <CardItem bordered>
                <Left>
                    <Text> {props.review.comment} </Text>
                </Left>
            </CardItem>
            {reviewed ?
            <CardItem>
                <Body>
                    <Button full danger onPress={confirm}>
                        <Text>Delete</Text>
                    </Button>
                </Body>
            </CardItem>
            :
            null}
        </Card>
    );
};

export default SingleReview;