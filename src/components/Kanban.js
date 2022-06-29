import { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Column from "./Column";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
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

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("kanban-data"));
    return localData || columnsFromBackend;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const addCard = (columnId) => {
    const newColumns = { ...columns };
    newColumns[columnId].items.push({ id: uuid(), content: "First task" });
    setColumns(newColumns);
  };

  const deleteCard = (columnId, item) => {
    const newColumns = { ...columns };
    const idx = newColumns[columnId].items.indexOf(item);
    newColumns[columnId].items.splice(idx, 1);
    setColumns(newColumns);
  };

  return (
    <div class="bg-slate-100 min-h-screen flex p-16 justify-center">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            column={column}
            columnId={columnId}
            addCard={addCard}
            deleteCard={deleteCard}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
