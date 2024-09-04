import InventaireImpl from "../models/Inventaire";
import InventaireRepository from "../repositories/InventaireRepository";

class InventaireService implements InventaireRepository {

    private inventaire: InventaireImpl = new InventaireImpl(0, "", "", {});

    public constructor() { }

    public save(inventaire: InventaireImpl): InventaireImpl | null {
        if (localStorage.getItem("inventaires") == null) {
            localStorage.setItem("inventaires", JSON.stringify({ size: 0, content: [] }));
        }
        let data = localStorage.getItem("inventaires");
        if (data != null) {
            let datas = JSON.parse(data);
            let inventaires = datas.content as Array<any>;
            let size = datas.size;
            if (size === 0) {
                size++;
            } else {
                size = Math.max(...inventaires.map((item) => item.id)) + 1
                console.log(size);
            }
            inventaire.id = size;
            console.log(inventaires.map((item: any) => item.id));
            console.log(inventaires);
            inventaires.push(inventaire.toJson());
            localStorage.setItem("inventaires", JSON.stringify({ size: size, content: inventaires }));
            return inventaire;
        }
        return null;
    }

    public findAll(): Array<InventaireImpl> {
        const list = localStorage.getItem("inventaires")
        if (list != null) {
            const data = JSON.parse(list) as Record<string, any>;
            return data["content"].map((item: any) => this.inventaire.fromJson(item))
        }
        return [];
    }

    public findById(id: number): InventaireImpl | null {
        let list = localStorage.getItem("inventaires");
        let inventaire = null;
        if (list != null) {
            const response = JSON.parse(list) as Record<string, any>;
            const inventaires = response["content"] as Array<any>;
            let index = inventaires.map((item) => item.id).indexOf(id);
            if (index != -1) {
                inventaire = inventaires.find((item) => item.id === id);
            }
        }
        return inventaire;
    }

    public update(id: number, inventaire: InventaireImpl): InventaireImpl | null {
        let item = this.findById(id);
        console.log(id);
        if (item != null) {
            item.date = inventaire.date;
            item.produitId = inventaire.produitId;
            item.stock = inventaire.stock;
            let data = JSON.parse(`${localStorage.getItem("inventaires")}`);
            let content = data.content as Array<any>;
            const index = content.indexOf(content.find((value) => value.id === id));
            content.splice(index, 1, item);
            data.content = content
            localStorage.setItem("inventaires", JSON.stringify(data));
            return item;
        }
        return null
    }
}

export default InventaireService;