import "./inventory.css";

import Notify from "../../components/Notify";
import { NotificationProvider } from "../../contexts/Notification";
import ModalInventory from "./widget/modal";
import TableInventory from "./widget/table";
import { UpdatingProvider } from "../../contexts/Updating";

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
                    <div className="container-fluid">
                        <UpdatingProvider>
                            <div className="inventory col-10 offset-1">
                                <ModalInventory />
                                <TableInventory />
                            </div>
                        </UpdatingProvider>
                    </div>
            </div>
        </NotificationProvider>
    )
}

export default InventoryPage;