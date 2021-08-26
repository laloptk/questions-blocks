import apiFetch from '@wordpress/api-fetch';
import { RadioControl, Button, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const FrontEndRender = ( { dataAttributes } ) => {
    const [ attributes, setAttributes ] = useState( {
        block_id: 0,
    } );

    useEffect( () => {
        setAttributes( {
            ...dataAttributes,
        } );
    }, [] );

    const [ isLoading, setLoading ] = useState( false );
    
    const getBlocksData = async () => {
        setLoading( true );

        const response = await apiFetch( {
            path: `${initTracker.route}/${ dataAttributes.post_id }`,
            method: 'POST'
        } ).then( ( success ) => {
            return success;
        } )
        .catch( ( error ) => {
            return {
                type: 'error',
                message: error.message,
            };
        } );

        setLoading( false );
        const blocksData = JSON.parse(response);
        const rightAnswer = blocksData[attributes.block_id].rightAnswer ? true : false;
        const userAnswer = attributes.user_answer ? true : false;
        const answerIsCorrect =  rightAnswer === userAnswer;
        setAttributes({ ...attributes, isCorrect:  answerIsCorrect })     
    }    

    return (
        <div className=".qa-frontend" style={
                attributes.isCorrect === false
                ? {
                    backgroundColor: '#FF7F7F'
                }
                : attributes.isCorrect === true 
                ? {
                    backgroundColor: '#98FB98'
                } 
                : {
                    backgroundColor: 'transparent'
                }
            }>
            <div className="qa-frontend__question">
                <h2>{ attributes.question }</h2>
            </div>
            <div className="qa-frontend__answer" >
                <RadioControl 
                    label="Answer"
                    help={
                        attributes.user_answer === undefined 
                        ? "Select an answer"
                        : attributes.user_answer
                        ? "You selected 'True' as the right answer"
                        : "You selected 'False' as the right answer"
                    }
                    selected={ attributes.user_answer }
                    options={ [
                        { label: 'True', value: 'true' },
                        { label: 'False', value: '' },
                    ] }
                    onChange={ ( value ) => { 
                        setAttributes( { ...attributes, user_answer: value, isCorrect: null } ) 
                    }}
                />
            </div>
            <div class="qa-frontend__send">
                <Button 
                    variant="secondary"
                    onClick={ getBlocksData }
                    disabled={ 
                        isLoading || attributes.user_answer === undefined 
                    }
                >  
                {
                    attributes.user_answer === undefined 
                    ? 'Select an Answer Above'
                    : isLoading
                    ? <Spinner />
                    : 'Send Answer'
                }                                            
                </Button>
            </div>
        </div>        
    );
}

export default FrontEndRender;