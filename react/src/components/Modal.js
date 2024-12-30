import React, { useState, useEffect } from "react";
import "../css/Modal.css";

const Modal = ({ isOpen, onClose, title, content, actions, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    // 애니메이션을 위해 상태 관리
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        // 애니메이션 종료 후 onClose 호출
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 700); // transition-duration과 동일하게 설정
    };

    return (
        <div className={`modal-backdrop ${isOpen ? "open" : ""}`}>
            <div
                className={`modal-content ${isOpen ? "open" : ""} ${className || ""}`}
                onTransitionEnd={() => {
                    if (!isOpen) setIsVisible(false);
                }}
                style={{ display: isVisible ? "flex" : "none" }}
            >
                {title && <h2 className="modal-title">{title}</h2>}
                <div className="modal-body">
                    {typeof content === "string" ? <p>{content}</p> : content}
                </div>
                <div className="modal-actions">
                    {actions?.map((action, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={action.onClick}
                            className={action.className || "modal-button"}
                        >
                            {action.label}
                        </button>
                    ))}
                    {!actions?.length && (
                        <button className="default-close" onClick={handleClose}>
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
