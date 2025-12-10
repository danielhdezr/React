import { useState } from "react";
import ListContainer from "./components/Listcontainer.tsx";
import UserItem from "./components/UserItem.tsx";
import useGetUsers from "./hooks/useGetUsers.ts";
import AddEditForm from "./components/AddEditForm.tsx";
import type { User } from "./types/User.type.ts";
import useCreateEditUser from "./hooks/useCreateEditUser.ts";

function App() {

  const { users, addUserToList, updateUserInList, removeUserFromList, isLoading: isFetchingUsers } = useGetUsers();
  const { createUser, updateUser, deleteUser, isLoading: isSubmitLoading } = useCreateEditUser();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOnSubmit = async (user: Omit<User, 'id' | 'created'>) => {
    if (editingUser) {
      const updatedUser = await updateUser({
        user: {
          id: editingUser.id,
          name: user.name,
          email: user.email,
          created: editingUser.created,
        },
      });

      if (updatedUser && updatedUser.user) {
        updateUserInList(updatedUser.user);
        setEditingUser(null);
      } else {
        console.error('Error al actualizar el usuario');
      }
    } 
    
    else {
      const newUser = await createUser({
        user: {
          name: user.name,
          email: user.email,
          id: 0, 
          created: new Date().toISOString(), 
        },
      });
      if (newUser && newUser.user) {
        addUserToList(newUser.user);
      } else {
        console.error('Error al crear el usuario');
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDelete = async (userId: number) => {
    const result = await deleteUser(userId);
    if (result && result.success) {
      removeUserFromList(userId);
    } else {
      console.error('Error al eliminar el usuario');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddEditForm 
        onSubmit={handleOnSubmit} 
        onCancel={editingUser ? handleCancelEdit : undefined}
        editingUser={editingUser}
        loading={isSubmitLoading} 
      />

      {isFetchingUsers && <>Loading...</>}
      {!isFetchingUsers && users.length > 0 && (
        <ListContainer>
          {users.map((user) => {
            return (
              <UserItem 
                key={user.id} 
                user={user} 
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.id)}
              />
            );
          })}
        </ListContainer>
        
      )}
      {!isFetchingUsers && users.length === 0 && (
        <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
}

export default App;