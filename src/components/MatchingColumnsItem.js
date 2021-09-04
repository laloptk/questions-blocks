import { TextControl } from '@wordpress/components';

const MatchingColumnsItem = ({ onChange, pair }) => {
    const handleOnChange = ( value, column ) => {
        onChange( { ...pair, [column]: value } )
    }

    return(
        <div>
            <TextControl onChange={ ( value ) => handleOnChange( value, 'to-match') } value={ pair['to-match'] } />
            <TextControl onChange={ ( value ) => handleOnChange( value, 'match')} value={ pair['match'] } />
        </div>
    )
}

export default MatchingColumnsItem;