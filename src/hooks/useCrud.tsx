import { useState, useEffect } from 'react';
import { useRequest } from '../api/UseRequest';

export const useCrud = <T,>(apiUrl: string, params?: object) => {
  const [data, setData] = useState<T[]>([]);
  const [editingItem, setEditingItem] = useState<T | null>(Object);
  const { getRequest, postRequest, deleteRequest, putRequest } = useRequest();
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
      await putRequest(`${apiUrl}${id}/`, formData);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteItem = async (id: number) => {
    console.log(id,"deleeeee");
    try {
      //await axios.delete(`${apiUrl}/${id}`);
      await deleteRequest<T[]>(`${apiUrl}${id}/`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const GetItemById = (id: number) => {
    console.log("llego el id:",id)
    const itemToEdit = data.find(item => item.id === id);
    console.log("itemToEdit:",itemToEdit)
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      return itemToEdit;
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
    GetItemById,
    resetEditingItem,
  };
};

export default useCrud;
