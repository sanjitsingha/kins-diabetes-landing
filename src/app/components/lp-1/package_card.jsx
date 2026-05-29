import { CheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

const PackageCard = () => {


    return (
        <section className="py-24 bg-[#f4f8fb]">
            <div className="max-w-[1200px] flex gap-10 mx-auto px-7">

                <div className=" p-4 border-indigo-400 border-1 bg-white shadow-2xl  rounded-xl max-h-[500px] w-[350px]">

                    <div className="w-full relative">
                        <div className="text-xs bg-yellow-400 rounded-full px-4 py-1 w-fit absolute -top-5 right-0 transform -translate-y-1/2">Premium Package</div>
                        <h1 className="text-xl text-indigo-800  uppercase font-bold tracking-tighter">Executive Package</h1>
                        <hr className="border-indigo-400/20 my-4" />
                    </div>
                    <div className="mt-3">
                        <ul className="list-none text-sm flex flex-col gap-4 ">
                           <li className="flex items-center gap-2 text-black">
                            <CheckIcon className='size-4 text-indigo-700' />
                            Diabetes</li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Thyroid
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Liver
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Kidney
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Anemia
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Blood Grouping
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-indigo-700' />
                                Radiology
                            </li>
                            <li className="text-indigo-700 font-semibold">
                                +5 More Tests
                            </li>
                        </ul>
                       <div className="w-full flex items-center justify-center">
                         <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white mx-auto  font-bold py-3 cursor-pointer w-full rounded-full text-center">
                            Get Started
                        </button>
                       </div>
                    </div>

                </div>

                   <div className=" p-4 border-yellow-400 border-1 bg-white shadow-2xl  rounded-xl max-h-[500px] w-[350px]">

                    <div className="w-full relative">
                        <div className="text-xs bg-yellow-400 rounded-full px-4 py-1 w-fit absolute -top-5 right-0 transform -translate-y-1/2">Premium Package</div>
                        <h1 className="text-xl text-yellow-500  uppercase font-bold tracking-tighter">Comprehensive Profile</h1>
                        <hr className="border-yellow-400/20 my-4" />
                    </div>
                    <div className="mt-3">
                        <ul className="list-none text-sm flex flex-col gap-4 ">
                           <li className="flex items-center gap-2 text-black">
                            <CheckIcon className='size-4 text-yellow-500' />
                            Diabetes</li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Thyroid
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Liver
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Kidney
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Anemia
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Blood Grouping
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <CheckIcon className='size-4 text-yellow-500' />
                                Radiology
                            </li>
                            <li className="text-yellow-500 font-semibold">
                                +10 More Tests
                            </li>
                        </ul>
                       <div className="w-full flex items-center justify-center">
                         <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 border-none outline-none text-white mx-auto  font-bold py-3 cursor-pointer w-full rounded-full text-center">
                            Get Started
                        </button>
                       </div>
                    </div>

                </div>


            </div>
        </section>
    )
}

export default PackageCard