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
import { extractWrappedStrings } from '../../utils/helpers';
import './editor.scss';

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
			<Card size="small">
				<CardHeader>
					<h3>{ __('Fill Blanks Q&A') }</h3>
				</CardHeader>
				<CardBody size="small">
					<div className="qa-header-note">
						<p>
							{ __( 'Write a sentence with blanks to fill. The blanks should be written like this: *__right answer__*' ) }
						</p>
					</div>
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<div className="all-answers">
						<div className="qa-answers-note">
							{ __( 'The right answers you chose are, in that order:') }
						</div>
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
						<div className="qa-wrong-answers">
							<h3><strong>{ __( 'Write wrong (distractor) choices:' )}</strong></h3>
							<ChoiceRepeater 
								onChange={ handleChoicesChange } 
								choices={ attributes.wrongChoices }
								showStatus={ false }
								buttonTxt={ <span class='dashicons dashicons-dismiss'></span> }
							/>
						</div>
					</div>
				</CardBody>
			</Card>				
		</div>
	);
}
