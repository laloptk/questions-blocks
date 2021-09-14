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
            noticeClass = 'incorrect';
        default:
            break;
    }
    
    return ( <div className={ `answer-notice ${ noticeClass }` }> { noticeText } </div> );
}

export const getRawOptions = ( choices ) => {
    const options = choices.map(( choice ) => { 
        return choice[0];
    });

    return options;
}

export const getComponentOptions = ( options ) => {
    const componentOptions = options.map(( option, index ) => { 
        const value = option === '' ? `empty-${index}` : option;     
        return { label: option, value: value };
    });

    return componentOptions;
}

export const getRightAnswers = ( choices ) => {
    if( typeof choices !== 'object') {
        return;
    }

    const rightAnswers = [];

    for( let i in choices) {
        if(choices[i][1]) {
            rightAnswers.push( choices[i][0] );
        }
    }

    return rightAnswers;
}

export const compareAnswers = ( userAnswer, rightAnswer) => {
    const lengthIsEqual = userAnswer.length === rightAnswer.length;
    const typeIsEqual = typeof rightAnswer === typeof userAnswer;

    if( !typeIsEqual || !lengthIsEqual ) {
        return false;
    }

    if( typeof rightAnswer === 'string' || typeof rightAnswer === 'boolean' || typeof rightAnswer === 'number' ) {
        return rightAnswer === userAnswer;
    }

    if( typeof rightAnswer === 'object') {
        for( let i in userAnswer ) {
            const answerExists = rightAnswer.indexOf( userAnswer[i] );

            if( answerExists === -1 ) {
                return false;
            } else {
                rightAnswer.splice(answerExists, 1);
            }
        }

        return true;
    }

    return false;
}
