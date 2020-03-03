import {useState, useEffect} from 'react';
const baseURL = 'http://media.mw.metropolia.fi/wbma';

const getAll = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + '/tags/rating-app');
            const toJSON = await response.json();

            const result = await Promise.all(toJSON.map(async (item) => {
                const response = await fetch(baseURL + '/media/' + item.file_id);
                return await response.json();
            }));

            setData(result);
            setLoading(false);
        } catch (error) {
            console.log('fetchData error: ', error.message);
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [data, loading];
};

const fetchPost = async (endpoint = '', data = {}) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(baseURL + '/' + endpoint, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchPost error: ', error.message);
    }
};

const fetchGet = async (endpoint = '', params = '', token = '') => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        }
        const response = await fetch(baseURL + '/' + endpoint + '/' + params, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchGet error: ', error.message);
    }
};

export { getAll, fetchPost, fetchGet };