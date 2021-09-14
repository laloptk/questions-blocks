import { __ } from '@wordpress/i18n';
import { RadioControl } from '@wordpress/components';

const TrueFalseInput = ( props ) => {
    return(
        <div className="qa__body">
            <RadioControl 
                label={ __( 'Choose which answer is the right one.' ) }
                help={
                    props.answer === undefined 
                    ? "Select an answer"
                    : props.answer
                    ? "You selected 'True' as the right answer"
                    : "You selected 'False' as the right answer"
                }
                selected={ props.answer }
                options={ [
                    { label: __( 'True' ), value: "true" },
                    { label: __( 'False' ), value: "false" },
                ] }
                onChange={ props.handleChange }
            />
        </div>
    )
}

export default TrueFalseInput;