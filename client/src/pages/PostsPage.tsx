import { Post, PostProps } from "@/components/shared/post/post"
import { PostsList } from "@/components/shared/post/postList";

export const PostsPage = () => {

    const postsData: PostProps[] = []

    for (let i = 0; i < 10; i++) {
        postsData.push(
            {
                title: "Президент Беларуси Александр Лукашенко поздравил учащихся с Днем знаний",
                date: "1 сентября 2024",
                source: "Гимназия №1 г. Минск",
                link: "https://president.gov.by/ru/events/pozdravlenie-s-dnem-znanij",
                content: "Традиционно, открывая новый учебный год, мы все вместе делаем шаг в будущее. ... Желаю всем успехов в учебе и жизни!"
            }
        )
    }






    return (

        <>


            <PostsList posts={postsData} />



        </>

    )
}