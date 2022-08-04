import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Modal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
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
      <p>Test Modal</p>
      <button onClick={handleCloseModal}>Close</button>
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
