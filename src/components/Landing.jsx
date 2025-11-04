import React from 'react'


export default function Landing(){
return (
<div className="relative w-full h-[calc(100vh-64px)] flex flex-col 
justify-center items-center text-center text-white">
<video autoPlay loop muted playsInline className="video-bg">
<source src="/video.mp4" type="video/mp4" />
</video>
<div className="z-10">
<h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">Welcome to the 
Bachelor Party</h1>
<p className="text-xl italic drop-shadow-md">Let the games begin...</p>
</div>
</div>
)
}
