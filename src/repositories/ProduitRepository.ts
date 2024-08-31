import ProduitImpl from "../models/Produit";

interface ProduitRepository {
    findById(id: string): ProduitImpl;
}

export default ProduitRepository;