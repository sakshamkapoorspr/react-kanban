import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Column = ({ column, columnId }) => {
  return (
    <div className="flex items-start flex-col mx-3" key={columnId}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {column.name}
      </h2>
      <div>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-[290px] min-h-[500px]"
              >
                {column.items.map((item, index) => {
                  return <Card item={item} index={index} provided={provided} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
