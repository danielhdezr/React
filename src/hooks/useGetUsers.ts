import { useEffect, useState } from "react";
import type { User, UserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();

const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const getUsers = () => {
    setIsLoading(true);
    httpClient
      .get("users/all")
      .then((response) => {
        response
          .json()
          .then((data: UserResponse) => {
            console.log("Usuarios:", data);
            setUsers(data.users);
          })
          .catch((error) => {
            setUsers([]);
            console.error("Error while parsing users/all", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => { 
        setUsers([]);
        setIsLoading(false);
        console.error("Fail fetching users/all", error);
      });
  };

  const addUserToList = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const updateUserInList = (updatedUser: User) => {
    setUsers((prev) => 
      prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const removeUserFromList = (userId: number) => {
    setUsers((prev) => prev.filter(user => user.id !== userId));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    getUsers,
    addUserToList,
    updateUserInList,
    removeUserFromList,
    isLoading,
  };
};

export default useGetUsers;