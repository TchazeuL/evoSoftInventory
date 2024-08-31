import InventaireImpl from "../models/Inventaire";

interface InventaireRepository {
    save(inventaire: InventaireImpl): void;
}

export default InventaireRepository;