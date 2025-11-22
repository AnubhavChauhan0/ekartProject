import expressAsyncHandler from "express-async-handler";
import AddressModel from "../../models/address.model.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import CustomError from "../../utils/CustomError.utils.js";

export const addAddress = expressAsyncHandler(async (req, res, next) => {
  console.log("user address");
  const { addressLine, city, state, pinCode, phone, notes} = req.body;

  const userAddress = await AddressModel.create({
    addressLine,
    city, 
    state, 
    pinCode, 
    phone, 
    notes,
    userId: req.myUser._id
  });

 new ApiResponse(200,"Address Added successfully",userAddress).send(res);

});


export const getAddresses = expressAsyncHandler( async( req,res,next) => {
   let addresses = await AddressModel.find({})

   console.log(addresses);
   
   if(addresses.length === 0)next(new CustomError(400, "No addresses found!!!"));

   new ApiResponse(201,"Address fetched successfully", addresses).send(res)
});


export const getAddress= expressAsyncHandler( async( req,res,next) => {
    let userId = req.myUser._id;
   
   let address = await AddressModel.find({ userId });

   if(!address) next(CustomError);

   new ApiResponse(200,"Address fetched successfully", address).send(res)
});


export const updateAddress = expressAsyncHandler( async( req,res,next) => {
    let userId = req.myUser._id;

    let updatedAddress = await AddressModel.findOneAndUpdate({userId})

   new ApiResponse(200,"Address updated successfully", updatedAddress).send(res)
});


export const deleteAddress = expressAsyncHandler( async( req,res,next) => {
    let userId = req.myUser._id;

    let deleteAddress = await AddressModel.findOneAndDelete({userId})

   new ApiResponse(200,"Address deleted successfully", deleteAddress).send(res)
});
