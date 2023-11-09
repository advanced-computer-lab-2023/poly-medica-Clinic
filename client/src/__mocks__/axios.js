// const mockResponse = {
//     data: {
//         results: [
//             {
//                 name: {
//                     first: "Laith",
//                     last: "Harb"
//                 },
//                 picture: {
//                     large: "https://randomuser.me/api/portraits/men/59.jpg"
//                 },
//                 login: {
//                     username: "ThePhonyGOAT"
//                 }
//             }
//         ]
//     }
// }


// export default {
//     get: jest.fn().mockResolvedValue(mockResponse)
// }

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://api.example.com',
// });
const axios = {
    create: jest.fn(() => axios), // Mock the create method to return the axios object itself
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    // Add other methods you use as needed
  };
  

export default axios;