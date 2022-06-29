import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const KanbanContext = createContext();

const itemsFromBackend = [
  {
    id: uuid(),
    title: "Complete React Work",
    description: "Design a Kanban Application",
    member: "Saksham Kapoor",
  },
  {
    id: uuid(),
    title: "Complete Final Presentation",
    description: "Design the Final Presentation",
    member: "Saksham Kapoor",
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To Do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

export function KanbanProvider({ children }) {
  const [columns, setColumns] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("kanban-data"));
    return localData || columnsFromBackend;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const addCard = (columnId, task) => {
    const newColumns = { ...columns };
    newColumns[columnId].items.push(task);
    setColumns(newColumns);
  };

  const deleteCard = (columnId, item) => {
    const newColumns = { ...columns };
    const idx = newColumns[columnId].items.indexOf(item);
    newColumns[columnId].items.splice(idx, 1);
    setColumns(newColumns);
  };

  return (
    <KanbanContext.Provider
      value={{ columns, addCard, deleteCard, setColumns }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export default KanbanContext;
