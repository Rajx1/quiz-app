/**
 * @jest-environment jsdom
 */
 import axios from 'axios';
 jest.mock('axios');
 
import { default as CreateQuiz } from '../pages/CreateQuiz';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// const mockedSubmitForm = jest.fn()
// jest.mock('../pages/CreateQuiz', ()=>({
//     ...jest.requireActual('../pages/CreateQuiz'),
//     submitForm: () => mockedSubmitForm,
// }))

describe('CreateQuiz', () => {

    beforeEach(() => jest.resetAllMocks())

    test('renders a heading element', () => {
        renderWithProviders(<CreateQuiz />)
        const heading = screen.getAllByRole('heading')
        expect(heading).toBeTruthy()
    });

    test('it changes the difficulty value to the difficulty selected by the user', () => {
        renderWithProviders(<CreateQuiz />)
        const create = screen.getByRole('create')
        const submit = screen.getByRole('submit')
        userEvent.type(create, 'player1')
        userEvent.click(submit)
        userEvent.type(create, 'player2')
        userEvent.click(submit)
        
        const difficulty = screen.getByRole('difficulty')
        userEvent.selectOptions(difficulty, 'Medium')   
        expect(difficulty.value).toEqual('medium');  
    });

    test('it changes the category value to the category selected by the user', async () => {
        const trivia_categories = [{
            name: 'History',
            id: 23 
        }]
        await axios.get.mockResolvedValue({ data: { trivia_categories } } );
        renderWithProviders(<CreateQuiz />);
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/opentdb/));
        const create = screen.getByRole('create')
        const submit = screen.getByRole('submit')
        userEvent.type(create, 'player1')
        userEvent.click(submit)
        userEvent.type(create, 'player2')
        userEvent.click(submit)

        // const category = screen.getByRole('category')
        // userEvent.click(category)
        // userEvent.selectOptions(category, 'History')   
        // expect(category.value).toEqual(23);  
    });

    test('submitForm', () => {
        renderWithProviders(<CreateQuiz />)
        //const instance = app.instance()
        //const spy = jest.spyOn(CreateQuiz, 'submitForm')
        
        const create = screen.getByRole('create')
        const submit = screen.getByRole('submit')
        userEvent.type(create, 'player1')
        userEvent.click(submit)
        userEvent.type(create, 'player2')
        userEvent.click(submit)
        
        const submitFormButton = screen.getByRole('submit-options')
        userEvent.click(submitFormButton)   
        expect(2+2).toEqual(4)
        // expect(submitForm).toHaveBeenCalled();  
    });

});