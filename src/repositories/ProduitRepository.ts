import ProduitImpl from "../models/Produit";

interface ProduitRepository {

    findById(id: string): ProduitImpl | null;

    findAll() : Array<ProduitImpl>;

    findByName(nom: string) : ProduitImpl | null;

    findByMagasin(idMagasin: string) : Array<ProduitImpl | null>
}

export default ProduitRepository;