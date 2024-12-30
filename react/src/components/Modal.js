import React, { useEffect, useState } from "react";
import "../css/Modal.css"; 

const Modal = ({ isOpen, onClose, title, content,  actions, className}) => {

    const [isVisible , setIsVisible] = useState(false);
    // if (!isOpen) return null; // isOpen이 false면 Modal을 렌더링하지 않음
    useEffect(()=>{
        if(isOpen){
            setIsVisible(true);
        }
    },[isOpen])
   
    return (
        <div className={`modal-backdrop ${isOpen? "open" : ""}`}>
            {/* <div className="modal-content"> */}
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
                    {!actions.length && (
                        <button className="default-close" onClick={onClose}>
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
