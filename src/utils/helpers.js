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