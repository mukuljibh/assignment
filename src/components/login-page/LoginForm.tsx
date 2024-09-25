import { useState, useEffect } from "react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../shared/UserDetailsProvider";


interface FormValues {
    email: string;
    password: string;
}

interface InputBox {
    id: keyof FormValues;
    title: string;
}

export default function LoginForm() {
    const { setUser } = useUserDetails()
    const [inputBox] = useState<InputBox[]>([{ id: "email", title: "Email" },
    { id: "password", title: "Password" }])
    const navigate = useNavigate();
    const [transitionClass, setTransitionClass] = useState("opacity-30")
    useEffect(() => {
        setTimeout(() => {
            setTransitionClass("opacity-100 transition-opacity duration-500")
        }, 50)
    }, [])
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            axios.post('http://localhost:3000/api/login', values)
                .then((res) => {
                    alert("login success")
                    navigate("/homepage");
                    setUser(res.data.details)
                })
                .catch(() => {
                    alert("please check your entries")
                })
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className={transitionClass}>
            <div className="space-y-5">
                {inputBox.map((input) => {
                    return (
                        <div key={input.id}>
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

            </div>
            <div className="space-y-5">
                <h1 className="text-xs underline underline-offset-8 cursor-pointer">Forgot Password?</h1>
                <button type="submit" className="border h-11 w-80 text-white bg-black cursor-pointer">SIGN IN</button>

            </div>
        </form>

    )
}