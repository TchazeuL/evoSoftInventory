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
import { useTranslation } from "react-i18next";
import CsvDownload from "react-csv-downloader";


function TableInventory() {

    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [enRows, setEnRows] = useState<any[]>([]);
    const [filter, setFilter] = useState("");
    const titleId = "N°";
    const [loading, setLoading] = useState(false);
    const notificationContext = useContext(NotificationContext);
    const { t, i18n } = useTranslation();
    const { setData } = useContext(UpdatingContext);
    const api = new InventaireController();

    useEffect(() => {
        getInventories(true);
    }, [])

    useEffect(() => {
        const onLangChange = (): void => {
            getInventories(false);
        }
        i18n.on("languageChanged", onLangChange);
    }, [i18n])

    const create = (): void => {
        const data = {
            showModal: true,
            action: "create",
            row: { id: 0, date: "", magasin: "", produit: "", stock: "" }
        };
        setData(data);
    }

    const getInventories = async (notify: boolean): Promise<void> => {
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
                const enResult = {
                    "N°": item.id,
                    "date": date,
                    "store": magasin.data.nom,
                    "product": produit.data.nom,
                    "stock": stock,
                    "update": "update"
                }
                result[titleId] = item.id;
                return { "fr": result, "en": enResult };
            }));
            if (items.length > 0) {
                const keys = Object.keys(items[0].fr);
                setColumns(keys.map((key) => t(key)))
                setRows(items.map((value) => value.fr));
                setEnRows(items.map((value) => value.en));
                setLoading(false);
                notificationContext.setData({ show: notify, message: t("inventory.success.fetch"), position: "top-center", isSuccess: true });
                setTimeout(() => {
                    notificationContext.setData({ show: false, message: t("inventory.success.fetch"), position: "top-center", isSuccess: true });
                }, 3000)
            }
        } catch (error) {
            setLoading(false);
            notificationContext.setData({ show: notify, message: error instanceof NotFoundException ? error.message : `${error}`, position: "top-center", isSucces: false });
            setTimeout(() => {
                notificationContext.setData({ show: false, message: error instanceof NotFoundException ? error.message : `${error}`, position: "top-center", isSucces: false });
            }, 3000)
        }
        setLoading(false);
    }

    const instant = new Date().toLocaleString(t("locales"), {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const filteredRows = rows.map((item) => {
        if (`${item["produit"]}`.toLowerCase().includes(`${filter}`.toLowerCase()) || `${item["magasin"]}`.toLowerCase().includes(`${filter}`.toLowerCase())) {
            return item;
        }
        return [];
    })

    const onfilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFilter(event.target.value);
    }

    const isEmpty = filteredRows.length === 0;

    return (

        <div>
            <div className="d-flex mb-3 col-12">
                <div className="col-6">
                    <button className="btn btn-primary col-3" onClick={create}>{t("create")}</button>
                    <button className="btn btn-light ms-2 col-3" onClick={() => window.location.reload()}>{t("refresh")}</button>
                </div>
              { !isEmpty && <div className="col-6">
                    <form className="d-flex col-12">
                        <div className="offset-3 col-5">
                            <input type="search" placeholder={t("search")} className="form form-control" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault() }; }} onChange={onfilter} />
                        </div>
                        <div className="col-4 ms-5">
                            <CsvDownload datas={i18n.language === "fr" ? rows : enRows} columns={columns.slice(0, -1)} filename={t("filename")} title={` ${t("inventory.file")} ( ${instant} )`}>
                                <button className="btn btn-primary" type="button" >{t("export")}</button>
                            </CsvDownload>
                        </div>
                    </form>
                </div>}
            </div>
            {loading ? <div className="offset-6 mt-5">  <Loader color="success" />  </div> : isEmpty ? <div className="text-center text-light" style={{marginTop: 150}}> <h3> <strong>{t("inventory.empty")}</strong> </h3> </div> :
                <Table rows={filteredRows} columns={columns} titleId={titleId} />}
        </div>
    )
}

export default TableInventory;