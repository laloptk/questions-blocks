import { __ } from '@wordpress/i18n';
import { TextControl, Button } from '@wordpress/components';

const TextControlRepeater = (props) => {

    const handleAddChoice = () => {
        props.onChange( [ ...props.choices, ''] );
    }

    const handleDeleteChoice = ( index ) => {
        props.onChange( [...props.choices.slice(0, index), ...props.choices.slice(index + 1) ] );
    }

    const handleChoiceValue = (value, index) => {
        props.onChange( [...props.choices.slice(0, index), value ,...props.choices.slice(index + 1) ] );        
    }

    return (
        <div className="text-control-repeater">   
            { 
                props.choices.map((choice, index) => { 
                    return (
                        <div className="choice"  > 
                            <TextControl 
                                onChange={ ( value ) => handleChoiceValue(value, index) } 
                                value={ choice }
                            />
                            <Button onClick={ () => handleDeleteChoice( index ) } >Delete</Button>
                        </div>
                    )
                })
            }

            <Button onClick={ handleAddChoice }>Add Element</Button>
        </div>
    )
}

export default TextControlRepeater;