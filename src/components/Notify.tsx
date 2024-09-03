import { useContext } from "react";
import { Toast } from "react-bootstrap";
import { NotificationContext } from "../contexts/Notification";

function Notify() {

    const context = useContext(NotificationContext);

    return (
        <div>
            <Toast show={context.data.show} autohide={true}
                delay={3000} className="mt-3 toast position-fixed top-5 start-50 translate-middle-x" bg={context.data.isSuccess ? "success" : "danger"} >
                <Toast.Body className="text-white">
                    {context.data.message}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Notify;