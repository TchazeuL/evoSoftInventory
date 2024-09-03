import React, { useContext, useEffect, useState } from "react";
import Table from "../../../components/Table";
import InventaireController from "../../../controllers/InventaireController";
import InventaireImpl from "../../../models/Inventaire";
import ProduitController from "../../../controllers/ProduitController";
import MagasinController from "../../../controllers/MagasinController";
import NotFoundException from "../../../utils/exceptions/NotFoundException";
import { NotificationContext } from "../../../contexts/Notification";
import Loader from "../../../components/Loader";
import { UpdatingContext } from "../../../contexts/Updating";
import CsvDownload from "react-csv-downloader";


function TableInventory() {

    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [filter, setFilter] = useState("");
    const titleId = "N°";
    const [loading, setLoading] = useState(false);
    const notificationContext = useContext(NotificationContext);
    const { setData } = useContext(UpdatingContext);
    const api = new InventaireController();

    useEffect(() => {
        getInventories();
    }, [])

    const create = (): void => {
        const data = {
            showModal: true,
            action: "create",
            row: { id: 0, date: "", magasin: "", produit: "", stock: "" }
        };
        setData(data);
    }

    const getInventories = async (): Promise<void> => {
        setLoading(true)
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
                const result = {
                    "N°": item.id,
                    "date": date,
                    "magasin": magasin.data.nom,
                    "produit": produit.data.nom,
                    "stock": stock,
                    "modifier": "modifier"
                }
                result[titleId] = item.id;
                return result;
            }));
            setColumns([titleId, "date", "magasin", "produit", "stock", "modifier"]);
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

    const instant = new Date().toLocaleString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const filteredRows = rows.map((item) => {
        if (`${item["produit"]}`.toLowerCase().includes(`${filter}`.toLowerCase()) || `${item["magasin"]}`.toLowerCase().includes(`${filter}`.toLowerCase())){
            return item;
        }
        return [];
    })

    const onfilter = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        setFilter(event.target.value);
    }

    return (
        loading ? <Loader color="success" /> :
            <div>
                <div className="d-flex mb-3 col-12">
                    <div className="col-6">
                        <button className="btn btn-primary col-4" onClick={create}>Ajouter</button>
                        <button className="btn btn-light ms-2 col-4" onClick={() => window.location.reload()}>Actualiser</button>
                    </div>
                    <div className="col-6">
                        <form className="row">
                            <div className="col-8">
                                <input type="search" placeholder="Rechercher" className="form form-control" onKeyDown={(e) => {if (e.key === "Enter") {e.preventDefault()};}} onChange={onfilter} />
                            </div>
                            <div className="col-4">
                                <CsvDownload datas={rows} columns={columns} filename="inventaire" title={`Inventaire journalier ( ${instant} )`}>
                                    <button className="btn btn-primary" >Exporter en csv</button>
                                </CsvDownload>
                            </div>
                        </form>
                    </div>
                </div>
                <Table rows={filteredRows} columns={columns} titleId={titleId} />
            </div>
    )
}

export default TableInventory;