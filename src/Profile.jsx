import React, { useState } from 'react'
import {User} from './Data'

function Profile() {
 const [data , setData] = useState(Object.keys(User))
 const [image, setImage] = useState(null)
 const [fileName, setFileName] = useState('No selected file')
 console.log(data)
 console.log(data.slice(0,6))
 console.log(data.slice(6,12))
 console.log(data.splice(5,12)) 
  return (
<>
<div className='mt-5'>
   <div className='flex justify-evenly items-center'>
    <p>Aadhaar Card</p>
    <form action="" className='border-2 border-black border-solid rounded' onClick={() =>document.querySelector('.input-field').click()}>
      <button className='bg-white  py-1 pl-2 text-left w-[350px] pr-[30px]'>Aadhar Card Front</button>
      <input type="file" accept='image/*' hidden className='input-field' onChange={({target:{files}}) =>{
files[0] && setFileName(files[0].name)
if(files){
  setImage(URL.createObjectURL(files[0]))
}
      }} />
      <button className='bg-gray-300  py-1 px-2'>Browse</button>

      {image ?
    <img src={image} width={70} height={60} alt={fileName} /> : ""  
    }
    </form>
    <form className='border-2 border-black border-solid rounded' action=""  onClick={() =>document.querySelector('.input-field').click()}>
    <button className='bg-white  py-1 pl-2 text-left w-[350px] pr-[30px]'>Aadhar Card Back</button>
    <input type="file" accept='image/*' hidden className='input-field'/>
    <button className='bg-gray-300 py-1 px-2'>Browse</button>
    </form>
   </div>
   </div>
</>
  )
}

export default Profile