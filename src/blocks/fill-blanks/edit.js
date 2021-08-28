import { __ } from '@wordpress/i18n';
import { 
	Card,
	CardHeader,
	CardBody
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
import TrueFalseInput from '../../components/TrueFalseInput';
import './editor.scss';

export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();	

	useEffect(() => {
		attributes.id === '' 
		&& setAttributes( { "id": clientId } )
	}, [])

	const handleQuestionChange = (value) => {
		const qAndAs = getRightQandAs( value );
		setAttributes( { frontEndQuestion: qAndAs.question, question: value, rightAnswers:  qAndAs.answers } );
	}

	const getRightQandAs = ( question ) => {
		const openingWrapper = '*__';
		const closingWrapper = '__*';
		let questionCopy = question;
		const answersArray = [];
		
		while
		( 
			questionCopy.indexOf( openingWrapper ) 
			&& questionCopy.indexOf( closingWrapper ) 
			&& questionCopy.indexOf( openingWrapper ) < questionCopy.indexOf( closingWrapper )
		) {			
			const openingIndex = questionCopy.indexOf( openingWrapper );
			const closingIndex = questionCopy.indexOf( closingWrapper );	
			answersArray.push(questionCopy.substring( openingIndex + openingWrapper.length, closingIndex ) );
			questionCopy = questionCopy.substring( closingIndex + closingWrapper.length );
		}

		return { answers: answersArray, question: question.replaceAll( closingWrapper, '' ).replaceAll( openingWrapper, '' ) }
	}

	return (
		<div { ...blockProps }>
			<Card size="large">
				<CardHeader>
					<h3>{ __('Fill Blanks Q&A') }</h3>
				</CardHeader>
				<CardBody size="large">
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
				</CardBody>
			</Card>				
		</div>
	);
}
