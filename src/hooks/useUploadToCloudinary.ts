import { useCallback, useState } from "react";

type CloudinaryResultType = {
  public_id: string;
  secure_url: string;
};

export const useUploadToCloudinary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const uploadToCloudinary = useCallback(
    async (file: File): Promise<CloudinaryResultType> => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/images`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const resJson = await res.json();
        return resJson.data;
      } catch (error: any) {
        console.error("Error uploading photo", error.message);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { loading, uploadToCloudinary };
};
