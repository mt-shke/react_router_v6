import { useEffect } from "react";
import {
    Form,
    Link,
    NavLink,
    Outlet,
    redirect,
    useLoaderData,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    {/* <form id="search-form" role="search"> */}
                    <Form id="search-form" role="search">
                        <input
                            className={searching ? "loading" : ""}
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                // submit(event.currentTarget.form);
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    {/* </form> */}

                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {/* <ul>
                        <li>
                            <Link to={`contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            <Link to={`contacts/2`}>Your Friend</Link>
                        </li>
                    </ul> */}
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                ? "pending"
                                                : ""
                                        }
                                    >
                                        <div to={`contacts/${contact.id}`}>
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first}{" "}
                                                    {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </div>
                                        {/* other code */}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    );
}
