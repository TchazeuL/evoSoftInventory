import { magasins } from "../data/datas";
import MagasinImpl from "../models/Magasin";
import MagasinRepository from "../repositories/MagasinRepository";

class MagasinService implements MagasinRepository {

    public constructor(){}

    public findById(id: string): MagasinImpl {
        let magasin = new MagasinImpl("", "", "", []);
        const list = magasins;
        return magasin.fromJson(list.find((item) => item.id === id));
    }
}

export default MagasinService;