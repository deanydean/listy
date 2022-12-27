export interface List {
  _id?: string;
  title: string;
  items: ListItem[];
}

export interface ListItem {
  text: string;
  completed: boolean;
}
