export type ListItemProps = {
  text: string;
  complete: boolean;
};

const ListItem = ({ text }: ListItemProps) => <div>{text}</div>;

export default ListItem;
