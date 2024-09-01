import MagasinImpl from "../models/Magasin";

interface MagasinRepository {
    
    findById(id: string): MagasinImpl | null;

    findAll(): Array<MagasinImpl>;
}

export default MagasinRepository;