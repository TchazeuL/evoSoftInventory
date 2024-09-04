import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

interface Language {
    name: string,
    short: string
}

function Navbar({ title, textColor }: { title: string, textColor: string }): JSX.Element {
    const { t, i18n } = useTranslation();
    const languages: Array<Language> = [
        {
            name: "English",
            short: "en"
        },
        {
            name: "Français",
            short: "fr"
        }
    ]

    const options = languages.map((item) => {
        return <option value={item.short} key={languages.indexOf(item)}>{item.name}</option>
    })

    const translate = (event: React.ChangeEvent<HTMLSelectElement>) : void => {
        i18n.changeLanguage(event.target.value);
    }

    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand" style={{
                        color: textColor,
                        fontWeight: "bold"
                    }}>{title}</Link>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/magasins" className="nav-link active" aria-current="page" style={{ color: textColor }}>{t("store.nav")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/produits" className="nav-link" aria-current="page" style={{ color: textColor }}>{t("product.nav")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/inventaire" className="nav-link" aria-current="page" style={{ color: textColor }}>{t("inventory.nav")}</Link>
                            </li>
                        </ul>
                        <form className="row ms-auto col-2">
                            <select defaultValue={i18n.language} className="form-select form-select bg-secondary border-dark text-white" onChange={translate}>
                                <option disabled value="">{t("select_navbar")}</option>
                                {options.length > 0 && options}
                            </select>
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
        </header>
    );
}

export default Navbar;