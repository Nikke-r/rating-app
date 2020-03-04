import React, { useEffect, useState, useContext} from 'react';
import {List, Content, View, Text, Picker, Form, Icon, Spinner} from 'native-base';
import Item from './SingleItem';
import { MediaContext } from '../contexts/MediaContext';
import { getAll } from '../hooks/APIHooks';
import SingleItem from './SingleItem';

const MediaList = (props) => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = getAll();
    const [drama, setDrama] = useState([]);
    const [action, setAction] = useState([]);
    const [scifi, setScifi] = useState([]);
    const [documentary, setDocumentary] = useState([]);
    const [comedy, setComedy] = useState([]);
    const [filter, setFilter] = useState('all');
    setMedia(data);

    useEffect(() => {
        const genres = () => {
            setDrama([]);
            setScifi([]);
            setComedy([]);
            setDocumentary([]);
            setAction([]);
            media.forEach(item => {
                const info = JSON.parse(item.description);
                if (info.genres.split(', ').includes('Drama')) {
                    setDrama(drama => [...drama, item]);
                } 
                if (info.genres.split(', ').includes('Action')) {
                    setAction(action => [...action, item]);
                } 
                if (info.genres.split(', ').includes('Sci-Fi')) {
                    setScifi(scifi => [...scifi, item]);
                } 
                if (info.genres.split(', ').includes('Documentary')) {
                    setDocumentary(documentary => [...documentary, item]);
                }  
                if (info.genres.split(', ').includes('Comedy')) {
                    setComedy(comedy => [...comedy, item]);
                }
            });
        };

        if (media) {
            genres();
        }

    }, [media]);

    return (
        <Content>
            {loading ? <Spinner /> :
            <Content>
            <Form>
                <Picker
                    mode='dropdown'
                    iosIcon={<Icon name='arrow-down' />}
                    selectedValue={filter}
                    onValueChange={value => setFilter(value)}
                >
                    <Picker.Item label='All' value='all' />
                    <Picker.Item label='Action' value='action' />
                    <Picker.Item label='Comedy' value='comedy' />
                    <Picker.Item label='Drama' value='drama' />
                    <Picker.Item label='Documentary' value='doc' />
                    <Picker.Item label='Sci-Fi' value='scifi' />
                </Picker>
            </Form>
            {action.length > 0 ?
            <View>
            <Text style={{fontWeight: 'bold', paddingLeft: 5}}>Action</Text>
            <List
                dataArray={action}
                horizontal={true}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => <SingleItem item={item} navigation={props.navigation} />}
            /> 
            </View>
            : 
            null}
            {drama.length > 0 ?
            <View>
            <Text style={{fontWeight: 'bold', paddingLeft: 5}}>Drama</Text>
            <List
                dataArray={drama}
                horizontal={true}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => <SingleItem item={item} navigation={props.navigation} />}
            /> 
            </View>
            : 
            null}
            {documentary.length > 0 ?
            <View>
            <Text style={{fontWeight: 'bold', paddingLeft: 5}}>Documentary</Text>
            <List
                dataArray={documentary}
                horizontal={true}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => <SingleItem item={item} navigation={props.navigation} />}
            /> 
            </View>
            : 
            null}
            {scifi.length > 0 ?
            <View>
            <Text style={{fontWeight: 'bold', paddingLeft: 5}}>Sci-FI</Text>
            <List
                dataArray={scifi}
                horizontal={true}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => <SingleItem item={item} navigation={props.navigation} />}
            /> 
            </View>
            : 
            null}
            {comedy.length > 0 ?
            <View>
            <Text style={{fontWeight: 'bold', paddingLeft: 5}}>Comedy</Text>
            <List
                dataArray={comedy}
                horizontal={true}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => <SingleItem item={item} navigation={props.navigation} />}
            /> 
            </View>
            : 
            null}
            </Content>}
        </Content>
    );
};

export default MediaList;
