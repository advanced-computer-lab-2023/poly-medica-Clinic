import { jest } from '@jest/globals';
const axios = {
    create: jest.fn(() => axios),
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      response: {
        use: jest.fn(() => {
          return {
            eject: jest.fn(),
          };
        }),
      },
    },
  };
  

export default axios;