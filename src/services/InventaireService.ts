import InventaireImpl from "../models/Inventaire";
import InventaireRepository from "../repositories/InventaireRepository";
import NotFoundException from "../utils/exceptions/NotFoundException";

class InventaireService implements InventaireRepository {

    private inventaire: InventaireImpl = new InventaireImpl(0, "", "", {});

    public constructor() { }

    public save(inventaire: InventaireImpl): void {
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

    public findById(id: number): InventaireImpl {
        let list = localStorage.getItem("inventaires");
        var inventaire;
        if (list != null) {
            let inventaires = JSON.parse(list) as Array<any>;
            inventaire = inventaires.find((item) => item.id === id);
            if (inventaire == null) {
                throw new NotFoundException("Non trouvé");
            }
        }
        return inventaire;
    }

    public update(id: number, inventaire: InventaireImpl): InventaireImpl {
        let item = this.findById(id);
        item.date = inventaire.date;
        item.produitId = inventaire.produitId;
        item.stock = inventaire.stock;
        this.save(item);
        return item;
    }
}

export default InventaireService;