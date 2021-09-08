import { Button, TextControl } from '@wordpress/components';
import ChoiceRepeater from './ChoiceRepeater';

const MatchingColumnsRepeater = ( { onChange, answers } ) => {    
    const handleAddRow = () => {
        onChange( [ ...answers, { 'to-match': '', 'match': [ [ '', true ] ] } ] );
    }

    const handleDeleteColumns = ( index ) => {
        onChange( [ ...answers.slice( 0, index ), ...answers.slice( index + 1 ) ] );
    }

    const handleOnChangeColumns = ( value, index, column ) => {
        onChange( [ ...answers.slice( 0, index ), { ...answers[index], [column]: value }, ...answers.slice( index + 1 ) ] );
    }

    const handleChoiceRepetition = ( choices, index ) => {
        onChange([ ...answers.slice( 0, index ), { 'to-match': answers[index]['to-match'], 'match': choices }, ...answers.slice( index + 1 ) ]);
    }

    return (
        <div className="matching-columns">
            {
                answers.map( ( pair, index ) => {
                    return(
                        <div className="matching-columns__item">
                            <div className="matching-columns__item--col to-match">
                                <TextControl 
                                    onChange={ ( value ) => handleOnChangeColumns( value, index, 'to-match') } 
                                    value={ pair['to-match'] } 
                                />
                            </div>
                            <div className="matching-columns__item--col match">
                                <ChoiceRepeater 
                                    onChange={ ( choices ) => handleChoiceRepetition( choices, index ) }
                                    choices={ pair['match'] } 
                                    showStatus={ false }
                                    buttonTxt={ <span class='dashicons dashicons-dismiss'></span> }
                                />
                            </div>
                            <div className="matching-columns__item--col delete">
                                <Button onClick={ () => handleDeleteColumns( index ) } >
                                    <span class="dashicons dashicons-dismiss"></span>
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
            <div className="matching-columns__btn">
                <Button className="is-primary" onClick={ handleAddRow } >Add Row</Button>
            </div>
        </div>
    )
}

export default MatchingColumnsRepeater;