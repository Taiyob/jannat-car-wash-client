import React, { useState } from "react";
import { useCreateServiceMutation } from "../redux/api/service/serviceApi";
import { toast } from "sonner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateService = () => {
  const [createService] = useCreateServiceMutation();
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = async (files: File[]) => {
    const uploadedImageUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.status === 200) {
          console.log(data);
          uploadedImageUrls.push(data.data.url);
        } else {
          console.error("Image upload failed:", data.error.message);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }

    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImageUrls = await handleImageUpload(newImages);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const duration = parseFloat(form.duration.value);

    form.reset();

    const serviceInformation = {
      name,
      description,
      price,
      duration,
      image: uploadedImageUrls,
    };

    try {
      const service = await createService(serviceInformation).unwrap();
      if (service?.statusCode === 200) {
        toast.success("Service created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong!!!");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files);
      setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  return (
    <div className="px-20 h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Create Service
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap justify-between mb-4 w-[600px]">
          <input
            type="text"
            name="name"
            placeholder="Name"
            //value={user?.user?.name}
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          />
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <textarea
            name="description"
            placeholder="Description"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="image"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <div className="mt-3">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-32 h-32 object-cover mr-2 mb-2 inline-block"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className=" mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateService;
