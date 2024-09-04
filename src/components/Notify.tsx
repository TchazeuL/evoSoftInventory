import { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { NotificationContext } from "../contexts/Notification";

function Notify(): any {

    const context = useContext(NotificationContext);

    return (
        <div>
            <Toast show={context.data.show} autohide={true}
                delay={3000} className={"toast position-fixed translate-middle-x top-center "} bg={context.data.isSuccess ? "success" : "danger"} >
                <Toast.Body className="text-white">
                    {context.data.message}
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default Notify;