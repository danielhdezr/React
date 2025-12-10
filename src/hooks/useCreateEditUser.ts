import { useState } from "react";
import type { CreateUserPayload, CreateUserResponse, UpdateUserPayload, UpdateUserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();

const useCreateEditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const createUser = async (data: CreateUserPayload) => {
    setIsLoading(true);
    try {
      console.log('Enviando datos al backend:', data);
      const response = await httpClient.post("users/add", data);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log('Respuesta del backend:', userData);
      setIsLoading(false);
      return userData as CreateUserResponse;
    } catch (error) {
      console.error("Error while creating or parsing a user", error);
      setIsLoading(false);
      return null;
    }
  };

  const updateUser = async (data: UpdateUserPayload) => {
    setIsLoading(true);
    try {
      console.log('Actualizando usuario:', data);
      const response = await httpClient.post("users/add", data);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log('Usuario actualizado:', userData);
      setIsLoading(false);
      return userData as UpdateUserResponse;
    } catch (error) {
      console.error("Error while updating or parsing a user", error);
      setIsLoading(false);
      return null;
    }
  };

  const deleteUser = async (userId: number) => {
    setIsLoading(true);
    try {
      console.log('Eliminando usuario ID:', userId);
      const response = await httpClient.delete(`users/delete/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Usuario eliminado');
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error while deleting user", error);
      setIsLoading(false);
      return null;
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
    isLoading,
  };
};

export default useCreateEditUser;