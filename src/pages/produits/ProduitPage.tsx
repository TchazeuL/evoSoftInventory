import "./produit.css";
import TableProduit from "./widget/table";

function ProduitPage({title}: {title: string}): any {

    return (
        <div className="produit offset-2 col-8">
            <div className="mb-4 text-light text-center">
                <h3><strong>{title}</strong></h3>
            </div>
            <TableProduit />
        </div>
    )
}

export default ProduitPage;