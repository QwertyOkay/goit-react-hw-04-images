import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myKey = '27488629-df5ceed35024f27a803c81bf6';

export const fetchItemsWithQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
};