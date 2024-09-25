import { useEffect, useState } from "react"
import axios from "axios"
import Card from "./Card"
import { productProps } from "./config/homepage.config"
import { useNavigate } from "react-router-dom"
import { useUserDetails } from "../shared/UserDetailsProvider"

export default function Homepage() {
    const { user } = useUserDetails()
    const navigate = useNavigate()
    const [products, setProducts] = useState<productProps | null>(null)
    useEffect(() => {
        axios.get('http://localhost:3000/api/homepage')
            .then((res) => {
                setProducts(res.data.homepage)
            })
            .catch(() => {
                console.log("token expired")
                alert("Refresh token got expired redirect to login page")
                navigate('/')
            })
    }, [])

    return (
        <div >
            <div className="space-y-20 mb-10">
                <a href={products?.banner.link}>
                    <img className="mt-3" src={products?.banner.imageUrl} ></img>
                </a>
                <div className=" flex flex-col items-center">
                    <h1 className="text-xl  font-bold ">Hi {user.name} welcome back!

                    </h1>
                </div>

                <h1 className="text-3xl font-black ml-20">NEW ARRIVALS</h1>
                <div className="flex flex-wrap lg:gap-12 justify-center">
                    {products?.products.map((items, index) => {
                        return <Card key={index} name={items.name} imageUrl={items.imageUrl} price={items.price} />
                    })}
                </div>
            </div>

        </div>
    )
}