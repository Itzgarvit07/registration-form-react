import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import StyledButton from '../components/StyledButton'
import { useForm } from 'react-hook-form';
import ForwardedTextInput from '../components/StyledTextfield';
import { right } from '@popperjs/core';

function Newpassword() {
    const methods = useForm();
    const { handleSubmit, register, formState } =
    methods;
  const errors = formState?.errors;
    const handleLogin = handleSubmit((data)=>{
        console.log(data)
    })
  return (
    <Box sx={{height:"100vh", display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Box sx={{display:"flex",border:"solid 2px black",borderRadius:"20px"}}>
        <Box sx={{height:"570px",width:"400px",marginRight:"20px",}}>
        <img className='w-full h-full object-cover rounded-l-2xl' src="./login-pageimg.jpg" alt="" />
        </Box>
   <Box className="p-7">
    <Typography variant='h4' className='text-center font-bold '>
Reset Password
    </Typography>
    <form onSubmit={handleSubmit(handleLogin)} noValidate>
    <Box className="p-9 flex flex-col justify-center items-center gap-3">

    <ForwardedTextInput
                label="Old Password"
                type="password"
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                placeholder="Old password"
                isRequired
                {...register("email", {
                  required: "email is Required",
                })}
              /> 
               <ForwardedTextInput
                label="New Password"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                placeholder="new password"
                isRequired
                {...register("password", {
                  required: "password is Required",
                })}
              /> 
               <ForwardedTextInput
                label="Confirm New Password"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                placeholder="confirm new password"
                isRequired
                {...register("password", {
                  required: "password is Required",
                })}
              />
              {/* <Typography color={"blue"} >Forgot password</Typography> */}
              <StyledButton sx={{marginTop:"15px"}} type={"submit"} label={"reset password"} width={"100%"} />
    </Box>

    </form>
   </Box>
   </Box>
   </Box>
  )
}

export default Newpassword