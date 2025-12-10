type ListItemProps = {
  children: React.ReactNode;
  onDelete?: () => void; 
};

const ListItem = ({ children, onDelete }: ListItemProps) => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      margin: "5px 0", 
      padding: "5px", 
      border: "1px solid #ddd", 
      borderRadius: "5px" 
    }}>
      <span style={{ flex: 1 }}>{children}</span>
      {onDelete && (
        <button 
          onClick={onDelete} 
          style={{ 
            
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default ListItem;