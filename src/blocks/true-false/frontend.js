import FrontEndRender from '../../components/FrontEndRender';
import { render } from '@wordpress/element';
 
const trackerClass = '.qa-frontend-question-block';
const trackers = document.querySelectorAll( trackerClass );
 
trackers.forEach( ( tracker ) => {
    const attributes = {
        block_id: tracker.dataset.id,
        question: tracker.dataset.question,
        post_id: parseInt( tracker.dataset.post_id, 10 ),
    };

    console.log(attributes);
    render(
        <FrontEndRender dataAttributes={ attributes } />,
        tracker
    );
} );