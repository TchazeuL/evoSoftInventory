import InventaireImpl from "../models/Inventaire";

interface InventaireRepository {

    save(inventaire: InventaireImpl): InventaireImpl | null;

    findAll() : Array<InventaireImpl> ; 

    findById(id: number): InventaireImpl | null;

    update(id: number, inventaire: InventaireImpl) : InventaireImpl | null;

}

export default InventaireRepository;