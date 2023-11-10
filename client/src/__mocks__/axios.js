
const axios = {
    create: jest.fn(() => axios), // Mock the create method to return the axios object itself
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    
  };
  

export default axios;