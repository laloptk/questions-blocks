import { useEffect, useState } from '@wordpress/element';
import TrueFalseUserAnswer from './frontend/TrueFalseUserAnswer';
import { getBlocksData } from '../utils/helpers';

const FrontEndRender = ( { dataAttributes } ) => {
    console.log(dataAttributes);
    const [ attributes, setAttributes ] = useState( {
        block_id: 0,
        post_id: 0,
        question: '',
        block_name: ''
    } );

    useEffect( () => {        
        setAttributes( {
            ...dataAttributes
        } );        
    }, [] );
    
    const [ userAnswer, setUserAnswer ] = useState( '' );
    const [ answerIsCorrect, setIsCorrect ] = useState( '' );
    const [ isLoading, setLoading ] = useState( false );

    const apiCall = async () => {
        setLoading( true );
        const response = await getBlocksData( `${ qasAPIRoute }/${ dataAttributes.post_id }`, 'POST');
        const rightAnswer = response[attributes.block_id][0]['attrs']['rightAnswer'] === true ? true : false;
        setIsCorrect( (userAnswer === 'true') === rightAnswer );
        setLoading( false );
    }  

    return (
        <>  
            {
                attributes.block_name === 'qa/true-false' &&
                    <TrueFalseUserAnswer 
                        isCorrect={ answerIsCorrect }
                        question={ attributes.question }
                        userAnswer={ userAnswer }
                        loading={ isLoading }
                        blocksData={ apiCall }
                        onChange={ setUserAnswer }
                    />
            }
            {
                attributes.block_name === 'qa/fill-blanks' &&
                    <div>Fill Blanks</div>
            }
            {
                attributes.block_name === 'qa/matching-columns' &&
                    <div>Matching Columns</div>
            }
            {
                attributes.block_name === 'qa/multiple-choice' &&
                    <div>Multiple Choice</div>
            }
        </>    
    );
}

export default FrontEndRender;