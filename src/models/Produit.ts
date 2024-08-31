interface Produit {
    id: string,
    nom: string,
    prix: number,
}

class ProduitImpl implements Produit {

    private _id: string;

    private _nom: string;

    private _prix: number;

    public constructor(id: string, nom: string, prix: number) {
        this._id = id;
        this._nom = nom;
        this._prix = prix;
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

    public toJson(): any {
        return {
            "id": this.id,
            "nom": this.nom,
            "prix": this.prix
        }
    }

    public fromJson(json: any) : ProduitImpl {
        return new ProduitImpl(json["id"], json["nom"], json["prix"]);
    }
}

export default ProduitImpl;