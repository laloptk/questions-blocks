import { __ } from '@wordpress/i18n';
import { 
	Card,
	CardHeader,
	CardBody,
	TextControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
import ChoiceRepeater from '../../components/ChoiceRepeater';
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

	const handleChoicesChange = ( wrongChoices ) => {
		setAttributes( { wrongChoices } );
	}

	return (
		<div { ...blockProps }>
			<Card size="large">
				<CardHeader>
					<h3>{ __('Fill Blanks Q&A') }</h3>
				</CardHeader>
				<CardBody size="large">
					<p>
						Write a sentence with blanks to fill. The blanks should be written like this: *__right answer__*
					</p>
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<div className="all-answers">
						The right answers you chose are, in that order:
						{
							attributes.rightAnswers.map((answer) => {
								return (
									<div className="answers-partial">
										<div className="right-answer">
											{ answer }
										</div>
									</div>
								)
							})
						}
						<h3>Write wrong answer choices:</h3>
						<ChoiceRepeater 
							onChange={ handleChoicesChange } 
							choices={ attributes.wrongChoices }
							showStatus={ false }
						/>
					</div>
				</CardBody>
			</Card>				
		</div>
	);
}
