import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

const TrueFalseInput = ( props ) => {
    return(
        <div className="qa__body">
            <ToggleControl
                label={__( 'Choose which answer is the right one.' ) }
                help={
                    props.answer
                        ? __( 'You chose "True" as the the right answer.' )
                        : __( 'You chose "False" as the the right answer.' )
                }
                checked={ props.answer }
                onChange={ props.handleChange }
            />		
        </div>
    )
}

export default TrueFalseInput