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
            let magasin = this.magasinService.findById(id);
            if (magasin == null) {
                let error = new NotFoundException("Magasin " + "“" + id 
                + "“" + " non trouvé")
                reject(new Response(null, error.status, error.message))
            } else {
                resolve(new Response(magasin, 200, "Succès"))
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
            let magasin = this.magasinService.findByName(nom);
            if (magasin == null) {
                let error = new NotFoundException("Magasin " + "“" + nom 
                + "“" + " non trouvé")
                reject(new Response(null, error.status, error.message))
            } else {
                resolve(new Response(magasin, 200, "Succès"))
            }
        });
    }
}

export default MagasinController;