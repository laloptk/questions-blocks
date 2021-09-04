import { __ } from '@wordpress/i18n';
import { 
	Card,
	CardHeader,
	CardBody
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
import MatchingColumnsRepeater from '../../components/MatchingColumnsRepeater';
import './editor.scss';

export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();	

	useEffect(() => {
		attributes.id === '' 
		&& setAttributes( { id: clientId } )
	}, [])

	const handleQuestionChange = ( value ) => {
		setAttributes( { question: value } )
	}

	const handleRepetition = ( pairs ) => {
		setAttributes( { answerPairs: pairs } )
	}
	console.log(attributes.answerPairs);
	return (
		<div { ...blockProps }>
			<Card size="large">
				<CardHeader>
					<h3>{ __('Matching Columns Q&A') }</h3>
				</CardHeader>
				<CardBody size="large">
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<MatchingColumnsRepeater onChange={ handleRepetition } answers={ attributes.answerPairs } />
				</CardBody>
			</Card>				
		</div>
	);
}
