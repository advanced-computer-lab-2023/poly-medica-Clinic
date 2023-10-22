import { render, screen, fireEvent, findByTitle } from "@testing-library/react";
// import AuthLogin from '../auth-forms/AuthLogin';
import '@testing-library/jest-dom/jest-globals';
import { BrowserRouter } from "react-router-dom";
// import { expect } from '@testing-library/jest-dom';
// import Test from './test';
import Login from "../authentication3/Login3";

const  LoginMockRouter = () =>{
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

const mockFunc = jest.fn();






// it('test the login', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const authTitleElemen = screen.findByTitle("first-text-field");
//     const authTitleEleme = screen.getByTitle("first-text-field");
//     const authTitleElem = screen.queryByTitle("first-text-field");

//     // findAll get an array that much the confition
    
//     // 3-interact
    

//     //4-assert
//      expect(authTitleElement).toBeInTheDocument();
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the role', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the elementtextbox
//     const testBox = screen.getByRole("", {name:"username"}); // get the text box element which have the label username
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(testBox).toBeInTheDocument();
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the role', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const testBox = screen.getByTestId("testing-Button"); // get the text box element which have the label username
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(testBox).toBeInTheDocument();
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the role', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const testBox = screen.getByTestId("testing-Button"); // get the text box element which have the label username
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//     //  expect(testBox).toBeInTheDocument();
//     expect(testBox).toHaveTextContent('Sign');
// })


// // find By => async

// it('test the role', async () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const testBox = await screen.findByTestId("testing-Button"); // get the text box element which have the label username
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(testBox).toBeInTheDocument();
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })


// it('test the role', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const testBox = screen.queryByTestId("tting-Button"); // get the text box element which have the label username
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(testBox).not.toBeInTheDocument();
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the role', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const testBox = screen.getAllByRole("textbox"); // it do not consider the textbox with type password a direct textbox
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(testBox.length).toBe(2);
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })


// assertion

// it('test the login', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const authTitleElement = screen.getByText(/Sign in with username address/i); // get the element which have the word login
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(authTitleElement).not.toBeTruthy(); // not to be null, false, "", 0, undefined
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the login', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const authTitleElement = screen.queryByTestId("testing-Button");
//     // findAll get an array that much the confition
    
//     // interact

//     //assert
//      expect(authTitleElement).not.toBeTruthy(); // or to be false
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the login', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const authTitleElement = screen.getByTitle("testing-form");
    
//     // interact

//     //assert
//      expect(authTitleElement).toHaveTextContent("username"); 
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// it('test the login', () => {
//     // 1- render
//     render(<AuthLogin />);

//     // 2- find the element
//     const authTitleElement = screen.getByTitle("typo");
//     // screen.debug();
//     // interact

//     //assert
//      expect(authTitleElement.textContent).toBe("Forgot Password?"); 
//     // expect(authTitleElement).toHaveTextContent('hello there');
// })

// describe("", ()=>{
//     // init all commons tests
//     it('the function mock', ()=>{
//         render(<Test setState={mockFunc} value=""/>);
//         const textField = screen.getByLabelText("Text Field");

//         // interaction
//         fireEvent.change(textField, { target: { value: "new Element malek" } });


//         // expect(textField.value).toBe("new Element")
//         expect(textField).toHaveValue("new Element")
//     })
// })

// describe("", ()=>{
//     // init all commons tests
//     // interacts
//     it('the function mock', ()=>{
//         render(<Test setState={mockFunc} value=""/>);
//         const textField = screen.getByLabelText("Text Field");
//         const Buttonfie = screen.getByRole("button", {name:"butto"});


//         fireEvent.click(Buttonfie);
//         // expect(textField.value).toBe("new Element")
//         // fireEvent.click(Buttonfie)
//         expect(textField).toHaveValue("")
//     })
// })


// integration test

describe("we are here" , () =>{
    // beforeEach(()=>{

    // });
    // beforeAll(()=>{
        
    // })

    it("trying integ", () =>{
        render(<LoginMockRouter/>);
        // const textField = screen.getByRole( "textbox", {name: "username"});

        // const Buttonfie = screen.getByRole("button", {name:"butto"});
        // fireEvent.change(textField, { target: { value: "new Element" } });
        // expect(textField.value).toBe("new Element")
        // fireEvent.click(Buttonfie)
        // await findByTitle("div-1")
        // const findText = screen.getByText(/new Element/i);
        expect(textField).toBeInTheDocument();
    })
})
