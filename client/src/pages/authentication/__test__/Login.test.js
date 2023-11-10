import { render, screen, fireEvent } from '@testing-library/react';
import { describe } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../../contexts/UserContext';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import Login from '../authentication3/Login3';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { jest } from '@jest/globals';
const mock = new MockAdapter(axios);
// jest.mock('axios');

const  LoginMockRouter = () => {
    return (
        <BrowserRouter>
        <UserContextProvider>
            <Login />
        </UserContextProvider>
        </BrowserRouter>
    );
};

// const mockFunc = jest.fn();


// const mock = new MockAdapter(axios);
// jest.mock('axios');

// mock.onPost('http://localhost:8004/login/clinic').reply(200, {
//   data: 'Mocked data',
// });

// afterEach(() => {
//   mock.reset();
// });


describe('test the exist of the components',() => {
    it('test the exist of userName TextField', async () => {
    
        render(<LoginMockRouter />);
        const AuthLoginTextFieldUserName = await screen.findByTitle("AuthLoginTextFieldUserName");
        expect(AuthLoginTextFieldUserName).toBeInTheDocument();
        //     expect(authTitleElemen).toHaveTextContent(); //.toHaveTextContent('Hi, Welcome Back');
        
    })

    it('test the exist of password TextField', async () => {
    
        render(<LoginMockRouter />);
        const AuthLoginTextFieldPassword = await screen.findByTitle("AuthLoginTextFieldPassword");
        expect(AuthLoginTextFieldPassword).toBeInTheDocument();
        
    })

    it('test the exist of forget password Link', async () => {
    
        render(<LoginMockRouter />);
        const AuthLoginTypographyForgotPassword = await screen.findByTestId("AuthLoginTypographyForgotPassword");
        expect(AuthLoginTypographyForgotPassword).toBeInTheDocument();
        expect(AuthLoginTypographyForgotPassword).toHaveTextContent(/Forgot Password?/i);
        
    })

    it('test the exist of sign in button', async () => {
    
        render(<LoginMockRouter />);
        const AuthLoginButtonSignIn = await screen.findByTitle("AuthLoginButtonSignIn");
        expect(AuthLoginButtonSignIn).toBeInTheDocument();
        expect(AuthLoginButtonSignIn).toHaveTextContent(/Sign in/i);
        
    })
})

describe('test the functionallity of the components',() => {

    it('test the functionallity of userName TextField', async () => {
        const userName =  "Malek Mohamed Noureldean"// faker.internet.userName();
        render(<LoginMockRouter />);
        const userNameTextBox = screen.getByRole( "textbox", {name: "username"});
        fireEvent.change(userNameTextBox, { target: { value: userName } });
        expect(userNameTextBox).toHaveValue(userName);
        expect(userNameTextBox.value).toBe(userName) // the same
        
    })

    it('test the functionallity of password TextField', async () => {
        const password =  "!@#$M"// faker.internet.userName();
        render(<LoginMockRouter />);
        const passwordTextBox = screen.getByRole( "textbox", {type: "password"});
        fireEvent.change(passwordTextBox, { target: { value: password } });
        expect(passwordTextBox).toHaveValue(password);
        expect(passwordTextBox.value).toBe(password) // the same
        
    })

    it('test the functionallity of sign in Button', async () => {
        const axiosResponseLoginClinic = {
			data: {type: "testPath"}
		};
        axios.post.mockResolvedValue(axiosResponseLoginClinic);

        render(<LoginMockRouter />);
        const signInButton = screen.getByRole("button", {name:"Sign in"});
        fireEvent.click(signInButton);
        
        expect(history.location.pathname).toBe(`/${testPath}`);
        
    })

})







// // // find By => async








// // assertion






// // describe("", ()=>{
// //     // init all commons tests
// //     // interacts
// //     it('the function mock', ()=>{
// //         render(<Test setState={mockFunc} value=""/>);
// //         const textField = screen.getByLabelText("Text Field");
// //         const Buttonfie = screen.getByRole("button", {name:"butto"});


// //         fireEvent.click(Buttonfie);
// //         // expect(textField.value).toBe("new Element")
// //         // fireEvent.click(Buttonfie)
// //         expect(textField).toHaveValue("")
// //     })
// // })


// // integration test

// describe('we are here' , () => {
//     // beforeEach(()=>{

//     // });
//     // beforeAll(()=>{
        
//     // })

//     it('trying integ', () => {
//         render(<LoginMockRouter/>);
//         // const textField = screen.getByRole( "textbox", {name: "username"});

//         // const Buttonfie = screen.getByRole("button", {name:"butto"});
//         // fireEvent.change(textField, { target: { value: "new Element" } });
//         // expect(textField.value).toBe("new Element")
//         // fireEvent.click(Buttonfie)
//         expect(textField).toHaveValue("")
//     })
// })


// integration test

// describe('we are here' , () => {
//     beforeEach(()=>{

//     });
//     beforeAll(()=>{
        
//     })

//     it('trying integ', () => {
//         render(<LoginMockRouter/>);
//         const textField = screen.getByRole( "textbox", {name: "username"});

//         const Buttonfie = screen.getByRole("button", {name:"butto"});
//         fireEvent.change(textField, { target: { value: "new Element" } });
//         expect(textField.value).toBe("new Element")
//         fireEvent.click(Buttonfie)
//         await findByTitle("div-1")
//         const findText = screen.getByText(/new Element/i);
//         expect(textField).toBeInTheDocument();
//     });
// });
