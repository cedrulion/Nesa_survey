const express=require("express")
const {addUser,getUsers,loginUser,updateUser,checkPassword,updateUserPassword,getUserProfile, getUserById}=require("../controller/userController")
const checkAuthentication=require("../middlewares/checkAuthentication")

const router=express.Router();

router.post("/signup",addUser)
router.post("/login",loginUser)
router.put("/update",checkAuthentication,updateUser)
router.post("/checkpassword",checkAuthentication,checkPassword)
router.post("/updatepassword",checkAuthentication,updateUserPassword)
router.get('/profile', checkAuthentication, getUserProfile); 
router.get('/:id',  checkAuthentication, getUserById);



module.exports=router;