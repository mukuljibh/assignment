import axios from "axios";
export function sendImageAPI(ImageUrl: File) {
    const formData = new FormData();
    formData.append("file", ImageUrl);
    formData.append("upload_preset", "srpyzeky")

    //this cloudnary API route is used to send the profile picture to the cloudnary and in response we recieved a URL for that profile picture.
    return new Promise((resolve, reject) => {
        axios
            .post("https://api.cloudinary.com/v1_1/df8suxer2/image/upload", formData, {
                withCredentials: false,
            })
            .then((response) => {
                //getting URL of our profile picture
                resolve(response.data.secure_url);
            })
            .catch(() => {
                reject("Error uploading image");
            });
    });

}

export function sendAvatarToDB(image: { imageUrl: string | unknown }, email: string) {
    axios
        .patch("http://localhost:3000/api/profile/avatar", { image, email: email }, {
        })
        .then(() => {
            alert("avatar has been changed")

        })
        .catch(() => {
            alert("Error uploading image");
        });

}
