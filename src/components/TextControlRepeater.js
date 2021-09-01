import { __ } from '@wordpress/i18n';
import { TextControl, Button } from '@wordpress/components';

const TextControlRepeater = ( { choices, onChange } ) => {

    const handleAddChoice = () => {
        onChange( [ ...choices, '' ] );
    }

    const handleDeleteChoice = ( index ) => {
        onChange( [ ...choices.slice( 0, index ), ...choices.slice( index + 1 ) ] );
    }

    const handleChoiceValue = (value, index) => {
        onChange( [ ...choices.slice( 0, index ), value ,...choices.slice( index + 1 ) ] );        
    }

    return (
        <div className="text-control-repeater">   
            { 
                choices.map( ( choice, index ) => { 
                    return (
                        <div className="choice" > 
                            <TextControl 
                                onChange={ ( value ) => handleChoiceValue( value, index ) } 
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