import { Button } from "@/components/ui/Button";
import { Post, PostProps } from "./post"
import { Section } from "@/components/ui/Section";

interface Props {
    posts: PostProps[];
    canEditPosts?: boolean;
}

export const PostsList = ({ posts, canEditPosts = false }: Props) => {

    if (!Array.isArray(posts) || posts.length == 0) {
        return (
            <div className="flex flex-col gap-3 justify-center items-center w-full mt-32">
                <div className="text-gray-400 text-2xl">Здесь пока постов нет!</div>
                <Button routeKey="HOME" text="На главную" />
            </div>
        )
    }


    return (
        <div className="flex flex-col w-full gap-4 justify-center items-center md:w-2/3 lg:w-1/2">


            {
                posts.map((post: PostProps, index) => (
                    <Post key={index} {...post} canEdit={canEditPosts} />
                ))
            }

        </div>
    )
}