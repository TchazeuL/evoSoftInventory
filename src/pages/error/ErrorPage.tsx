import "./error.css"

function ErrorPage(): any {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 error">
            <div className="text-center row text-light">
                <h1>404</h1>
                <h6>Oups... Page introuvable</h6>
            </div>
        </div>
    );
}

export default ErrorPage;