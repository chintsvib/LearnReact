import { useState } from "react";

// {items : [], heading: string}
interface Props {
  items: string[];
  heading: string;
  //(item: string) => void
  onSelectItem: (item: string) => void; //onClick
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //items = [];

  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {length === 0 && <p>No Item Found3</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
