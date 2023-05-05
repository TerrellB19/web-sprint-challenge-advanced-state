import axios from 'axios'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return({type:MOVE_CLOCKWISE})
 }

export function moveCounterClockwise() {
  return({type:MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(answer) {
  return({type:SET_SELECTED_ANSWER, payload: answer})
 }

export function setMessage(message) {
  return({type:SET_INFO_MESSAGE, payload: message})
 }

export function setQuiz(quiz) { 
  return({type:SET_QUIZ_INTO_STATE, payload: quiz})
}

export function inputChange(e) {
  return({type: INPUT_CHANGE, payload: e.target})
 }

export function resetForm() {
  return({type: RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({type: SET_QUIZ_INTO_STATE})
    // On successful GET:
    axios.get('http://localhost:9000/api/quiz/next')
    // - Dispatch an action to send the obtained quiz to its state
    .then(res => {
      dispatch(setQuiz(res.data))
    })
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer', answer)
    // - Dispatch an action to reset the selected answer state
      .then(res => dispatch({type: SET_INFO_MESSAGE, payload: res.data.message}))
    // - Dispatch an action to set the server message to state
      .then(res => dispatch({type: SET_QUIZ_INTO_STATE}))
    // - Dispatch the fetching of the next quiz
      .catch(err => dispatch({SET_INFO_MESSAGE, payload: err}))
    
  }




}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/new', quiz)
    // - Dispatch the correct message to the the appropriate state
    .then(res => dispatch({type: SET_INFO_MESSAGE, payload: `Congrats: "${quiz.question_text}" is a great question!`}))
    // - Dispatch the resetting of the form
    .then(res => dispatch({type: RESET_FORM}))
    .catch(err => dispatch({type: SET_INFO_MESSAGE, payload: "error posting quiz"}))
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

// .then(res => dispatch({type: SET_INFO_MESSAGE, paylod: `Nice job! "${quiz.question_text}" is a good question`}))