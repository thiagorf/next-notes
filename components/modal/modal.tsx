import { ComponentType, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Modal = ({
  show,
  onClose,
  Content,
}: {
  show: boolean;
  onClose: () => void;
  Content: ComponentType;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div>
      <button onClick={handleCloseModal}>Close</button>
      <Content />
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};
