import { produits } from "../data/datas";
import ProduitImpl from "../models/Produit";
import ProduitRepository from "../repositories/ProduitRepository";

class ProduitService implements ProduitRepository {

    public constructor(){}

    public findById(id: string): ProduitImpl {
        let produit = new ProduitImpl("", "", 0);
        const list = produits;
        return produit.fromJson(list.find((item) => item.id === id));
    }

}

export default ProduitService;