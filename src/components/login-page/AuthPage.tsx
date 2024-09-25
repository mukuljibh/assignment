import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm"
import { Link, Route, Routes } from "react-router-dom";

export default function AuthPage() {
    return (
        <div className="flex justify-center mt-20 mb-20 ">
            <div className="space-y-12 ">
                <h1 className="lg:text-3xl text-xl text-center font-bold">SIGN IN </h1>

                <div className="flex lg:gap-72 gap-32 justify-center font-medium border-b-2 pl-16 pr-16 pb-5">
                    <Link to="/">ALREADY REGISTERED?</Link>
                    <Link to="/register">NEW TO HOKMAKEUP?</Link>
                </div>
                <div className="flex justify-center">

                    <div className="space-y-8 ">
                        <Routes>
                            <Route path="/" element={<LoginForm />} />
                            <Route path="/register" element={<SignUpForm />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div >

    )
}