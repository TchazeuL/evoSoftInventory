import { magasins } from "../data/datas";
import MagasinImpl from "../models/Magasin";
import MagasinRepository from "../repositories/MagasinRepository";
import NotFoundException from "../utils/exceptions/NotFoundException";

class MagasinService implements MagasinRepository {

    public constructor(){}

    public findById(id: string): MagasinImpl | null {
        let magasin = new MagasinImpl("", "", "", []);
        const list = magasins;
        let index = list.map((item) => item.id).indexOf(id);
        if (index != -1){
            return magasin.fromJson(list.find((item) => item.id === id));
        }
        return null;
    }

    public findAll(): Array<MagasinImpl> {
        let mags = magasins.map((item) => new MagasinImpl("", "", "", []).fromJson(item));
        return mags;
    }
}

export default MagasinService;