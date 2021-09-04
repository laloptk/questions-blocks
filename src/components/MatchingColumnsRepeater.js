import { Button, TextControl } from '@wordpress/components';

const MatchingColumnsRepeater = ( props ) => {
    const { onChange, answers } = props;

    const handleAdd = () => {
        onChange([ ...answers, { 'to-match': '', 'match': ''}]);
    }

    const handleDelete = ( index ) => {
        onChange([ ...answers.slice(0, index), ...answers.slice(index + 1) ]);
    }

    const handleOnChange = ( value, index, column ) => {
        onChange([ ...answers.slice(0, index), {...answers[index], [column]: value }, ...answers.slice(index + 1) ]);
    }

    return (
        <div className="matching-columns">
            {
                answers.map( ( pair, index ) => {
                    return(
                        <div className="matching-columns__item">
                            <TextControl onChange={ ( value ) => handleOnChange( value, index, 'to-match') } value={ pair['to-match'] } />
                            <TextControl onChange={ ( value ) => handleOnChange( value, index, 'match') } value={ pair['match'] } />
                            <Button onClick={ () => handleDelete( index ) } >Delete</Button>
                        </div>
                    )
                })
            }

            <Button onClick={ handleAdd } >Add Matching Columns</Button>
        </div>
    )
}

export default MatchingColumnsRepeater