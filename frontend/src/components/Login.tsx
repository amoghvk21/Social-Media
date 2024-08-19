import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"
import Feed from "./Feed";


function Login() {

    //const navigate = useNavigate();

    return (
        <GoogleLogin
            onSuccess={(credentialsResponse) => {
                let decoded = jwtDecode(credentialsResponse.credential);
                //console.log(decoded.email, decoded.given_name)
                //console.log(decoded)
                localStorage.setItem('email', decoded.email);
                localStorage.setItem('name', decoded.name);
                window.location.reload()
                }
            }
            onError={() => console.log("login failed")}
        />
    );
}

export default Login;
