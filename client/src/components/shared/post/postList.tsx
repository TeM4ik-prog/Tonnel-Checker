import { Post, PostProps } from "./post"

interface Props {
    posts: PostProps[];
}

export const PostsList = ({ posts }: Props) => {

    if (!Array.isArray(posts)) {
        return <div>Ошибка: данные не являются массивом.</div>;
    }
    return (
        <div className="flex flex-col w-full gap-3 justify-center items-center">
            {posts.map((post: PostProps, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    )
}