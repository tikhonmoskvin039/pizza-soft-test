import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopUp = ({ isOpen, onClose, children, variant }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let timeout;
    if (modalOpen) {
      timeout = setTimeout(() => {
        onClose();
        navigate("/");
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [modalOpen, onClose]);

  return (
    <>
      {modalOpen && (
        <div className="modal">
          <div className={`modal__content-${variant}`}>{children}</div>
        </div>
      )}
    </>
  );
};

export default PopUp;
