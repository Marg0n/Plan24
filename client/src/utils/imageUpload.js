import axios from "axios"



// image uploading
export const imageUpload = async (image) => {

    const formData = new FormData();
    formData.append('image', image)
    // console.log(formData);

    // upload image and get image url
    const { data: pic } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
    )

    return  pic.data.display_url;
}