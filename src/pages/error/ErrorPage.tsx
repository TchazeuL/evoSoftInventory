import { useTranslation } from "react-i18next";
import "./error.css"

function ErrorPage(): any {
    const { t } = useTranslation();
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 error">
            <div className="text-center row text-light">
                <h1>404</h1>
                <h6>{`Oups... ${t("error")}`}</h6>
            </div>
        </div>
    );
}

export default ErrorPage;