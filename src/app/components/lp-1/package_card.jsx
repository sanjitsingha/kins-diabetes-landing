import React from 'react'

const PackageCard = () => {


    return (
        <section className="py-24 bg-[#f4f8fb]">
            <div className="max-w-[1200px] mx-auto px-7">

                <div className=" p-4 border-indigo-400 border-3 bg-linear-to-b/hsl from-indigo-400 via-indigo-100 to-gray-50 rounded-xl h-[600px] w-[400px]">

                    <div className="w-full">
                        <h1 className="text-2xl text-indigo-800  uppercase font-bold tracking-tighter">Executive Package</h1>
                        <hr className="border-indigo-400 my-4" />
                    </div>
                    <div className="mt-3">
                        <ul className="list-disc list-inside text-indigo-800">
                            <li>Personalized diabetes management plan</li>
                            <li>Regular consultations with healthcare professionals</li>
                            <li>Medication adjustments based on individual needs</li>
                            <li>Lifestyle guidance and support</li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default PackageCard