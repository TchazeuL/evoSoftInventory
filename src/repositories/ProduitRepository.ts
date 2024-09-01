import ProduitImpl from "../models/Produit";

interface ProduitRepository {

    findById(id: string): ProduitImpl | null;

    findAll() : Array<ProduitImpl>
}

export default ProduitRepository;