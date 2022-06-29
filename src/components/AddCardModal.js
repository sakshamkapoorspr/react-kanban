import { useContext, useState } from "react";
import KanbanContext from "../KanbanContext";
import ModalContext from "../ModalContext";
import { v4 as uuid } from "uuid";

const AddCardModal = () => {
  const { visible, setVisible, columnId } = useContext(ModalContext);
  const { addCard } = useContext(KanbanContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [member, setMember] = useState("");

  const clearCardInputs = () => {
    setTitle("");
    setDescription("");
    setMember("");
  };

  const handleSubmit = () => {
    if (title === "" || description === "" || member === "") {
      alert("Please fill all required fields");
      return;
    }
    const task = {
      id: uuid(),
      title: title,
      description: description,
      member: member,
    };
    addCard(columnId, task);
    setVisible(false);
    clearCardInputs();
  };

  return (
    <>
      {visible && (
        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
          <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label>Task Title</label>
                <input
                  type="text"
                  class="w-full bg-gray-100 p-2 mt-2 mb-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Task Description</label>
                <input
                  type="text"
                  class="w-full bg-gray-100 p-2 mt-2 mb-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Assignee</label>
                <input
                  type="text"
                  class="w-full bg-gray-100 p-2 mt-2 mb-3"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                />
              </div>
              <div class="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => {
                    setVisible(false);
                    clearCardInputs();
                  }}
                >
                  <i class="fas fa-times"></i> Cancel
                </button>
                <button
                  type="button"
                  class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <i class="fas fa-plus"></i> Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardModal;
