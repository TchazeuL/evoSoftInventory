import { Promise } from "q";
import ProduitService from "../services/ProduitService";
import Response from "../utils/Response";
import ProduitImpl from "../models/Produit";
import NotFoundException from "../utils/exceptions/NotFoundException";

class ProduitController {

    private produitService: ProduitService = new ProduitService();

    public constructor() { }

    public getProductById(id: string): Promise<Response<ProduitImpl>> {
        return Promise((resolve, reject) => {
            let produit = this.produitService.findById(id);
            if (produit == null) {
                let error = new NotFoundException("Non trouvé")
                reject(new Response(null, error.status, error.message))
            } else {
                resolve(new Response(produit, 200, "Succès"))
            }
        });
    }

    public getAllProducts(): Promise<Response<Array<ProduitImpl>>> {
        return Promise((resolve, reject) => {
            let produits = this.produitService.findAll();
            resolve(new Response(produits, 200, "Succès"))
        });
    }

    public getProductByName(nom: string): Promise<Response<ProduitImpl>> {
        return Promise((resolve, reject) => {
            let produit = this.produitService.findByName(nom);
            if (produit == null) {
                let error = new NotFoundException("Non trouvé")
                reject(new Response(null, error.status, error.message))
            } else {
                resolve(new Response(produit, 200, "Succès"))
            }
        });
    }

}

export default ProduitController;