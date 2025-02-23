import { PageContainer } from "@/components/layout/PageContainer"
import { Button } from "@/components/ui/Button"
import { Loader } from "@/components/ui/Loader"
import { ReviewService } from "@/services/review.service"
import { onRequest } from "@/types"
import { ExternalLinkIcon, FileTextIcon } from "lucide-react"
import { useState, useEffect } from "react"

const NewspaperPage = () => {
    const [files, setFiles] = useState<{ title: string; filePath: string }[]>([])

    const getNewspapers = async () => {
        const data = await onRequest(ReviewService.getNewspapers())
        console.log(data)
        setFiles(data)
    }

    useEffect(() => {
        getNewspapers()
    }, [])

    const openFileInNewTab = (filePath: string) => {
        const url = `/api/review/newspapers/${filePath}`
        window.open(url, "_blank")
    }

    return (
        <PageContainer title="Медиацентр">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg ">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
                    Выберите файл для просмотра:
                </h2>
                <ul className="space-y-4 ">
                    {(!files || files.length == 0) && <Loader />}

                    {files.map((file) => (
                        <li key={file.filePath} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 gap-6">
                            <div className="flex items-center space-x-2">
                                <FileTextIcon className="text-gray-400" size={20} />
                                <span className="text-lg font-medium text-gray-300">{file.title}</span>
                            </div>

                            <Button text="Открыть" FC={() => openFileInNewTab(file.filePath)} icon={<ExternalLinkIcon />} />
                        </li>
                    ))}
                </ul>
            </div>
        </PageContainer>
    )
}

export default NewspaperPage

