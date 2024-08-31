import ProduitImpl from "../models/Produit";

interface ProduitRepository {
    findById(id: string): ProduitImpl | null;
}

export default ProduitRepository;