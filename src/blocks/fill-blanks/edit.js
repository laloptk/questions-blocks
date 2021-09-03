import { __ } from '@wordpress/i18n';
import { 
	Card,
	CardHeader,
	CardBody
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
import ChoiceRepeater from '../../components/ChoiceRepeater';
import './editor.scss';
import { extractWrappedStrings } from '../../utils/helpers';

export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();	

	useEffect(() => {
		attributes.id === '' 
		&& setAttributes( { "id": clientId } )
	}, []);

	const rightQandAs = extractWrappedStrings( attributes.question, '*__', '__*');

	const handleQuestionChange = (value) => {
		setAttributes( { frontEndQuestion: rightQandAs.question, question: value, rightAnswers:  rightQandAs.answers } );
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
							attributes.rightAnswers.map( (answer) => {
								return (
									<div className="answers-partial">
										<div className="right-answer">
											{ answer }
										</div>
									</div>
								)
							})
						}
						<h3>{ __( 'Write wrong (distractor) choices:' ) }</h3>
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
