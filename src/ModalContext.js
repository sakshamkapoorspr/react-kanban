import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [columnId, setColumnId] = useState(-1);

  return (
    <ModalContext.Provider
      value={{ visible, setVisible, columnId, setColumnId }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
