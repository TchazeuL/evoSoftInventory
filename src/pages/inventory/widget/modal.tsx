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


interface Errors {
    produitError?: string,
    magasinError?: string,
    stockError?: string,
}

interface Select {
    value: string,
    options: Array<string>
}

interface Form {
    date: string,
    magasin: Select,
    produit: Select,
    stock: number
}

const date = new Date().toLocaleString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric"
});

function ModalInventory(): any {
    const notificationContext = useContext(NotificationContext);
    const { data } = useContext(UpdatingContext);
    const [form, setForm] = useState<Form>({ date: date, magasin: { value: "", options: [] }, produit: { value: "", options: [] }, stock: 0 });
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
                ...value, date: data.row.date, magasin: { value: data.row.magasin, options: value.magasin.options }, produit: { value: data.row.produit, options: value.produit.options }, stock: data.row.stock
            }))
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
        if (form.stock < 0) {
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


    const changeMagasin = (event: React.ChangeEvent<any>): void => {
        setForm({ ...form, magasin: { value: event.target.value, options: form.magasin.options } });
    }

    const changeProduit = (event: React.ChangeEvent<any>): void => {
        setForm({ ...form, produit: { value: event.target.value, options: form.produit.options } });
    }

    const changeStock = (event: React.ChangeEvent<any>): void => {
        setForm({ ...form, stock: event.target.value });
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
            let inventory = new InventaireImpl(data.row.id, data.row.date, "", {})
            try {
                const produitResponse = await produitApi.getProductByName(form.produit.value);
                const magasinResponse = await magasinApi.getMagasinByName(form.magasin.value);
                inventory.produitId = produitResponse.data.id;
                inventory.stock[magasinResponse.data.id] = form.stock;
                setInventory(inventory);
                const response = await api.updateInventory(data.row.id, inventory);
                if (response.status === 200) {
                    console.log("update", response.data);
                    setLoading(false);
                    hide();
                    notificationContext.setData({ show: true, message: response.message, isSuccess: true });
                    setTimeout(() => {
                        notificationContext.setData({ show: false, message: response.message, isSuccess: true });
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
                    notificationContext.setData({ show: true, message: response.message, isSuccess: true });
                    setTimeout(() => {
                        notificationContext.setData({ show: false, message: response.message, isSuccess: true });
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
            <div className="d-flex mb-3 col-12">
                <div className="col-6">
                    <button className="btn btn-primary col-4" onClick={show}>Ajouter</button>
                    <button className="btn btn-outline-primary ms-2 col-4" onClick={() => window.location.reload()}>Actualiser</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary offset-6 col-6">Exporter en csv</button>
                </div>
            </div>
            <Modal show={showModal} size="lg" backdrop="static" onHide={hide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{data.action === "update" ? "Création d'un inventaire" : "Modification d'un inventaire"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row g-3">
                            <div className="col-6">
                                <input type="text" value={form.date} readOnly={true} placeholder="Date du jour" className="form form-control" aria-label="Date" />
                            </div>
                            <div className="col-6">
                                <select className="form form-select" required value={form.magasin.value} onChange={changeMagasin} aria-label="Magasin">
                                    <option selected disabled value="">Selectioner un magasin</option>
                                    {form.magasin.options.length != 0 && magasins}
                                </select>
                                {errors.magasinError && <div className="text-danger">{errors.magasinError}</div>}
                            </div>
                            <div className="col-6">
                                <select className="form form-select" required value={form.produit.value} onChange={changeProduit} aria-label="Produit">
                                    <option selected disabled value="">Selectioner un produit</option>
                                    {form.produit.options.length != 0 && produits}
                                </select>
                                {errors.produitError && <div className="text-danger">{errors.produitError}</div>}
                            </div>
                            <div className="col-6">
                                <input type="number" required placeholder="Stock" value={form.stock} onChange={changeStock} className="form form-control" aria-label="Stock" />
                                {errors.stockError && <div className="text-danger">{errors.stockError}</div>}
                            </div>
                        </div>
                        <div className="col-6 offset-5 mt-4">
                            <button className="btn btn-success" type="submit" onClick={data.action === "update" ? updateInventaire : storeInventaire} style={{ width: 130 }}>{
                                loading ? <Loader /> : "Enrégistrer"
                            }</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ModalInventory;