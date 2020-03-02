const baseURL = 'http://media.mw.metropolia.fi/wbma';

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

export { fetchPost };