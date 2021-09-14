import { useEffect, useState } from '@wordpress/element';
import TrueFalseUserAnswer from './frontend/TrueFalseUserAnswer';
import MultipleChoiceUserAnswer from './frontend/MultipleChoiceUserAnswer';
import { getBlocksData, compareAnswers  } from '../utils/helpers';

const FrontEndRender = ( { dataAttributes } ) => {

    const [ userAnswer, setUserAnswer ] = useState( '' );
    const [ answerIsCorrect, setIsCorrect ] = useState( '' );
    const [ isLoading, setLoading ] = useState( false );

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

    const apiCall = async () => {
        setLoading( true );
        const response = await getBlocksData( `${ qasAPIRoute }/${ dataAttributes.post_id }`, 'POST');
        setIsCorrect( compareAnswers( userAnswer, response[attributes.block_id][0]['attrs']['rightAnswer'] ) );
        setLoading( false );
    } 

    //console.log( userAnswer );

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
                    <MultipleChoiceUserAnswer 
                        isCorrect={ answerIsCorrect }
                        question={ attributes.question }
                        userAnswer={ userAnswer }
                        loading={ isLoading }
                        blocksData={ apiCall }
                        onChange={ setUserAnswer }
                        options={ attributes.options }
                        rightChoicesQty = { attributes.choosen_qty }
                    />
            }
        </>    
    );
}

export default FrontEndRender;