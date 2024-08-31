import MagasinImpl from "../models/Magasin";

interface MagasinRepository {
    findById(id: string): MagasinImpl;
}

export default MagasinRepository;