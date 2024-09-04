import { useContext, useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import InventaireImpl from "../../../models/Inventaire";
import InventaireController from "../../../controllers/InventaireController";
import { Modal } from "react-bootstrap";
import MagasinImpl from "../../../models/Magasin";
import MagasinController from "../../../controllers/MagasinController";
import ProduitImpl from "../../../models/Produit";
import ProduitController from "../../../controllers/ProduitController";
import NotFoundException from "../../../utils/exceptions/NotFoundException";
import { NotificationContext } from "../../../contexts/Notification";
import { UpdatingContext } from "../../../contexts/Updating";
import { useTranslation } from "react-i18next";


interface Errors {
    produitError?: string,
    magasinError?: string,
    stockError?: string,
}

interface Select {
    value: string,
    enabled?: boolean
    options: Array<string>
}

interface Form {
    date: string,
    magasin: Select,
    produit: Select,
    stock: number
}

function ModalInventory(): any {
    const notificationContext = useContext(NotificationContext);
    const { data } = useContext(UpdatingContext);
    const { t } = useTranslation();
    const date = new Date().toLocaleString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const [form, setForm] = useState<Form>({ date: date, magasin: { value: "", options: [], enabled: false }, produit: { value: "", options: [] }, stock: 0 });
    const [errors, setErrors] = useState<Errors>({});
    const [inventory, setInventory] = useState(new InventaireImpl(3, date, "", {}))
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(data.showModal);
    const api = new InventaireController()
    const produitApi = new ProduitController();
    const magasinApi = new MagasinController();

    useEffect(() => {
        if (data.showModal) {
            show()
            setForm((value) => ({
                ...value, date: date, magasin: { value: data.row.magasin, options: value.magasin.options }, produit: { value: data.row.produit, enabled: false, options: value.produit.options }, stock: data.row.stock
            }))
        }
        if (data.action === "create") {
            show();
        }
    }, [data])

    const validator = (): Errors => {
        let errors: Errors = {};
        if (form.magasin.value === "") {
            errors.magasinError = "Veuillez selectionner un magasin";
        }
        if (form.produit.value === "") {
            errors.produitError = "Veuillez selectionner un produit";
        }
        if (form.stock < 0 || form.stock === undefined || form.stock === null || typeof form.stock !== "number") {
            errors.stockError = "Le stock doit être positif";
        }
        return errors;
    }

    const show = (): void => {
        setShowModal(true);
        getMagasins().then(() => {
            getProducts();
        })
    }

    const hide = (): void => {
        setShowModal(false)
    }


    const changeMagasin = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const value = event.target.value;
        setForm({ ...form, magasin: { value: value, options: form.magasin.options } });
        produitApi.getAllProductsByMagasins(event.target.value).then((response) => {
            if (response.status === 200) {
                const produits = response.data as Array<ProduitImpl>;
                setForm({ ...form, produit: { value: form.produit.value, enabled: true, options: produits.map((value) => value.nom) }, magasin: { value: value, options: form.magasin.options } });
            }
        }).catch((error) => console.log(error));
    }

    const changeProduit = (event: React.ChangeEvent<any>): void => {
        setForm({ ...form, produit: { value: event.target.value, options: form.produit.options, enabled: true } });
    }

    const changeStock = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({ ...form, stock: parseInt(event.target.value) });
    }

    const getProducts = async (): Promise<void> => {
        const response = await produitApi.getAllProducts();
        if (response.status === 200) {
            setForm((data) => ({
                ...data, produit: { value: data.produit.value, options: response.data.map((item: ProduitImpl) => item.nom) }
            }))
        }
    }

    const getMagasins = async (): Promise<void> => {
        const response = await magasinApi.getAllMagasins();
        if (response.status === 200) {
            setForm((data) => ({
                ...data, magasin: { value: data.magasin.value, options: response.data.map((item: MagasinImpl) => item.nom) }
            }))
        }
    }

    const updateInventaire = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        let validation = validator();
        setErrors(validation);
        if (Object.keys(validation).length === 0) {
            let inventory = new InventaireImpl(data.row.id, date, "", {})
            try {
                const produitResponse = await produitApi.getProductByName(form.produit.value);
                const magasinResponse = await magasinApi.getMagasinByName(form.magasin.value);
                inventory.produitId = produitResponse.data.id;
                inventory.stock[magasinResponse.data.id] = form.stock;
                setInventory(inventory);
                const response = await api.updateInventory(data.row.id, inventory);
                if (response.status === 200) {
                    setLoading(false);
                    hide();
                    notificationContext.setData({ show: true, message: t("inventory.success.editing"), isSuccess: true });
                    setTimeout(() => {
                        notificationContext.setData({ show: false, message: t("inventory.success.editing"), isSuccess: true });
                    }, 3000)
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                notificationContext.setData({ show: true, message: error instanceof NotFoundException ? error.message : `${error}`, isSucces: false });
                setTimeout(() => {
                    notificationContext.setData({ show: false, message: error instanceof NotFoundException ? error.message : `${error}`, isSucces: false });
                }, 3000)
                hide();
            }
        }
    }

    const storeInventaire = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        let validation = validator();
        setErrors(validation);
        if (Object.keys(validation).length === 0) {
            api.checkIfExist(form.magasin.value, form.produit.value).then(async (response) => {
                console.log(response);
                let inventory = new InventaireImpl(0, date, "", {})
                try {
                    const produitResponse = await produitApi.getProductByName(form.produit.value);
                    const magasinResponse = await magasinApi.getMagasinByName(form.magasin.value);
                    inventory.produitId = produitResponse.data.id;
                    inventory.stock[magasinResponse.data.id] = form.stock;
                    setInventory(inventory);
                    const response = await api.saveInventory(inventory);
                    if (response.status === 201) {
                        setLoading(false);
                        hide();
                        notificationContext.setData({ show: true, message: t("inventory.success.creating"), position: "top-center" ,isSuccess: true });
                        setTimeout(() => {
                            notificationContext.setData({ show: false, message: t("inventory.success.creating"), position: "top-center", isSuccess: true });
                        }, 3000)
                    }
                } catch (error) {
                    setLoading(false);
                    notificationContext.setData({ show: true, message: error instanceof NotFoundException ? error.message : `${error}`, position: "top-center", isSucces: false });
                    setTimeout(() => {
                        notificationContext.setData({ show: false, message: error instanceof NotFoundException ? error.message : `${error}`, position: "top-center", isSucces: false });
                    }, 3000)
                    hide();
                }

            }).catch((error) => {
                notificationContext.setData({ show: true, message: error.message, position: "top-center", isSucces: false });
                setTimeout(() => {
                    notificationContext.setData({ show: false, message: error.message, position: "top-center", isSucces: false });
                }, 3000)
            }
            )
        }
        setLoading(false);
    }

    let produits = form.produit.options.map((option) => <option value={option}>
        {option}
    </option>);

    let magasins = form.magasin.options.map((option) => <option value={option}>
        {option}
    </option>);

    return (
        <div>
            <div className="mb-4 text-light text-center">
                <h3><strong>{t("inventory.title").toUpperCase()}</strong></h3>
            </div>
            <Modal show={showModal} size="lg" backdrop="static" onHide={hide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{data.action !== "update" ? t("inventory.creating") : t("inventory.editing")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row g-3">
                            <div className="col-6">
                                <input type="text" value={form.date} readOnly={true} placeholder="Date du jour" className="form form-control" aria-label="Date" />
                            </div>
                            <div className="col-6">
                                <select className="form form-select" required value={form.magasin.value} onChange={changeMagasin} aria-label="Magasin">
                                    <option selected disabled value="">{t("store.select")}</option>
                                    {form.magasin.options.length != 0 && magasins}
                                </select>
                                {errors.magasinError && <div className="text-danger">{t("store.error")}</div>}
                            </div>
                            <div className="col-6">
                                <select className="form form-select" disabled={data.action === "update" ? false : !form.produit.enabled} required value={form.produit.value} onChange={changeProduit} aria-label="Produit">
                                    <option selected disabled value="">{t("product.select")}</option>
                                    {form.produit.options.length != 0 && produits}
                                </select>
                                {errors.produitError && <div className="text-danger">{t("product.error")}</div>}
                            </div>
                            <div className="col-6">
                                <input type="number" required placeholder="Stock" value={form.stock} onChange={changeStock} className="form form-control" aria-label="Stock" />
                                {errors.stockError && <div className="text-danger">{t("inventory.error")}</div>}
                            </div>
                        </div>
                        <div className="col-12 mt-4 text-center">
                            <button className="btn btn-outline-danger" type="button" onClick={hide} style={{ width: 130 }}>{
                                t("cancel")
                            }</button>
                            <button className="btn btn-success ms-2" type="submit" onClick={data.action === "update" ? updateInventaire : storeInventaire} style={{ width: 130 }}>{
                                loading ? <Loader color="light" size={300}/> : t("save")
                            }</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ModalInventory;