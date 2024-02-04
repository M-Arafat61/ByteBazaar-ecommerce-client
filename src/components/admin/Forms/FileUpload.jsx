/* eslint-disable react/prop-types */
import { Button, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { axiosPublic } from "../../../hooks/useAxiosPublic";
import Resizer from "react-image-file-resizer";
import { useState } from "react";

const FileUpload = ({ setUploadedImages }) => {
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
        setUploadedImages(images);
        console.log(images);
      });
    }
  };
  return (
    <div className='my-3'>
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
    </div>
  );
};

export default FileUpload;
