import { ChangeEvent, useEffect, useRef, useState } from "react";
import IcCamera from "@/assets/svgs/ic_camera.svg";
import { usePostPresignedURLQuery } from "@/hooks/api/image/usePostPresignedURLQuery";
import { usePutPresignedURLQuery } from "@/hooks/api/image/usePutPresignedURLQuery";
import Image from "next/image";

interface RegisterImageProps {
  onUploaded: (url: string) => void;
  initialUrl: string;
}

const RegisterImage = ({ onUploaded, initialUrl }: RegisterImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(initialUrl);

  const { mutateAsync: postPresignedURL } = usePostPresignedURLQuery();
  const { mutateAsync: putImage } = usePutPresignedURLQuery();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
    try {
      const { item } = await postPresignedURL({ name: file.name });
      await putImage({ presignedURL: item.url, file });
      const cleanUrl = item.url.split("?")[0];
      onUploaded(cleanUrl);
    } catch (err) {
      console.error(err);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  useEffect(() => {
    setPreviewUrl(initialUrl);
  }, [initialUrl]);

  return (
    <div
      onClick={handleClick}
      className="relative flex h-276 w-full cursor-pointer items-center justify-center rounded-6 border border-gray-30 bg-gray-10 hover:bg-gray-20 active:border-gray-50 tablet:w-480"
    >
      {previewUrl && <Image src={previewUrl} alt="image preview" className="rounded-6 object-cover" fill />}
      {!previewUrl && (
        <div className="flex flex-col items-center gap-10 text-gray-40">
          <IcCamera className="w-32" />
          <p className="text-16-bold">이미지 추가하기</p>
        </div>
      )}

      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleInputChange} className="hidden" />
    </div>
  );
};

export default RegisterImage;
