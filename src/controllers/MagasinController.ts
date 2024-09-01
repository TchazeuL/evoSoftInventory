import { Promise } from "q";
import MagasinImpl from "../models/Magasin";
import MagasinService from "../services/MagasinService";
import Response from "../utils/Response";
import NotFoundException from "../utils/exceptions/NotFoundException";

class MagasinController {

    private magasinService: MagasinService = new MagasinService();

    public constructor() { }

    public getMagasinById(id: string): Promise<Response<MagasinImpl>> {
        return Promise((resolve, reject) => {
            try {
                let magasin = this.magasinService.findById(id);
                resolve(new Response(magasin, 200, "Succès"))
            } catch (error) {
                if (error instanceof NotFoundException) {
                    reject(new Response(null, error.status, error.message))
                }
            }
        });
    }

    public getAllMagasins(): Promise<Response<Array<MagasinImpl>>> {
        return Promise((resolve, reject) => {
            let magasins = this.magasinService.findAll();
            resolve(new Response(magasins, 200, "Succès"))
        })
    }

    public getMagasinByName(nom: string): Promise<Response<MagasinImpl>> {
        return Promise((resolve, reject) => {
            let produit = this.magasinService.findByName(nom);
            if (produit == null) {
                let error = new NotFoundException("Non trouvé")
                reject(new Response(null, error.status, error.message))
            } else {
                resolve(new Response(produit, 200, "Succès"))
            }
        });
    }
}

export default MagasinController;