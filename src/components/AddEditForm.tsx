import { useState, useEffect } from "react";
import type { User } from "../types/User.type";

const formDefaultValues: Omit<User, 'id' | 'created'> = {
  email: '',
  name: '',
};

type AddEditFormProps = {
  onSubmit: (value: Omit<User, 'id' | 'created'>) => void;
  onCancel?: () => void;
  editingUser?: User | null;
  loading: boolean;
};

const AddEditForm = ({
  onSubmit,
  onCancel,
  editingUser,
  loading,
}: AddEditFormProps) => {
  const [formState, setFormState] = useState<Omit<User, 'id' | 'created'>>(formDefaultValues);

  useEffect(() => {
    if (editingUser) {
      setFormState({
        email: editingUser.email,
        name: editingUser.name,
      });
    } else {
      setFormState(formDefaultValues);
    }
  }, [editingUser]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    
    if (!formState.email || !formState.name) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    onSubmit(formState);
    if (!editingUser) {
      setFormState(formDefaultValues);
    }
  };

  const handleInputChange = (key: keyof Omit<User, 'id' | 'created'>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [key]: event.target.value,
      })
    }
  };

  const handleCancel = () => {
    setFormState(formDefaultValues);
    onCancel?.();
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          id='email'
          name='email'
          type="email"
          placeholder="Inserte su email"
          value={formState.email}
          onChange={handleInputChange('email')}
          disabled={loading}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          id='name'
          name='name'
          type="text"
          placeholder="Inserte su nombre"
          value={formState.name}
          onChange={handleInputChange('name')}
          disabled={loading}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" disabled={loading} style={{ marginRight: '10px', padding: '5px 10px' }}>
          {loading 
            ? 'Guardanding...' 
            : editingUser 
              ? 'Actualizar' 
              : 'Guardar'
          }
        </button>
        {editingUser && (
          <button type="button" onClick={handleCancel} disabled={loading} style={{ padding: '5px 10px' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default AddEditForm;