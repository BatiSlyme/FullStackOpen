import { Button } from "@mui/material";
import receipts from "./services/receipts";
import { User } from "./global/user";

const logout = async (setUsername) => {
    setUsername(undefined);
    await receipts.logout();
    User.token = undefined;
};

const Logout = ({ setUsername }) => {
    return (
        <Button style={{ color: 'white', backgroundColor: 'red', padding: '10px 20px' }} className="button" onClick={() => { logout(setUsername) }}>
            Logout
        </Button >
    );
};

export default Logout;
