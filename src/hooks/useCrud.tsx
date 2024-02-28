import { useState, useEffect } from 'react';
import { useRequest } from '../api/UseRequest';

export const useCrud = <T,>(apiUrl: string, params?: object) => {
  const [data, setData] = useState<T[]>([]);
  const [editingItem, setEditingItem] = useState<T | null>(Object);
  const { getRequest, postRequest, postFileRequest, putRequest } = useRequest();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const Response = await getRequest<T[]>(apiUrl, params);
    setData(Response);
  };

  const createItem = async (formData: object) => {
    try {
      await postRequest(apiUrl, formData);
      fetchData();

    } catch (error) {

      console.error('Error creating data:', error);
    }
  };

  const updateItem = async (id: number, formData: object) => {
    try {
      await putRequest(`${apiUrl}/${id}`, formData);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      //await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const editItem = (id: number) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    }
  };

  const resetEditingItem = () => {
    setEditingItem(null);
  };

  return {
    data,
    fetchData,
    editingItem,
    createItem,
    updateItem,
    deleteItem,
    editItem,
    resetEditingItem,
  };
};

export default useCrud;
