import { Draggable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";

const Card = ({ item, index, provided }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="text-gray-700 mb-4 shadow-md rounded-md p-[10px] bg-white dark:bg-gray-700 w-full"
            style={{
              userSelect: "none",
              ...provided.draggableProps.style,
            }}
          >
            <div class="flex items-start justify-between">
              <span class="text-gray-600 font-medium text-[16.5px] dark:text-white ml-2 mr-3">
                Complete React Work
              </span>
              <button class="text-gray-700 text-md mt-1">
                <BiTrash />
              </button>
            </div>

            <div className="flex flex-wrap mt-1">
              <span class="flex justify-center items-center font-medium text-[12px] h-6 px-4 m-1 rounded border-stone-300 border text-gray-800 ">
                Technology
              </span>
              {/* <span class="flex justify-center items-center font-medium text-[12px] h-6 px-4 m-1 rounded border-stone-300 border text-gray-800">
                Science
              </span> */}
            </div>

            <p className="px-2 pt-1 mb-3 text-[14px]">
              Lorem ipsum dolor sit amet color senic.
            </p>

            <hr />

            <div className="flex items-center px-2 pt-2">
              <img
                src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-black-7-512.png"
                alt="Avatar"
                className="h-8 mr-3"
              />
              <span className="text-[15px]">Peter Griffin</span>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
