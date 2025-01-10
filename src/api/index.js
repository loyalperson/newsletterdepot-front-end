import axios from 'axios';

const API = axios.create({ baseURL: 'https://newsletter-depo-5f8416dcbbe5.herokuapp.com/' });

export const sendUserInfo = (content) => API.post('/user_info', content);
export const updateUserInfo = (content) => API.post('/update_info', content);

// PRODUCT APIs

// GET APIS
export const getProduct = (id) => API.get(`/product/${id}`);
export const getProducts = () => API.get('/product/get-all-products');
export const searchProduct = ({ gender, size, selection }) => API.get(`/product/search?gender=${gender}&size=${size}&collection=${selection}`);

// POST APIs
export const createProduct = (product) => API.post('/product/create-product', product);
export const updateProduct = (id, updatedProduct) => API.patch(`/product/${id}`, updatedProduct)
export const deleteProduct = (id) => API.delete(`/product/${id}`)
