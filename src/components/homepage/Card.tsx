type cardProps = {
    name: string
    price: number
    imageUrl: string
}
export default function Card({ name, price, imageUrl }: cardProps) {
    return (
        <div className=" w-60 space-y-4">
            <div>
                <img className="h-60" src={imageUrl}></img>
            </div>
            <div className="space-y-2">
                <h1 className="tracking-widest">{name}</h1>
                <h1 className="font-bold">{`₹${price}`}</h1>
                <button className="w-60 h-11 border bg-black text-white font-bold ">ADD TO BAG</button>
            </div>
        </div>
    )
}