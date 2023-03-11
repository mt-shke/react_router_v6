import AccountCardItem from "./AccountCardItem";

const AccountCard = (account) => {
    return (
        <ul className="p-6">
            {Object.entries(Object.values(account)[0]).map((acc, ind) => (
                <AccountCardItem key={ind} acc={acc} />
            ))}
        </ul>
    );
};

export default AccountCard;
