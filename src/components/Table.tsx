import { useContext } from "react";
import { UpdatingContext } from "../contexts/Updating";

function Table({ rows, columns, titleId }: { rows: Array<Record<string, any>>, columns: Array<string> , titleId: string}): JSX.Element {

    const { setData } = useContext(UpdatingContext);

    const cols = columns.map((column) => <th key={columns.indexOf(column)} scope="col">
        {column}
    </th>);

    const getValue = (row: Record<string, any>): void => {
        const data = {
            showModal: true,
            action: "update",
            row: {id: row[titleId], date: row["date"], magasin: row["magasin"], produit: row["produit"], stock: row["stock"] }
        };
        setData(data);
    }

    const lines = rows.map((row) => <tr>
        {
            Object.keys(row).map((value) => value === titleId ? <th scope="row" className="bg-dark text-light" key={Object.keys(row).indexOf(value)}>{row[value]}</th>
                : value === "modifier" ?
                    <button key={Object.keys(row).indexOf(value)} onClick={() => getValue(row)} className="btn btn-warning bg-warning" style={{
                        marginLeft: 20,
                        marginTop: 5,
                        marginBottom: 5,
                        marginRight: -15,
                        width: 120,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>{row[value]}</button> : <td key={Object.keys(row).indexOf(value)}>{row[value]}</td>)
        }
    </tr>
    )

    return (
        <div>
            <table className="table table-striped table-bordered table-responsive border-dark">
                <thead className="table-dark text-center">
                    <tr>
                        {cols}
                    </tr>
                </thead>
                <tbody>
                    {lines}
                </tbody>
            </table>
        </div>
    );
}

export default Table;