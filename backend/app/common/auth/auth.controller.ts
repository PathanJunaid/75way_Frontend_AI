
import asyncHandler from "express-async-handler";
import { NextFunction, type Request, type Response } from 'express'
import { createUserTokens } from "../services/passport-jwt.service";
import { createResponse } from "../helper/response.hepler";

export const loginUser = asyncHandler(async(req :Request,res:Response)=>{
    // If authentication is successful, create JWT tokens
    // Create access and refresh tokens
    if(req.user){
      const user = {
        _id: req.user._id.toString(), // Convert ObjectId to string
        name: req.user.name,
        email: req.user.email,
        active: req.user.active,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      };
      const { accessToken, refreshToken } = createUserTokens(user);
      console.log(user);
        // Store tokens in HTTP-only cookies
        res.cookie("access_token", accessToken, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: "strict", 
          maxAge: 3600000, 
        });
      
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: 'strict', 
          maxAge: 604800000, 
        });
        res.send(createResponse({accessToken: accessToken, refreshToken: refreshToken, user: user}, "User login sucssefully"))
    }else{
        res.json({ message: "Logged in failed", user: {  } });
    }
  
  
  
});
export const logoutUser= asyncHandler(async(req:Request,res:Response)=>{
  res.clearCookie('access_token', {
    httpOnly: true,  // Ensures cookie cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production',  // Secure flag if in production
    sameSite: 'strict', // Ensures the cookie is sent with requests from the same site
  });

  // Optionally, you can clear refresh tokens if stored in cookies as well
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.send(createResponse({}, "User logged out sucssefully"))
});
export const authverify= asyncHandler(async (req:Request, res: Response, next: NextFunction)=>{
  const token = req.cookies['access_token'];
  // const user = await chatServices.getAdmin(token);
  // if(!user){
  //   res.send({
  //     data:[],
  //     msg: "please login",
  //     success : false
  //   })
  //   return;
  // }else{
  //   next();
  // }
})
