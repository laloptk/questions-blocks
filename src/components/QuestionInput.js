import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

const QuestionInput = (props) => {
    
    return (
        <div className="qa__header">
            <TextControl 
                label={ __( 'Write your question here.' ) }
                onChange={ (value) => props.handleChange( value ) }
                value={ props.text }
            />
        </div>
    )
}

export default QuestionInput