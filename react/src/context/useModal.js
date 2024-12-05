import { useState } from "react";

const useModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalActions, setModalActions] = useState([]);

    const openModal = ({ title = "", message = "", actions = [] }) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalActions(actions);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    return {
        isModalOpen,
        modalTitle,
        modalMessage,
        modalActions,
        openModal,
        closeModal,
    };
};

export default useModal;
