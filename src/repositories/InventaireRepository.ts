import InventaireImpl from "../models/Inventaire";

interface InventaireRepository {

    save(inventaire: InventaireImpl): void;

    findAll() : Array<InventaireImpl> ; 

    findById(id: number): InventaireImpl ;

    update(id: number, inventaire: InventaireImpl) : InventaireImpl;

}

export default InventaireRepository;