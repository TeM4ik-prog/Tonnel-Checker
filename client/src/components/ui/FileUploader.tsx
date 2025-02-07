import { useEffect, useRef, useState } from 'react';
import { ImageUp } from 'lucide-react';
import { Button } from './Button';

interface Props {
    onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    buttonText: string;
    icon?: React.ReactNode;
    imageAccept?: boolean;
    videoAccept?: boolean;
    formSubmitted?: boolean;
}

export const FileUploader = ({
    onFileChange,
    buttonText,
    icon = <ImageUp />,
    imageAccept = true,
    videoAccept = true,
    formSubmitted = false
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };


    const acceptedTypes = [
        imageAccept && 'image/*',
        videoAccept && 'video/*',
    ]
        .filter(Boolean)
        .join(',')


    useEffect(() => {
        // if (formSubmitted) {
        setFile(null)
        setPreview(null)
        // }
    }, [formSubmitted]);

    return (

        <div className='z-10'>
            <label className="flex flex-col w-full cursor-pointer">
                <Button
                    widthMin={true}
                    text={buttonText}
                    FC={() => inputRef.current?.click()}
                    icon={icon}
                />
                <input
                    ref={inputRef}
                    type="file"
                    name="sourceFile"
                    accept={acceptedTypes}
                    onChange={handleFileChange}
                    className="hidden"
                    required
                />
            </label>

            {preview && (
                <div className="max-h-60 mt-4">

                    {file && (
                        <>
                            {file?.type.startsWith("image") ? (
                                <img src={preview} alt="Preview" className="max-h-60 rounded-lg" />
                            ) : (
                                <video src={preview} controls className="max-h-60 rounded-lg" />
                            )}
                        </>
                    )}
                </div>
            )}

        </div>
    );
};


