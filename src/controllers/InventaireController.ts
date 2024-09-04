import { Promise } from "q";
import InventaireImpl from "../models/Inventaire";
import InventaireService from "../services/InventaireService";
import Response from "../utils/Response";
import NotFoundException from "../utils/exceptions/NotFoundException";

class InventaireController {

    private inventaireService: InventaireService = new InventaireService();

    public constructor() { }

    public saveInventory(inventaire: InventaireImpl): Promise<Response<InventaireImpl>> {
        return Promise((resolve, reject) => {
            try {
                const result = this.inventaireService.save(inventaire);
                resolve(new Response(result, 201, "Inventaire créé avec succès"));
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    reject(new Response(null, 500, error.message));
                }
            }
        });
    }

    public updateInventory(id: number, inventaire: InventaireImpl): Promise<Response<InventaireImpl>> {
        return Promise((resolve, reject) => {
            let update = this.inventaireService.update(id, inventaire);
            resolve(new Response(inventaire, 200, "Modifié avec succès"));
            if (update === null) {
                const error = new NotFoundException("Inventaire non trouvé");
                reject(new Response(null, error.status, error.message));
            }
        });
    }

    public getAllInventories(): Promise<Response<Array<InventaireImpl>>> {
        return Promise((resolve, reject) => {
            try {
                let inventaires = this.inventaireService.findAll()
                resolve(new Response(inventaires, 200, "Succès"));
            } catch (error) {
                reject(new Response(null, 500, "Erreur lors de la recuperation"));
            }
        });
    }

    public getInventoryById(id: number): Promise<Response<Array<InventaireImpl>>> {
        return Promise((resolve, reject) => {
            let inventaire = this.inventaireService.findById(id);
            resolve(new Response(inventaire, 200, "Succès"));
            if (inventaire === null) {
                const error = new NotFoundException("Inventaire non trouvé");
                reject(new Response(null, error.status, error.message));
            }
        });
    }

}

export default InventaireController;