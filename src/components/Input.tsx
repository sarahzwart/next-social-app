"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { AiOutlineDelete } from "react-icons/ai";

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [uploadedImage, setUploadedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  if (!isSignedIn || !isLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    setPostLoading(true);
    const response = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text,
        profileImg: user.imageUrl,
        image: uploadedImage,
      }),
    });
    setPostLoading(false);
    setText('');
    setUploadedImage('');
    location.reload();
  }
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={user.imageUrl}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          placeholder="What's happening?"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {uploadedImage !== '' && (
          <div className="py-2">
            <div className="relative w-full max-w-72">
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="border border-gray-300 rounded-md shadow-md object-cover"
            />
            <button
              className=" absolute top-2 right-2  bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 focus:outline-none"
              onClick={() => setUploadedImage('')}
            >
              <AiOutlineDelete/>
            </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center space-x-2">
            <UploadButton
              endpoint="imageUploader"
              onUploadBegin={(file) => {
                console.log('File being loaded')
                setImageLoading(true);
              }}
              onClientUploadComplete={(res) => {
                if (res && res[0] && res[0].url) {
                  setImageLoading(false);
                  setUploadedImage(res[0].url);
                  alert("Upload Completed");
                } else {
                  alert("No image URL found in response");
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="ut-button:bg-violet-400 text-white ut-button:rounded-full ut-button:font-bold ut-button:shadow-md ut-button:hover:brightness-95 ut-button:disabled:opacity-50 ut-allowed-content:text-[0rem] ut-allowed-content:h-0 ut-allowed-content:w-0"
            />
          </div>
          <button
            disabled={postLoading || imageLoading || (uploadedImage.trim() ==='' && text.trim() === '')}
            className="bg-violet-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
