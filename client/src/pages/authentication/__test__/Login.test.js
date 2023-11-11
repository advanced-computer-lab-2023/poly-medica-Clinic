// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { describe, jest } from '@jest/globals';
// import { BrowserRouter } from 'react-router-dom';
// import { UserContextProvider } from '../../../contexts/UserContext';
// import React from 'react';
// import Login from '../authentication3/Login3';
// import axios from 'axios';


// jest.mock('axios');

// const  LoginMockRouter = () => {
//     return (
//         <BrowserRouter>
//         <UserContextProvider>
//             <Login />
//         </UserContextProvider>
//         </BrowserRouter>
//     );
// };



// describe('test the exist of the components',() => {
//     it('test the exist of userName TextField', async () => {
    
//         render(<LoginMockRouter />);
//         const AuthLoginTextFieldUserName = await screen.findByTitle('AuthLoginTextFieldUserName');
//         expect(AuthLoginTextFieldUserName).toBeInTheDocument();
        
//     });

//     it('test the exist of password TextField', async () => {
    
//         render(<LoginMockRouter />);
//         const AuthLoginTextFieldPassword = await screen.findByTitle('AuthLoginTextFieldPassword');
//         expect(AuthLoginTextFieldPassword).toBeInTheDocument();
        
//     });

//     it('test the exist of forget password Link', async () => {
    
//         render(<LoginMockRouter />);
//         const AuthLoginTypographyForgotPassword = await screen.findByTestId('AuthLoginTypographyForgotPassword');
//         expect(AuthLoginTypographyForgotPassword).toBeInTheDocument();
//         expect(AuthLoginTypographyForgotPassword).toHaveTextContent(/Forgot Password?/i);
        
//     });

//     it('test the exist of sign in button', async () => {
    
//         render(<LoginMockRouter />);
//         const AuthLoginButtonSignIn = await screen.findByTitle('AuthLoginButtonSignIn');
//         expect(AuthLoginButtonSignIn).toBeInTheDocument();
//         expect(AuthLoginButtonSignIn).toHaveTextContent(/Sign in/i);
        
//     });
// });

// describe('test the functionallity of the components',() => {

//     it('test the functionallity of userName TextField', async () => {
//         const userName =  'Malek Mohamed Noureldean';// faker.internet.userName();
//         render(<LoginMockRouter />);
//         const userNameTextBox = screen.getByRole( 'textbox', { name: 'username' });
//         fireEvent.change(userNameTextBox, { target: { value: userName } });
//         expect(userNameTextBox).toHaveValue(userName);
//         expect(userNameTextBox.value).toBe(userName); // the same
        
//     });

//     it('test the functionallity of password TextField', async () => {
//         const password =  '!@#$M';// faker.internet.userName();
//         render(<LoginMockRouter />);
//         const passwordTextBox = screen.getByRole( 'textbox', { type: 'password' });
//         fireEvent.change(passwordTextBox, { target: { value: password } });
//         expect(passwordTextBox).toHaveValue(password);
//         expect(passwordTextBox.value).toBe(password); // the same
        
//     });

//     it('test the functionallity of sign in Button', async () => {
//         const testPath = 'testPath';
//         const axiosResponseLoginClinic = {
//             status: 200,
// 			data: { type: testPath }
// 		};
//         axios.post.mockResolvedValue(axiosResponseLoginClinic);

//         render(<LoginMockRouter />);
//         const signInButton = screen.getByRole('button', { name:'Sign in' });
//         fireEvent.click(signInButton);

//         await waitFor(() => {
//             expect(window.location.pathname).toBe(`/${testPath}`);
//         });
        
        
//     });

// });














