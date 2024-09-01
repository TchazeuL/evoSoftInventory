import MagasinImpl from "../models/Magasin";

interface MagasinRepository {
    
    findById(id: string): MagasinImpl | null;

    findAll(): Array<MagasinImpl>;

    findByName(nom: string) : MagasinImpl | null;
}

export default MagasinRepository;