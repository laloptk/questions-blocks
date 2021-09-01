import { __ } from '@wordpress/i18n';
import { TextControl, Button, ToggleControl } from '@wordpress/components';

const ChoiceRepeater = ( { choices, onChange } ) => {

    const handleAddChoice = () => {
        onChange( [ ...choices, ['', false] ] );
    }

    const handleDeleteChoice = ( index ) => {
        onChange( [ ...choices.slice( 0, index ), ...choices.slice( index + 1 ) ] );
    }
 
    const handleChoiceValue = (value, index) => {
        onChange( [ ...choices.slice( 0, index ), [value, choices[index][1]] ,...choices.slice( index + 1 ) ] );        
    }

    const handleRightAnswers = ( index ) => {
        onChange( [ ...choices.slice( 0, index ), [choices[index][0], !choices[index][1]] ,...choices.slice( index + 1 ) ] );
    }

    return (
        <div className="text-control-repeater">   
            { 
                choices.map( ( choice, index ) => { 
                    return (
                        <div className="choice" > 
                            <TextControl 
                                onChange={ ( value ) => handleChoiceValue( value, index ) } 
                                value={ choice[0] }
                            />
                            <ToggleControl
                                help="Toggle to mark as a correct option."
                                onChange={ () => handleRightAnswers( index ) }
                                checked={ choice[1] }
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

export default ChoiceRepeater;