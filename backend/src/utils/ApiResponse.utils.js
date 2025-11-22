// class ApiResponse {
//     constructor(statusCode, message, data){
//         this.statusCode = statusCode;
//         this.message = message;
//         this.data = data;
//     }
//     send(res){
//         let responseObject = {
//             success : true,
//             message : this.message
//         }

//         if(this.data){
//             responseObject.data = this.data
//         }

//         res.status(this.statusCode).json(responseObject)
//     }
// }
// export default ApiResponse;

class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    send(res) {
        let responseObject = {
            success: true,
            message: this.message,
        };

        if (this.data) {
            responseObject.data = this.data;
        }

        res.status(this.statusCode).json(responseObject);
    }
}

export default ApiResponse;

//? new ApiResponse(201, "message", data).send()


//? new ApiResponse(201, "message", data).send()

//# evry non-static methos or variables can only be accessed by using object of that class