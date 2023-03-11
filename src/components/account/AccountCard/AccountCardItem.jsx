const AccountCardItem = (acc) => {
    return (
        <>
            <li className="flex gap-2" key={Math.random() * 2002}>
                <span className="capitalize">{acc.acc[0]}</span>:
                <span className="flex gap-2">
                    {typeof acc.acc[1] === Array
                        ? acc.acc[1].toString()
                        : acc.acc[1]}
                </span>
            </li>
        </>
    );
};

export default AccountCardItem;
