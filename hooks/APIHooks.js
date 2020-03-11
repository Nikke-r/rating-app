const baseURL = 'http://media.mw.metropolia.fi/wbma';

const getAll = async () => {
    try {
        const response = await fetch(baseURL + '/tags/rating-app');
        const toJSON = await response.json();
        const result = await Promise.all(toJSON.map(async (item) => {
            const response = await fetch(baseURL + '/media/' + item.file_id);
            return await response.json();
        }))
        return result;
    } catch (error) {
        console.log('getAll error: ', error.message);
    }
};

const fetchPost = async (endpoint = '', data = {}, token= '') => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
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

const fetchPut = async (endpoint = '', data = {}, token= '') => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(baseURL + '/' + endpoint, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchPut error: ', error.message);
    }
};

const fetchDel = async (endpoint = '', params = '', token = '') => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'x-access-token': token
            }
        };

        const response = await fetch(baseURL + '/' + endpoint + '/' + params, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchdel error: ', error.message);
    }
}

export { getAll, fetchPost, fetchGet, fetchPut, fetchDel };