import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../shared/UserDetailsProvider";
function Navbar() {
    const { user, setUser } = useUserDetails()
    const navigate = useNavigate()
    function handle() {
        axios.post('http://localhost:3000/logout')
            .then(() => {
                alert("logout succes ! refresh token now destroyed")
                setUser({ name: '', imageUrl: '', email: "" })
                navigate('/')
            })
            .catch(() => {
                console.log("unable to logout")
            })
    }

    return (
        <div className="sticky top-0 py-5 bg-white shadow-md">
            <nav className="flex justify-between items-center ">
                <img className="lg:-12 lg:pl-12 h-8" src="https://cdn.shopify.com/s/files/1/1743/7443/files/HOK_LOGO.jpg?v=1674287142"></img>
                <ul className="lg:flex gap-10 items-center text-sm font-medium hidden">
                    <li className="cursor-pointer">NEW ARRIVALS</li>
                    <li className="cursor-pointer">BRANDS</li>
                    <li className="cursor-pointer">MAKEUP</li>
                    <li className="cursor-pointer">SKIN</li>
                    <li className="cursor-pointer">HAIR</li>
                    <li className="cursor-pointer">FRAGRANCE</li>
                    <li className="cursor-pointer">COMBOS</li>
                </ul>
                <img className="lg:w-20 w-10 rounded-full" src={user.imageUrl} />
                <div className="flex gap-6 items-center">
                    <button onClick={() => navigate("/edit-profile")}>
                        <img className="h-6" src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png" />
                    </button>

                    <img className="h-6" src="https://res.cloudinary.com/df8suxer2/image/upload/v1721312689/y1nnjngixvluhmxefmga.png" />
                    <img className="h-6" src="https://cdn1.iconfinder.com/data/icons/e-commerce-320/512/bag-512.png" />
                    {user.name ? <button className="hover:bg-black p-2 rounded-lg border-2 border-black hover:text-white" onClick={handle}>logout</button> : <button>login</button>}
                </div>
            </nav>
        </div >
    )
}
export default Navbar