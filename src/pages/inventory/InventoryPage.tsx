import "./inventory.css";

import Notify from "../../components/Notify";
import { NotificationProvider } from "../../contexts/Notification";
import ModalInventory from "./widget/modal";
import TableInventory from "./widget/table";

function InventoryPage() {
    return (
        <NotificationProvider>
            <div>
                <div className="container-fluid text-center" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Notify />
                </div>
                <div className="col-12">
                    <div className="container-fluid">
                            <div className="inventory col-8 offset-2">
                                <div className="offset-10 mb-2">
                                    <div className="row g-1">
                                        <ModalInventory />
                                    </div>
                                </div>
                                <TableInventory />
                            </div>
                    </div>
                </div>
            </div>
        </NotificationProvider>
    )
}

export default InventoryPage;