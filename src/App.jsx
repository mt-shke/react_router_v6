import { useState } from "react";
import { getData } from "./api";
import AccountCard from "./components/account/AccountCard";

const App = () => {
    const [accountsFound, setAccountsFound] = useState([]);
    const getAccount = async () => {
        try {
            const accounts = await getData("accounts");
            if (!accounts) {
                return;
            }

            const sliced = accounts.accounts.filter((acc, ind) => ind < 250);

            setAccountsFound((p) => sliced);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            <div className="App w-full h-full flex flex-col">
                <h1 className="text-black">Hello</h1>
                <button onClick={() => getAccount()}>get accounts</button>
                {accountsFound.length > 1 &&
                    accountsFound.map((acc, ind) => (
                        <AccountCard key={ind} account={acc} ind={ind} />
                    ))}
            </div>
        </main>
    );
};

export default App;
