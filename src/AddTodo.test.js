import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  // The input for name, due date, and the button 
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // To add an item
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  // duplicate item
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  //The actual Testing
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });

   // Go through the list of todos and make sure they each have a name
  // else the test fails
 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  // The input for name, due date, and the button 
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // To add an item
  const dueDate = "11/30/2023";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  // Testing
  const check = screen.getByText("You have no todo's left");
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  // The input for name, due date, and the button 
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // To add an item
  const dueDate = "";
  fireEvent.change(inputTask, { target: { value: "CSE HW"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  // Testing
  const check = screen.getByText("You have no todo's left");
  expect(check).toBeInTheDocument();
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  // The input for name, due date, and the button 
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // To add an item
  const dueDate = "11/30/2023";
  fireEvent.change(inputTask, { target: { value: "CSE HW"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);
  // Testing
  const check = screen.getByText("You have no todo's left");
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  // The input for name, due date, and the button 
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // To add an item
  const dueDate = "11/30/2021";
  fireEvent.change(inputTask, { target: { value: "CSE HW"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  //Testing
  const historyCheck = screen.getByTestId(/CSE HW/i).style.background;
  expect(historyCheck).toBe("red")
 });
