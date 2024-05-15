import Image from 'next/image'
import React from 'react'

const ModalContent = ({content}) => {
    console.log(content, "jjjhhjjhjhjhjh");
  return (
    <div className='w-full text-black'>
        <div className='w-[90%] mx-auto'>
            {/* <h1>Title :</h1>
            <h1>Assignment 1</h1>
            <h1>Desc:</h1>
            <p>hhbb ggbba agg  bgg  </p>
            <h1>File: </h1>
            <p>here is the file</p> */}
            <div className='flex gap-3'>
                <label htmlFor="">Title:</label>
            <h1>{content.title || "Title"}</h1>
            </div>
            <div className='flex gap-3'>
                <label htmlFor="">Description:</label>
            <h1>{content.desc || "desc"}</h1>
            </div>
            <div className='flex gap-3'>
                <label htmlFor="">File:</label>
            <image width={100} height={100} src={content.imageUrl}/>
            </div>
            
        </div>
    </div>
  )
}

export default ModalContent