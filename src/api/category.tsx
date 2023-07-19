import axios, { AxiosResponse } from 'axios';
import { ICategory } from '../interfaces/Category';


const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  
});

export const getAllCategories = async (): Promise<ICategory[]> => {
 
    const response: AxiosResponse<{categories:ICategory[]}> = await instance.get('/categories');
    return response.data.categories;
  
};
export const getCategoryById = async function (categoryId: string): Promise<ICategory> {
    try {
      const response: AxiosResponse<ICategory> = await instance.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  };