import FrontEndRender from '../../components/FrontEndRender';
import { render } from '@wordpress/element';
 
const questionClass = '.qa-frontend-question-block';
const questions = document.querySelectorAll( questionClass );
 
questions.forEach( ( question ) => {
    const attributes = {
        block_id: question.dataset.id,
        post_id: parseInt( question.dataset.post_id, 10 ),
        question: question.dataset.question        
    };

    render(
        <FrontEndRender dataAttributes={ attributes } />,
        question
    );
} );