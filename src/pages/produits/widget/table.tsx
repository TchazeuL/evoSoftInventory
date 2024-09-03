import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import ProduitController from "../../../controllers/ProduitController";
import ProduitImpl from "../../../models/Produit";

function TableProduit() : any {
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        getProduits();
    })


    const getProduits =  async() : Promise<void> => {
        const api = new ProduitController();
        const response = await api.getAllProducts();
        if (response.status === 200){
            const data = response.data as Array<ProduitImpl>; 
            const produits = data.map((value) => {
                const produit = value.toJson();
                return {
                    "Numéro": produit.id,
                    "nom": produit.nom,
                    "prix (XAF)": produit.prix
                }
            });
            if (produits.length > 0){
                setColumns(Object.keys(produits[0]));
                setRows(produits);
            }
        }
    }

    return (
      rows.length > 0 ?  <Table rows={rows} columns={columns} titleId="Numéro"/> : <div className="text-center">Aucun magasin</div>
    )
}

export default TableProduit ; 