type Products = {
    name: string
    price: number
    imageUrl: string
}

type Banner = {
    link: string,
    imageUrl: string
}

export type productProps = {
    banner: Banner
    products: Products[]
}