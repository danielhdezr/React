
type ListContainerProps = {
    children?: React.ReactNode;
}

function ListContainer({ children }: ListContainerProps) {
    return (
        <ul>
            {children}
        </ul>
    );
};

export default ListContainer;