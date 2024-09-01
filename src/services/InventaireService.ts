import InventaireImpl from "../models/Inventaire";
import InventaireRepository from "../repositories/InventaireRepository";
import NotFoundException from "../utils/exceptions/NotFoundException";

class InventaireService implements InventaireRepository {

    private inventaire: InventaireImpl = new InventaireImpl(0, "", "", {});

    public constructor() { }

    public save(inventaire: InventaireImpl): void {
        if (localStorage.getItem("inventaires") == null) {
            localStorage.setItem("inventaires", JSON.stringify([]));
        }
        let list = localStorage.getItem("inventaires");
        if (list != null) {
            let inventaires = JSON.parse(list);
            inventaires.push(inventaire.toJson())
            localStorage.setItem("inventaires", JSON.stringify(inventaires));
        }
    }

    public findAll(): Array<InventaireImpl> {
        const list = localStorage.getItem("inventaires")
        if (list != null) {
            let inventaires = JSON.parse(list) as Array<any>;
            return inventaires.map((item) => this.inventaire.fromJson(item))
        }
        return [];
    }

    public findById(id: number): InventaireImpl | null {
        let list = localStorage.getItem("inventaires");
        var inventaire = null;
        if (list != null) {
            let inventaires = JSON.parse(list) as Array<any>;
            let index = inventaires.map((item) => item.id).indexOf(id);
            if (index != 1) {
                inventaire = inventaires.find((item) => item.id === id);
                return inventaire;
            }
        }
        return inventaire;
    }

    public update(id: number, inventaire: InventaireImpl): InventaireImpl | null {
        let item = this.findById(id);
        if (item != null) {
            item.date = inventaire.date;
            item.produitId = inventaire.produitId;
            item.stock = inventaire.stock;
            this.save(item);
            return item;
        }
        return null
    }
}

export default InventaireService;