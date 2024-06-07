import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import "./Error404Page.scss"

const Error404Page = () => {
    return (
        <main className="error404">
            <Navbar />
            <h1 className="error404__heading">ERROR 404</h1>
            <h2 className="error404__text">Welcome to the Physical 100 training grounds.</h2>
            <h2 className="error404__text">Stretch those navigation muscles on your way back to the main show.</h2>
            <Link to="/"><h2 className="error404__text error404__arrow">→</h2></Link>
        </main>
    )
};

export default Error404Page;