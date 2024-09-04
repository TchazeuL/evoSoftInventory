interface Inventaire {
    date: string,
    produitId: string,
    stock: Record<string, number>
}

class InventaireImpl implements Inventaire {

    // l'Id a été ajouté pour l'indexage

    private _id: number;

    private _date: string;

    private _produitId: string;

    private _stock: Record<string, number>;

    public constructor(id: number, date: string, produitId: string, stock: Record<string, number>) {
        this._id = id;
        this._date = date;
        this._produitId = produitId;
        this._stock = stock;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }


    get date(): string {
        return this._date;
    }

    set date(date: string) {
        this._date = date;
    }

    get produitId(): string {
        return this._produitId;
    }

    set produitId(produitId: string) {
        this._produitId = produitId;
    }

    get stock(): Record<string, number> {
        return this._stock;
    }

    set stock(stock: Record<string, number>) {
        this._stock = stock;
    }

    public toJson(): any {
        return {
            "id": this.id,
            "date": this.date,
            "produitId": this.produitId,
            "stock": this.stock
        }
    }

    public fromJson(json: any): InventaireImpl {
        return new InventaireImpl(json["id"], json["date"], json["produitId"], json["stock"]);
    }

}

export default InventaireImpl;

