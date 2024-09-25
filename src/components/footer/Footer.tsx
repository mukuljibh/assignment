
export default function Footer() {
    return (
        <div>
            <div className="space-y-4 pt-5 pb-10 bg-zinc-100" >
                <h1 className="text-2xl text-center tracking-wide">TRUSTED BY OUR FAM!!!</h1>
                <div className="flex justify-center lg:gap-20 gap-8 ">
                    <div className="inline-flex flex-col space-y-1 ">
                        <p className="self-center text-3xl font-bold ">2012</p>
                        <p className=" self-center text-xs tracking-widest">Founded</p>
                    </div>
                    <div className="inline-flex flex-col space-y-1">
                        <p className="self-center text-3xl font-bold">2K+</p>
                        <p className="self-center text-xs tracking-widest">Products</p>
                    </div>
                    <div className="inline-flex flex-col space-y-1">
                        <p className="self-center text-3xl font-bold">25+</p>
                        <p className="self-center text-xs tracking-widest">Brands</p>
                    </div>
                    <div className="inline-flex flex-col space-y-1 ">
                        <p className="self-center text-3xl font-bold">1M+</p>
                        <p className="self-center text-xs tracking-widest">Order Delivered</p>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} className="lg:flex lg:space-y-0 px-4 justify-center space-y-10 gap-32 tracking-wide bg-pink-200">
                <div className="space-y-1">
                    <p className="text-xl font-bold">Quick Links</p>
                    <p>About Us</p>
                    <p>Contact Us</p>
                    <p>Terms & Conditions</p>
                    <p>Return Policy</p>
                    <p>Privacy Policy</p>
                    <p>Shipping Policy</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xl font-bold ">Categories</p>
                    <p>Eyes</p>
                    <p>Face</p>
                    <p>Brushes</p>
                    <p>Kits</p>
                    <p>Lips</p>
                    <p>Nails Policy</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xl font-bold">Help Desk</p>
                    <p>Call: +91 9810245261</p>
                    <p>Email: support@hokmakeup.com</p>
                    <p>Monday-Saturday 10AM to 7PM</p>
                    <p>Follow us on</p>
                </div>
            </div>
            <h1 className="pt-10 text-center">© 2024 Hok Beauty PVT LTD. All Rights Reserved.</h1>

        </div>

    )
}