import React from "react";

import "./Toast.css";

const Toast = ({show, children, className}) => {
    if (show) {
        return (
            <div className={`toast rounded ${className}`}>
                <p className="toast-content px-4 py-2">
                    {children}
                </p>
            </div>
        )
    }
}

export default Toast;