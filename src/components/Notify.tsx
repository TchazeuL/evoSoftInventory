import { useContext, useState } from "react";
import { Toast } from "react-bootstrap";
import { NotificationContext } from "../contexts/Notification";

function Notify() {

    const context = useContext(NotificationContext);

    return (
        <div>
            <Toast show={context.data.show} autohide={true}
                delay={3000} className="mt-3" bg={context.data.isSuccess ? "success" : "danger"} style={{
                    zIndex: 1
                }}>
                <Toast.Body className="text-white">
                    {context.data.message}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Notify;