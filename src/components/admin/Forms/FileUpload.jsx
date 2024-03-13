/* eslint-disable react/prop-types */
import { Button, Image, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { axiosPublic } from "../../../hooks/useAxiosPublic";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

const FileUpload = ({ uploadedImages, setUploadedImages }) => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector(state => state.user.userinfo);

  const handleFileUpload = e => {
    const files = e.target.files;
    let images = [];

    if (files) {
      setLoading(true);

      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        uploadPromises.push(
          new Promise(resolve => {
            Resizer.imageFileResizer(
              file,
              720,
              720,
              "JPEG",
              100,
              0,

              uri => {
                axiosPublic
                  .post(
                    "/v1/uploadImage",
                    { image: uri },
                    {
                      headers: {
                        authtoken: token,
                      },
                      withCredentials: true,
                    }
                  )
                  .then(res => {
                    console.log("Image upload res", res);
                    if (res) {
                      images.push(res.data);
                      resolve();
                    }
                  })
                  .catch(err => {
                    console.log("cloudinary upload err", err);
                    resolve();
                  });
              },
              "base64"
            );
          })
        );
      }

      // Wait for all promises to resolve before updating state
      Promise.all(uploadPromises).then(() => {
        setLoading(false);
        setUploadedImages(prevImages => [...prevImages, ...images]);
      });
    }
  };

  const handleImageRemove = public_id => {
    setLoading(true);
    axiosPublic
      .post(
        "/v1/removeImage",
        { public_id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then(res => {
        if (res) {
          setLoading(false);
          console.log(res);
          // after delete response images
          const filteredImages = uploadedImages.filter(image => {
            console.log(res?.data.removed.public_id);
            return image.public_id !== res.data.removed.public_id;
          });
          console.log(filteredImages);
          setUploadedImages(filteredImages);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(uploadedImages);
  // console.log(savedImage);
  return (
    <div className='my-3'>
      <div className='flex items-center gap-x-10'>
        <WrapItem>
          <Button colorScheme='whatsapp' isLoading={loading}>
            <label htmlFor='image' className='cursor-pointer'>
              Upload Images
              <input
                type='file'
                id='image'
                hidden
                multiple
                accept='images/*'
                onChange={handleFileUpload}
              />
            </label>
          </Button>
        </WrapItem>

        {uploadedImages.length > 0 &&
          uploadedImages.map(image => (
            <div className='relative' key={image?.public_id}>
              <Image boxSize='140px' src={image?.url} alt='Product Image' />

              <CiCircleRemove
                size={38}
                className='absolute right-0 top-0 text-red-600 cursor-pointer'
                onClick={() => handleImageRemove(image?.public_id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
