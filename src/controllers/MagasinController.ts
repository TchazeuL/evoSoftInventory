import { Promise } from "q";
import MagasinImpl from "../models/Magasin";
import MagasinService from "../services/MagasinService";
import Response from "../utils/Response";

class MagasinController {

    private magasinService: MagasinService = new MagasinService();

    public constructor(){}

    public getMagasinById(id: string): Promise<Response<MagasinImpl>> {
        return Promise((resolve, reject) => {
            try {
                let magasin = this.magasinService.findById(id);
                resolve(new Response(magasin, 200, "Succès"))
            } catch (error) {
                reject(new Response(null, 404, "Non trouvé"))
            }
        });
    }
}

export default MagasinController;