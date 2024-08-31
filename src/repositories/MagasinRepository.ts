import MagasinImpl from "../models/Magasin";

interface MagasinRepository {
    findById(id: string): MagasinImpl | null;
}

export default MagasinRepository;