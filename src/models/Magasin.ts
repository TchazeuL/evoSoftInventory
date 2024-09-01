import ProduitImpl from "./Produit";

interface Magasin {
    id: string,
    nom: string,
    adresse: string,
}

class MagasinImpl implements Magasin {

    private _id: string;

    private _nom: string;

    private _adresse: string;

    private _produits: Array<ProduitImpl>;


    public constructor(id: string, nom: string, adresse: string, produits: Array<ProduitImpl>) {
        this._id = id;
        this._nom = nom;
        this._adresse = adresse;
        this._produits = produits
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

    get adresse(): string {
        return this._adresse;
    }

    set adresse(adresse: string) {
        this._adresse = adresse;
    }

    get produits(): Array<ProduitImpl>{
        return this._produits;
    }

    set produits(produits: Array<ProduitImpl>){
        this._produits = produits;
    }

    public toJson(): any {
        return {
            "id": this.id,
            "nom": this.nom,
            "adresse": this.adresse
        }
    }

    public fromJson(json: any) : MagasinImpl {
        return new MagasinImpl(json["id"], json["nom"], json["adresse"], this.getProduits(json["produits"]));
    }

    public getProduits(data: Array<any>) : Array<ProduitImpl>{
        let produits = [];
        for(var item in data){
            produits.push(new ProduitImpl("", "", 0, []).fromJson(item))
        }
        return produits;
    }
}

export default MagasinImpl;