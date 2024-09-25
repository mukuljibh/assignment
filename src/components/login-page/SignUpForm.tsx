import { useState, useEffect } from "react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import { sendImageAPI } from "../../api-service/apiServices"
import { inputBoxProps } from "./config/login.config"


export default function SignUpForm() {
    const [inputBox] = useState<inputBoxProps[]>([
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "password", title: "Password" }])

    const [transitionClass, setTransitionClass] = useState("opacity-30")

    useEffect(() => {
        setTimeout(() => {
            setTransitionClass("opacity-100 transition-opacity duration-500")
        }, 50)
    }, [])

    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        //sending profile picture to cloudnary in response this API provide a URL of profile picture
        // for type script
        if (file) {
            sendImageAPI(file)
                .then((url) => {
                    formik.setFieldValue("imageUrl", url);
                })
                .catch((error) => {
                    console.log("error from profile creation page", error);
                    alert("cloudinary rejects the request")
                });
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            imageUrl: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            imageUrl: Yup.string()
        }),
        onSubmit: async (values) => {
            axios.post('http://localhost:3000/api/register', values)
                .then(() => {
                    alert("registered success proceed to login")
                })
                .catch(() => {
                    alert("You are already registered please login")
                })
        }
    })
    return (

        <form onSubmit={formik.handleSubmit} className={` ${transitionClass}`}>

            <div className="space-y-2">
                <div>
                    <h1>Upload your photo</h1>
                    <input
                        className="border border-black-100 "
                        onChange={handleUpload}
                        type="file"
                        accept="image/*"
                        style={{ color: "black" }}
                    />
                </div>

                {inputBox.map((input) => {
                    return (
                        <div key={input.id} className="space-y-1">
                            <h1>{input.title}</h1>
                            <input
                                className="border h-11 w-80 outline-none pl-4 "
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
                <div className="space-y-5">
                    <h1 className="text-xs underline underline-offset-8 cursor-pointer">Forgot Password?</h1>
                    <button type="submit" className="border h-11 w-80 text-white bg-black cursor-pointer">SIGN IN</button>
                </div>

            </div>
        </form>

    )
}