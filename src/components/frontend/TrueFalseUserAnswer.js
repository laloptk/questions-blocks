import { __ } from '@wordpress/i18n';
import { RadioControl, Button, Spinner } from '@wordpress/components';
import { answerNotice } from '../../utils/helpers';

const TrueFalseUserAnswer = ( props ) => {
    return (
        <div className="qa-frontend" style={
            props.isCorrect === false
            ? {
                backgroundColor: '#FF7F7F'
            }
            : props.isCorrect === true 
            ? {
                backgroundColor: '#98FB98'
            } 
            : {
                backgroundColor: 'transparent'
            }
        }>
        <div className="qa-frontend__question">
            <h2>{ props.question }</h2>
        </div>
        
        <div className="qa-frontend__answer" >
            <RadioControl 
                label={ __( 'Answer' ) }
                help={
                    props.userAnswer === undefined 
                    ? "Select an answer"
                    : props.userAnswer
                    ? "You selected 'True' as the right answer"
                    : "You selected 'False' as the right answer"
                }
                selected={ props.userAnswer }
                options={ [
                    { label: __( 'True' ), value: 'true' },
                    { label: __( 'False' ), value: 'false' },
                ] }
                onChange={ props.onChange }
            />
        </div>
        { answerNotice( props.isCorrect ) }
        <div class="qa-frontend__send">
            <Button 
                variant="secondary"
                onClick={ props.blocksData }
                disabled={ 
                    (props.loading || props.userAnswer === '') === true
                }
            >  
            {
                props.userAnswer === '' 
                ? __( 'Select an Answer Above' )
                : props.loading
                ? <Spinner />
                : __( 'Send Answer' )
            }                                            
            </Button>
        </div>
    </div>
    )
}

export default TrueFalseUserAnswer;