import React from 'react'
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="mt-10 lg:px-16 p-3 mx-auto w-full max-w-7xl">

            <div className="flex flex-col gap-8 mx-auto items-center justify-center lg:flex lg:flex-row shadow-lg pb-4">
                <div className="w-full">
                    <img
                        src="https://res.cloudinary.com/salmanbd/image/upload/pmezbbo6ua4gwgfw9o4k.jpg"
                        alt="image" style={{ width: '100%' }} 
                    />
                </div>
                <div className="w-full">
                    <h2 className="text-2xl text-red-900 font-bold md:text-4xl">
                        About us
                    </h2>
                    <p className="m-auto mt-6 text-1xl text-gray-600 text-justify">
                    It is a general expectation that Bangladesh should make requisite advancement to face the New Millennium Challenges. The emergence of the New Millennium Challenges has to be ensured. The prevailing parent-child apartness and generation gap have to be replaced by mutul understanding. In this contemporary socio- economic context of ours, the question of assimilating the friendly features of the western advancement is of paramount importance. Our today's budding talents have to be nourished properly, so that they become the asset of not only the parents, but the society also. Classic School & College is a seat, where National curriculum and the eternal ideology are harmonised, where modern education and Islami values blend together. Classic School & College promises to uphold harmonious nursing of today's young generation.
                    </p> <br />
                    <p>Our EIIN No: 134656.</p>
                </div>
            </div>
        </div>
    );
}