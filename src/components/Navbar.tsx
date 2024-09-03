import { Link, Outlet } from "react-router-dom";

function Navbar({ title, textColor }: { title: string, textColor: string }): JSX.Element {
    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container">
                    <a href="#" className="navbar-brand" style={{
                        color: textColor
                    }}>{title}</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/magasins" className="nav-link active" aria-current="page" style={{ color: textColor }}>Magasins</Link>
                            <Link to="/produits" className="nav-link" aria-current="page" style={{ color: textColor }}>Produits</Link>
                            <Link to="/inventaire" className="nav-link" aria-current="page" style={{ color: textColor }}>Inventaire</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </header>
    );
}

export default Navbar;