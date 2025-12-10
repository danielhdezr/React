import type { User } from "../types/User.type";
import ListItem from "./Listitem";

type UserItemProps = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
};

const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
  return (
    <ListItem onDelete={onDelete}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          {user.id}: {user.name} - {user.email}
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onEdit}
          >
            Editar
          </button>
        </div>
      </div>
    </ListItem>
  );
};

export default UserItem;