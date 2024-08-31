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
                this.inventaireService.save(inventaire);
                resolve(new Response(inventaire, 201, "Créé avec succès"));
            } catch (error) {
                reject(new Response(null, 500, "Erreur lors de la soumission"));
            }
        });
    }

    public updateInventory(id: number, inventaire: InventaireImpl): Promise<Response<InventaireImpl>> {
        return Promise((resolve, reject) => {
            try {
                this.inventaireService.update(id, inventaire);
                resolve(new Response(inventaire, 200, "Modifié avec succès"));
            } catch (error) {
                if (error instanceof NotFoundException){
                    reject(new Response(null, error.status, error.message));
                }
            }
        });
    }

    public getAllInventories() : Promise<Response<Array<InventaireImpl>>> {
        return Promise((resolve, reject) => {
            try {
                let inventaires = this.inventaireService.findAll()
                resolve(new Response(inventaires, 200, "Modifié avec succès"));
            } catch (error) {
                reject(new Response(null, 500, "Erreur lors de la recuperation"));
            }
        });
    }

    public getInventoryById(id: number) : Promise<Response<Array<InventaireImpl>>> {
        return Promise((resolve, reject) => {
            try {
                let inventaire = this.inventaireService.findById(id);
                resolve(new Response(inventaire, 200, "Modifié avec succès"));
            } catch (error) {
                if (error instanceof NotFoundException){
                    reject(new Response(null, error.status, error.message));
                }
            }
        });
    }

}

export default InventaireController;