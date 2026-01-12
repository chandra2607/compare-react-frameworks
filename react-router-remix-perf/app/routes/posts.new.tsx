import { Form, redirect, useActionData } from "react-router";

export async function action({ request }) {
    await new Promise(res => setTimeout(res, 2000));
    const formData = await request.formData();
    const title = formData.get("title");

    if (!title) {
        return { error: "Title is required" };
    }

    // pretend we saved it
    return redirect("/posts");
}
export default function NewPost() {
    const data = useActionData<typeof action>();

    return (
        <Form method="post">
            <div>
                <input name="title" placeholder="Post title" />
            </div>

            {data?.error && (
                <p style={{ color: "red" }}>{data.error}</p>
            )}

            <button type="submit">Create</button>
        </Form>
    );
}

