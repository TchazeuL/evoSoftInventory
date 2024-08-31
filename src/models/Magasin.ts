interface Magasin {
    id: string,
    nom: string,
    adresse: string,
}

class MagasinImpl implements Magasin {

    private _id: string;

    private _nom: string;

    private _adresse: string;

    public constructor(id: string, nom: string, adresse: string) {
        this._id = id;
        this._nom = nom;
        this._adresse = adresse;
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

    public set adresse(adresse: string) {
        this._adresse = adresse;
    }

    public toJson(): any {
        return {
            "id": this.id,
            "nom": this.nom,
            "adresse": this.adresse
        }
    }

    public fromJson(json: any) : MagasinImpl {
        return new MagasinImpl(json["id"], json["nom"], json["adresse"]);
    }
}

export default MagasinImpl;