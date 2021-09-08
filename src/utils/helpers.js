import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

export const extractWrappedStrings = (text, opener, closer) => {
    const answers = [];
    const question = text.replaceAll( closer, '' ).replaceAll( opener, '' );

    if( typeof text !== 'string' || typeof opener !== 'string' || typeof closer !== 'string' ) {
        return;
    }

    while( text.indexOf( opener ) && text.indexOf( closer ) && text.indexOf( opener ) < text.indexOf( closer ) ) {			
        
        const openingIndex = text.indexOf( opener );
        const closingIndex = text.indexOf( closer );	
        answers.push( text.substring( openingIndex + opener.length, closingIndex ) );
        text = text.substring( closingIndex + closer.length );

    }

    return { answers: answers, question: question }
}

export const getBlocksData = (path, method) => { 
    return apiFetch( 
    {
        path: path,
        method: method
        } ).then( ( success ) => {
            return success;
        } ).catch( ( error ) => {
            return {
                type: 'error',
                message: error.message,
        };
    } );
};

export const answerNotice = ( isCorrect ) => {
    let noticeText = '';
    let noticeClass= '';
    switch(isCorrect) {
        case true:
            noticeText = __( 'You answered correctly!' );
            noticeClass = 'correct';
            break;
        case false:
            noticeText = __( 'That is the wrong answer!' );
            noticeClass = 'correct';
        default:
            break;
    }
    
    return ( <div className={ `answer-notice ${ noticeClass }` }> { noticeText } </div> );
}