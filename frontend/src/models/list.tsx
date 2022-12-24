export interface List {
  _id?: string;
  title: string;
  items: ListItem[];
}
export interface ListItem {
  index: number;
  text: string;
  completed: boolean;
}
