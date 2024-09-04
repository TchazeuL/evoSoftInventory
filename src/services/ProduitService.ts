import { produits } from "../data/datas";
import ProduitImpl from "../models/Produit";
import ProduitRepository from "../repositories/ProduitRepository";

class ProduitService implements ProduitRepository {

    public constructor(){}

    public findById(id: string): ProduitImpl | null {
        let produit = new ProduitImpl("", "", 0, []);
        const list = produits;
        let index = list.map((item) => item.id).indexOf(id);
        if (index !== -1){
            return produit.fromJson(list.find((item) => item.id === id));
        }
        return null;
    }

    public findAll(): Array<ProduitImpl> {
        let products = produits.map((item) => new ProduitImpl("", "", 0, []).fromJson(item));
        return products;
    }

    public findByName(nom: string): ProduitImpl | null {
        let produit = new ProduitImpl("", "", 0, []);
        const list = produits;
        let index = list.map((item) => item.nom).indexOf(nom);
        if (index !== -1){
            return produit.fromJson(list.find((item) => item.nom === nom));
        }
        return null;
    }

}

export default ProduitService;