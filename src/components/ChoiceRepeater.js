import { __ } from '@wordpress/i18n';
import { TextControl, Button, ToggleControl } from '@wordpress/components';

const ChoiceRepeater = ( { choices, onChange, showStatus = true, buttonTxt = __( 'Delete Choice' ) } ) => {

    const handleAddChoice = () => {
        onChange( [ ...choices, ['', false] ] );
    }

    const handleDeleteChoice = ( index ) => {
        onChange( [ ...choices.slice( 0, index ), ...choices.slice( index + 1 ) ] );
    }
 
    const handleChoiceValue = (value, index) => {
        onChange( [ ...choices.slice( 0, index ), [value, choices[index][1]] ,...choices.slice( index + 1 ) ] );        
    }

    const handleChoiceStatus = ( index ) => {
        onChange( [ ...choices.slice( 0, index ), [ choices[index][0], !choices[index][1] ] ,...choices.slice( index + 1 ) ] );
    }

    return (
        <div className="choice-repeater">   
            { 
                choices.map( ( choice, index ) => { 
                    return (
                        <div className="choice" > 
                            <TextControl 
                                onChange={ ( value ) => handleChoiceValue( value, index ) } 
                                value={ choice[0] }
                            />
                            <div className="choice__controls">
                                {
                                    showStatus === true &&
                                        <ToggleControl
                                            label={
                                                choice[1] 
                                                ? __( 'You marked this answer as correct.' )
                                                : __( 'This is not a correct answer.' )
                                            }
                                            help={ __( 'Toggle to switch answer status.' ) }
                                            onChange={ () => handleChoiceStatus( index ) }
                                            checked={ choice[1] }
                                        />
                                }
                                <Button 
                                    className="is-primary" 
                                    onClick={ () => handleDeleteChoice( index ) } 
                                >
                                    { buttonTxt }
                                </Button>
                            </div>
                        </div>
                    )
                } )
            }

            <Button className="is-primary" onClick={ handleAddChoice }>{ __( 'Add Choice' ) }</Button>
        </div>
    )
}

export default ChoiceRepeater;