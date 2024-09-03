import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import MagasinController from "../../../controllers/MagasinController";
import MagasinImpl from "../../../models/Magasin";

function TableMagasin() : any {
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        getMagasins();
    })


    const getMagasins =  async() : Promise<void> => {
        const api = new MagasinController();
        const response = await api.getAllMagasins();
        if (response.status === 200){
            const data = response.data as Array<MagasinImpl>; 
            const magasins = data.map((value) => {
                const magasin = value.toJson();
                return {
                    "Numéro": magasin.id,
                    "nom": magasin.nom,
                    "adresse": magasin.adresse
                }
            });
            if (magasins.length > 0){
                setColumns(Object.keys(magasins[0]));
                setRows(magasins);
            }
        }
    }

    return (
      rows.length > 0 ?  <Table rows={rows} columns={columns} titleId="Numéro"/> : <div className="text-center">Aucun magasin</div>
    )
}

export default TableMagasin ; 