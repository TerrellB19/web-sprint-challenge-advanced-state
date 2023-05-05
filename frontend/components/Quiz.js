import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

 function Quiz(props) {
  const { quiz, selected } = props;

  if (!quiz){
    useEffect(() => {
      props.fetchQuiz()
      
    }, [])
  }

  const submitBtn = () => {    
      const answer = {
        quiz_id: quiz.quiz_id,
        answer_id: selected.answer_id
      }
      props.postAnswer(answer)
      
    
  }

  return ( 
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
            <div id="quizAnswers">
            {console.log(quiz)}
              {
                quiz.answers.map((answer, id) => {
                  return(
                    <div className={selected === answer ? 'answer selected' : 'answer'} key={id}>
                      {answer.text}
                      <button onClick={() => props.selectAnswer(answer)}>
                        {selected === answer ? 'SELECTED' : 'select'}
                      </button>
                    </div>
                )})
              }
              
            </div>

            <button id="submitAnswerBtn" onClick={() => submitBtn()} disabled={selected ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selected: state.selectedAnswer
  }
}
export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz)
