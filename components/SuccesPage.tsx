import { resetCart } from '@/redux/nextSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

const SuccesPage = () => {
    const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
        <h1 className="text-2xl text-hoverBg font-semibold">
            Thanks you for Shopping in amazon-clone.com
        </h1>
        <Link href="/">
            <button
                onClick={() => dispatch(resetCart())}
                className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px]">
                    Continue Shopping
                </button>
        </Link>
    </div>
  )
}

export default SuccesPage