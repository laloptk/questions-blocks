import FrontEndRender from './components/FrontEndRender';
import { render } from '@wordpress/element';
 
const questionClass = '.qa-frontend-question-block';
const questions = document.querySelectorAll( questionClass );
 
questions.forEach( ( question ) => {
    const attributes = {
        block_id: question.dataset.id,
        post_id: parseInt( question.dataset.post_id, 10 ),
        question: question.dataset.question,
        block_name: question.dataset.block_name   
    };

    if( question.dataset.options !== undefined ) {
        attributes.options = question.dataset.options;
    }

    if( question.dataset.choosen_qty !== undefined ) {
        attributes.choosen_qty = question.dataset.choosen_qty;
    }

    render(
        <FrontEndRender dataAttributes={ attributes } />,
        question
    );
} );