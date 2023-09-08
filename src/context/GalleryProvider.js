import axios from "axios";
import GalleryContext from "./GalleryContext";
import { useState, useEffect } from "react";

export const GalleryProvider = (props) => {
    const [ imageList, setImageList ] = useState([]);
    const baseUrl1 = process.env.REACT_APP_API_BASE_URL;
    const baseUrl =`${baseUrl1}/api/Image`;
    console.log(baseUrl);

useEffect(() => {
    async function getAllImages() {
      await  refreshImageList()
    }
    getAllImages()
  }, []);

  function refreshImageList() {
    return axios.get(baseUrl)
      .then(response => {
        setImageList(response.data)
        console.log(response.data)
      })
  }

    async function getAllImages() {
        const response = await axios.get(baseUrl);
        console.log(response.data)
        return setImageList(response.data);
    }

    async function createImage(barberId, imageUrl, title, description) {       
        const image = { barberId, imageUrl, title, description };
        const response = await axios.post(baseUrl, image);
        console.log('success');
        refreshImageList();
        return await new Promise((resolve) => resolve(response.data));
      }
    
    async function getImageByBarberId(barberId) {
        
        return axios.get(baseUrl + barberId).then(response => {
          console.log(response.data)
          return new Promise(resolve => resolve(response.data));
        })
    }

    async function deleteImage(barberImageLinkId) {
        const response = await axios.delete(baseUrl + barberImageLinkId);
        return await new Promise((resolve) => resolve(response.data));
      }

    return (
        <GalleryContext.Provider value={{
            imageList,
            getImageByBarberId,
            getAllImages,
            createImage,
            deleteImage,
        }}>
            { props.children }
        </GalleryContext.Provider>
    )
}