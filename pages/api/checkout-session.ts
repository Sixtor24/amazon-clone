// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface CheckoutItems{
    _id: number;
    title: string;
    description: string;
    category: string;
    brand: string;
    image: string;
    isNew: boolean;
    price: number;
    quantity: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {items, email } = req.body;

    const modifiedItems = items.map((item: CheckoutItems) => ({
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image],
            },
        },
    }));
    // Creating the session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collections: {
            allowed_countries: ["BD", "US", "OM", "CA", "GB"],
        },
        line_items: modifiedItems,
        mode: "payment",
        success_url:`${process.env.NEXTAUTH_URL}/success`,
        cancel_url:`${process.env.NEXTAUTH_URL}/checkout`,
        metadata: {
            email,
            Images: JSON.stringify(items.map((item: any) => item.image)),
        }
    })
    res.status(200).json({ id:session.id });
}
