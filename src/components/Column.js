import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { AiOutlinePlus } from "react-icons/ai";

const Column = ({ column, columnId, addCard, deleteCard }) => {
  return (
    <div className="flex items-start flex-col mx-3" key={columnId}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {column.name}
      </h2>
      <div
        className="bg-white w-full h-12 flex justify-center items-center text-xl text-gray-600 mb-8 shadow-md cursor-pointer hover:opacity-70"
        onClick={() => {
          addCard(columnId);
        }}
      >
        <AiOutlinePlus />
      </div>
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
                  return (
                    <Card
                      item={item}
                      index={index}
                      provided={provided}
                      columnId={columnId}
                      deleteCard={deleteCard}
                    />
                  );
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
