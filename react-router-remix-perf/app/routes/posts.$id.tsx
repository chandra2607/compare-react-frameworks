import { useLoaderData } from "react-router";

export async function loader({ params }) {
    console.log("Post Detaill Page")
    const postId = params.id;

    // fake fetch
    const post = {
        id: postId,
        title: `Post #${postId}`,
        body: "This came from the loader",
    };

    return { post };
}

export default function PostDetail() {
    const { post } = useLoaderData<typeof loader>();

    return (
        <>
            <h1>Hello Getting Rendered</h1>
            <article>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </article>
        </>
    );
}
