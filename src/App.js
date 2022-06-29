import AddCardModal from "./components/AddCardModal";
import Kanban from "./components/Kanban";
import { KanbanProvider } from "./KanbanContext";
import { ModalProvider } from "./ModalContext";

function App() {
  return (
    <>
      <KanbanProvider>
        <ModalProvider>
          <Kanban />
          <AddCardModal />
        </ModalProvider>
      </KanbanProvider>
    </>
  );
}

export default App;
