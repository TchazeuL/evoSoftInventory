function Navbar({ title, textColor }: { title: string, textColor: string }): JSX.Element {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <a href="#" className="navbar-brand" style={{
                    color: textColor
                }}>{title}</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a href="#" className="nav-link active" aria-current="page" style={{ color: textColor }}>Magasins</a>
                        <a href="#" className="nav-link" aria-current="page" style={{ color: textColor }}>Produits</a>
                        <a href="#" className="nav-link" aria-current="page" style={{ color: textColor }}>Inventaire</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;