import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import ProduitController from "../../../controllers/ProduitController";
import ProduitImpl from "../../../models/Produit";
import { useTranslation } from "react-i18next";

function TableProduit(): any {
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getProduits();
    })


    const getProduits = async (): Promise<void> => {
        const api = new ProduitController();
        const response = await api.getAllProducts();
        if (response.status === 200) {
            const data = response.data as Array<ProduitImpl>;
            const produits = data.map((value) => {
                const produit = value.toJson();
                return {
                    "Référence": produit.id,
                    "nom": produit.nom,
                    "prix (XAF)": produit.prix
                }
            });
            if (produits.length > 0) {
                setColumns([t("product.id"), t("product.name"), t("product.price") ] );
                setRows(produits);
            }
        }
    }

    return (
        rows.length > 0 ? <Table rows={rows} columns={columns} titleId="Référence" /> : <div className="text-center">Aucun magasin</div>
    )
}

export default TableProduit; 