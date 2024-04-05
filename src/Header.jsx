import { Box } from '@mui/material'
import React from 'react'

function Header() {
  return (
    
<header>    
<Box className="px-8" sx={{background:"linear-gradient(45deg,rgba(242,113,68,1) 63%, rgba(38,145,191,1) 63% )",width:"100%",height:"20px"}}>
<Box className="px-8">
    <Box className="px-9 text-sm text-white " sx={{display:"flex", justifyContent:"right", alignItems:"center"}}>
<p className='mb-0 pr-5'>
<i className="fa-solid fa-phone"></i>
+91-8824453320
</p>
<p className='mb-0 pr-6'>
<i className="fa-solid fa-phone"></i>
+91-9024881021
</p>
</Box>
</Box>
</Box>

<nav className='py-2 '>
<Box sx={{display:"flex",justifyContent:"space-around", alignItems:"center"}}> 
<Box sx={{height:"90px",width:"90px"}}>
    <a href="#">
        <img className='h-full w-full' src="./login-page-logo-1.png" alt="" />
    </a>
</Box>
<Box>
    <ul className='flex text-[#f47144] text-xl font-light'>
        <li className='mx-5'><a className='hover:text-[#f47144]' href="#">Home</a></li>
        <li className='mx-5'><a className='hover:text-[#f47144]' href="#">Courses</a></li>
        <li className='mx-5'><a className='hover:text-[#f47144]' href="#">About</a></li>
        <li className='mx-5'><a className='hover:text-[#f47144]' href="#">Blog</a></li>
        <li className='mx-5'><a className='hover:text-[#f47144]' href="#">Contact Us</a></li>
    </ul>
</Box>
<Box>
    <button className='bg-[#f47144] py-1.5 px-3 text-white rounded-md hover:bg-[#2691bf] transition'><a className='font-bold text-white hover:text-white' href="#">Login/Register</a></button>
</Box>


</Box>




</nav>

</header>

    )
}

export default Header