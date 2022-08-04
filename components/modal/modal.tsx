import { ComponentType, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

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
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent backdrop-blur-[1.5px] absolute top-0 left-0 z-10">
      <button onClick={handleCloseModal} className="fixed top-5 right-5">
        <AiOutlineClose className="text-3xl" />
      </button>
      <div className="w-fit h-fit">
        <Content />
      </div>
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
