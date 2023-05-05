import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { object, string } from 'yup'

const schema = object().shape({
  newQuestion:
  string()
  .min(2)
  .trim()
  .required('Question is required.'),
  newTrueAnswer:
    string()
    .min(2)
    .trim()
    .required('True answer is required.'),
    newFalseAnswer:
      string()
      .min(2)
      .trim()
      .required('False answer is required.')
})
  

export function Form(props) {

  const checkSchema = () => {
    if(props.form.newQuestion.trim() && props.form.newTrueAnswer.trim() && props.form.newFalseAnswer.trim()){
      return false
    } return true
    
  }

  const onChange = evt => {
    props.inputChange(evt);

  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.resetForm()
    const data = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer
    }
    props.postQuiz(data)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2 onClick={() => console.log(props.form)}>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={checkSchema()}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
