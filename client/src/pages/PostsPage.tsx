import { PageContainer } from "@/components/layout/PageContainer";
import { PostsList } from "@/components/shared/post/postList";
import { Loader } from "@/components/ui/Loader";
import { Section } from "@/components/ui/Section";
import { CategoryService } from "@/services/category.service";
import { PostService } from "@/services/post.service";
import { useUserData } from "@/store/hooks";
import { onRequest, UserRole } from "@/types";
import { RoutesConfig } from "@/types/pagesConfig";
import { findCategoryByPath } from "@/utils";
import { handleError } from "@/utils/handleError";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { user } = useUserData()

    const [canEdit, setCanEdit] = useState<boolean>(false)



    const { category } = useParams<{ category: string }>();
    const route = findCategoryByPath(category)


    const getPosts = async () => {
        setIsLoading(true)

        const data = await onRequest(PostService.getPosts(category!))
        console.log(data)
        if (data) {
            setIsLoading(false)
            setPosts(data)
        }
    }

    useEffect(() => {
        getPosts()
        if (!route) {
            toast.error("Invalid category path");
            navigate(RoutesConfig.HOME.path);
        }
    }, [route, navigate]);


    useEffect(() => {
        if (user?.role && user.role === UserRole.Admin) {
            setCanEdit(true)
            console.log("admin")
        }
    }, [user])







    return (
        <Section className="!justify-start" hightCheck={!Array.isArray(posts) || posts.length == 0}>
            <PageContainer title={route?.label}>
                {isLoading && <Loader />}
                {!isLoading && <PostsList posts={posts} canEditPosts={canEdit} />}
            </PageContainer>

        </Section>


    )
}

export default PostsPage