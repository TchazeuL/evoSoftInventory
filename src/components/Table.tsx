function Table({ rows, columns }: { rows: Array<Record<string, any>>, columns: Array<string> }): JSX.Element {

    const cols = columns.map((column) => <th key={columns.indexOf(column)} scope="col">
        {column}
    </th>);

    const lines = rows.map((row) => <tr>
        {
            Object.keys(row).map((value) => value === "#" ? <th scope="row">{row[value]}</th>  : value === "modifier" ? <button className="btn btn-warning bg-warning" style={{
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
            <table className="table table-striped table-bordered table-responsive">
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