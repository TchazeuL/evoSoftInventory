import TableMagasin from "./widget/table";

import "./magasin.css";

function MagasinPage({title} : {title: string}) : any {

    return (
        <div className="magasin offset-2 col-8">
            <div className="mb-4 text-light text-center">
                <h3><strong>{title}</strong></h3>
            </div>
            <TableMagasin/>
        </div>
    )
}

export default MagasinPage;