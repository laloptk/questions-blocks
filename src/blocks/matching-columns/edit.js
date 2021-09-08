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

export default function Edit({ name, clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { id, question, answerPairs } = attributes;

	useEffect(() => {
		setAttributes( { block_name: name } );
		id === '' && setAttributes( { id: clientId } )
	}, [])

	const handleQuestionChange = ( value ) => {
		setAttributes( { question: value } )
	}

	const handleRepetition = ( pairs ) => {
		setAttributes( { answerPairs: pairs } )
	}

	return (
		<div { ...blockProps }>
			<Card size="small">
				<CardHeader>
					<h3>{ __('Matching Columns Q&A') }</h3>
				</CardHeader>
				<CardBody size="small">
					<QuestionInput handleChange={ handleQuestionChange } text={ question } />
					<MatchingColumnsRepeater onChange={ handleRepetition } answers={ answerPairs } />
				</CardBody>
			</Card>				
		</div>
	);
}
