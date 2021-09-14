import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { RadioControl, CheckboxControl, Button, Spinner } from '@wordpress/components';
import { answerNotice, getComponentOptions } from '../../utils/helpers';

const MultipleChoiceUserAnswer = ( props ) => {  
    const [ checkValues, setCheckValues ] = useState( new Array( JSON.parse(props.options).length ).fill( false ) );
    
    const handleSingleAnswer = ( value ) => {        
        props.onChange( [ value ] )
    } 

    const handleMultipleAnswers = ( value, option, index ) => {
        setCheckValues( [...checkValues.slice(0, index), value, ...checkValues.slice( index + 1 )])        
        const optionIndex = props.userAnswer.indexOf(option);
        !checkValues[index]
        ? props.onChange( [ ...props.userAnswer, option ] )
        : props.onChange( [ ...props.userAnswer.slice(0, optionIndex), ...props.userAnswer.slice( optionIndex + 1 ) ] )
    }

    console.log(props.userAnswer);

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
                { parseInt(props.rightChoicesQty) <= 1 
                    ?
                        <RadioControl 
                            label={ __( 'Answer' ) }
                            selected={ props.userAnswer[0] }
                            options={ getComponentOptions( JSON.parse( props.options ) ) }
                            onChange={ handleSingleAnswer }
                        />
                    :
                        JSON.parse( props.options ).map(( option, index ) => {
                            return ( 
                                <CheckboxControl
                                    label={ option }
                                    checked={ checkValues[index] }
                                    onChange={ ( value ) => handleMultipleAnswers( value, option, index ) }
                                />
                            )
                        })
                }
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

export default MultipleChoiceUserAnswer;