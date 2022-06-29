import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext } from "react";
import ModalContext from "../ModalContext";

const Column = ({ column, columnId }) => {
  const { setVisible, setColumnId } = useContext(ModalContext);

  return (
    <div className="flex items-start flex-col mx-3" key={columnId}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {column.name}
      </h2>
      <button
        type="button"
        className="bg-white w-full h-12 flex justify-center items-center text-xl text-gray-600 mb-8 shadow-md cursor-pointer hover:opacity-70"
        onClick={() => {
          setVisible(true);
          setColumnId(columnId);
        }}
      >
        <AiOutlinePlus />
      </button>
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
                  return <Card item={item} index={index} columnId={columnId} />;
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
