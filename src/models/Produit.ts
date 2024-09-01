import MagasinImpl from "./Magasin";

interface Produit {
    id: string,
    nom: string,
    prix: number,
}

class ProduitImpl implements Produit {

    private _id: string;

    private _nom: string;

    private _prix: number;

    private _magasins: Array<MagasinImpl>;

    public constructor(id: string, nom: string, prix: number, magasins: Array<MagasinImpl>) {
        this._id = id;
        this._nom = nom;
        this._prix = prix;
        this._magasins = magasins;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get nom(): string {
        return this._nom;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    get prix(): number {
        return this._prix;
    }

    set prix(prix: number) {
        this._prix = prix;
    }

    get magasins(): Array<MagasinImpl> {
        return this._magasins;
    }

    set magasins(magasins: Array<MagasinImpl>) {
        this._magasins = magasins
    }

    public toJson(): any {
        return {
            "id": this.id,
            "nom": this.nom,
            "prix": this.prix
        }
    }

    public fromJson(json: any): ProduitImpl {
        return new ProduitImpl(json["id"], json["nom"], json["prix"], json["magasins"]);
    }

    public getMagasins(data: Array<any>) : Array<ProduitImpl>{
        let magasins = [];
        for(var item in data){
            magasins.push(new ProduitImpl("", "", 0, []).fromJson(item))
        }
        return magasins;
    }
}

export default ProduitImpl;