import { useContext, useEffect, useState } from "react";
import Table from "../../../components/Table";
import InventaireController from "../../../controllers/InventaireController";
import InventaireImpl from "../../../models/Inventaire";
import ProduitController from "../../../controllers/ProduitController";
import MagasinController from "../../../controllers/MagasinController";
import NotFoundException from "../../../utils/exceptions/NotFoundException";
import { NotificationContext } from "../../../contexts/Notification";

function TableInventory() {

    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const notificationContext = useContext(NotificationContext);

    useEffect(() => {
        getInventories();
    }, [])

    const getInventories = async (): Promise<void> => {
        setLoading(true)
        const api = new InventaireController();
        const produitApi = new ProduitController();
        const magasinApi = new MagasinController();

        try {
            const response = await api.getAllInventories();
            const inventaires = response.data as Array<InventaireImpl>;
            const items = await Promise.all(inventaires.map(async (item) => {
                const date = item.date;
                const produitId = item.produitId;
                const magasinId = Object.keys(item.stock)[0];
                const stock = item.stock[magasinId]
                const produit = await produitApi.getProductById(produitId);
                const magasin = await magasinApi.getMagasinById(magasinId);
                return {
                    "#": item.id,
                    "date": date,
                    "magasin": magasin.data.nom,
                    "produit": produit.data.nom,
                    "stock": stock,
                    "modifier": "modifier"
                }
            }));
            setColumns(["#", "date", "magasin", "produit", "stock", "modifier"]);
            setRows(items);
            setLoading(false);
            if (items.length > 0) {
                notificationContext.setData({ show: true, message: response.message, isSuccess: true });
                setTimeout(() => {
                    notificationContext.setData({ show: false, message: response.message, isSuccess: true });
                }, 3000)
            }
        } catch (error) {
            notificationContext.setData({ show: true, message: error instanceof NotFoundException ? error.message : `${error}`, isSucces: false });
            setTimeout(() => {
                notificationContext.setData({ show: false, message: error instanceof NotFoundException ? error.message : `${error}`, isSucces: false });
            }, 3000)
        }
    }

    return (
        <Table rows={rows} columns={columns} />
    )
}

export default TableInventory;