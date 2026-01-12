import { Link, useLoaderData } from "react-router";

type Post = {
    id: number;
    title: string;
};

export async function loader() {
    // fake data for now
    const posts: Post[] = [
        { id: 1, title: "Hello Remix" },
        { id: 2, title: "Why Server First Matters" },
    ];

    return { posts };
}

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>Posts</h1>

            <ul>
                {posts.map(p => (
                    <li key={p.id}>
                        <Link to={`/posts/${p.id}`}>{p.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
