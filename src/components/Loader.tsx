import { Spinner } from "react-bootstrap";

function Loader({color} : {color: string}): any {
    return (
        <Spinner animation="border" size="sm" variant={color}></Spinner>
    );
}

export default Loader;
