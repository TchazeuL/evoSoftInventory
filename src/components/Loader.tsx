import { Spinner } from "react-bootstrap";

function Loader({color, size} : {color: string, size?: number}): any {
    return (
        <Spinner animation="border" size="sm" variant={color} style={{
            width: size,
            height: size
        }}></Spinner>
    );
}

export default Loader;
