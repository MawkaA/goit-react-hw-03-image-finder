import axios from 'axios';

const API_KEY = '27160087-b033f18e68b0b54e8a3a55bfe';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchPictures = async (query, page = 1) => {
    try {
        const {
            data: { hits },
        } = await axios.get(
            `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        );
        return hits;
    } catch (error) {
        console.log(error.message);
    }
};

export { fetchPictures };