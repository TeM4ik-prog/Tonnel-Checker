import { Post, PostProps } from "./post"

interface Props {
    posts: PostProps[];
}

export const PostsList = ({ posts }: Props) => {

    return (
        <div className="flex flex-col w-full gap-3 justify-center items-center">
            {posts.map((post: PostProps, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    )
}