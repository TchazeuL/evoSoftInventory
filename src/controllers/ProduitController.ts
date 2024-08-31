import { Promise } from "q";
import ProduitService from "../services/ProduitService";
import Response from "../utils/Response";
import ProduitImpl from "../models/Produit";

class ProduitController {
    
    private produitService: ProduitService = new ProduitService();

    public constructor(){}

    public getProductById(id: string): Promise<Response<ProduitImpl>> {
        return Promise((resolve, reject) => {
            try {
                let produit = this.produitService.findById(id);
                resolve(new Response(produit, 200, "Succès"))
            } catch (error) {
                reject(new Response(null, 404, "Non trouvé"))
            }
        });
    }
}

export default ProduitController;