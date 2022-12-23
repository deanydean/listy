import ListItem, { ListItemProps } from './list-item';

export type ListProps = {
  title: string;
  items: ListItemProps[];
};

const List = ({ title, items }: ListProps) => {
  return (
    <>
      <div>{title}</div>
      {items.map((item) => {
        return (
          <div>
            <ListItem text={item.text} complete={item.complete} />
          </div>
        );
      })}
    </>
  );
};

export default List;
