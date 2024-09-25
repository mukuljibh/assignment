/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck at
import { useState, useEffect } from "react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import { sendImageAPI, sendAvatarToDB } from "../../api-service/apiServices"
import { inputBoxProps } from "./config/config"
import { useUserDetails } from "../shared/UserDetailsProvider"
import Avatar from "./Avatar"
import { useNavigate } from "react-router-dom"
export default function EditProfilePage() {
    const { setUser, user } = useUserDetails()
    const [inputBox] = useState<inputBoxProps[]>([
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
    ])

    const [transitionClass, setTransitionClass] = useState("opacity-30")
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setTransitionClass("opacity-100 transition-opacity duration-500")
        }, 50)
    }, [])

    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        //sending profile picture to cloudinary in response this API provide a URL of profile picture

        if (file) {
            sendImageAPI(file)
                .then((url) => {
                    const image = { imageUrl: url }
                    setUser((prev) => {
                        return { ...prev, ...image }
                    })
                    sendAvatarToDB(image, user.email)
                })
                .catch((error) => {
                    console.log("error from profile creation page", error);
                    alert("cloudinary rejects the request")
                });
        }
    }
    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
        },
        //we can do any validation as we want using yup and formil easily
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {

            axios.put('http://localhost:3000/api/profile/avatar', { ...values, oldEmail: user.email })
                .then(() => {
                    alert("profile updated")
                    setUser((prev) => {
                        return { ...prev, ...values }
                    })

                })
                .catch(() => {
                    alert("could not able to update the profile")
                })
        }
    })
    if (!user.email) {
        return <h1> not allowed go back to the login</h1>
    }
    return (
        <div className="my-10 space-y-5">
            <button
                className="text-xl p-2 border-2 border-black hover:bg-black hover:text-white"
                onClick={() => navigate('/homepage')}
            >Go back
            </button>
            <h1 className="text-3xl text-center">Hi {user.name}</h1>
            <form onSubmit={formik.handleSubmit} className={` ${transitionClass} flex justify-center `}>
                <div className=" space-y-2 ">

                    <Avatar user={user} handleUpload={handleUpload} />
                    <h1 className="text-xs font-medium text-red-700">Please note after completing the upload  it make <br />a patch request to the server autmatically </h1>
                    {inputBox.map((input) => {
                        return (
                            <div key={input.id} className="space-y-1">
                                <h1>{input.title}</h1>
                                <input
                                    className="border h-11 w-80 outline-none pl-4"
                                    id={input.id}
                                    name={input.id}
                                    autoComplete="on"
                                    type="text"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values[input.id]}
                                >
                                </input>
                            </div>
                        )
                    })}
                    <h1 className="text-xs font-medium text-red-700">By pressing change button it make a put request this time <br />to the server automatically </h1>


                    <div className="space-y-5">
                        <button type="submit" className="border h-11 w-80 text-white bg-black cursor-pointer">Change</button>
                    </div>

                </div >
            </form >
        </div >
    )
}