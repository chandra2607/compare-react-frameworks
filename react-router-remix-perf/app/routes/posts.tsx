import { useNavigation } from "react-router";
import { Outlet, Link, Form } from "react-router";

export async function loader() {
    await new Promise(res => setTimeout(res, 2000));

    return {
        message: "Loaded after delay",
    };
}


export default function PostsLayout() {

    return (
        <div>
            <header>
                <h1 className="text-lg bg-red-500">Posts</h1>
                <nav>
                    <Link to="/posts">All</Link>{" "}
                    <Link to="/posts/new">New</Link>
                </nav>

                <Form method="post">
                    <button type="submit">Trigger Error</button>
                </Form>
            </header>

            <hr />
            <GlobalLoadingIndicator />
            <Outlet />
        </div>
    );
}

export function ErrorBoundary({ error }) {
    return (
        <div>
            <h2>Something went wrong (Action)</h2>
            <pre>{error.message}</pre>
        </div>
    );
}


function GlobalLoadingIndicator() {
    const nav = useNavigation();

    return (
        <>
            <pre style={{ background: "#111", color: "lime" }}>
                {JSON.stringify(nav, null, 2)}
            </pre>
            <div>
                {nav.state === "loading" && <p>Loading...</p>}
                {nav.state === "submitting" && <p>Submitting...</p>}
            </div>
        </>
    );
}
