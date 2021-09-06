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
		setAttributes( { "question": value } )
	}

	const handleAnswerChange = () => {
		setAttributes({ "rightAnswer": ! attributes.rightAnswer })
	}

	return (
		<div { ...blockProps }>
			<Card size="small">
				<CardHeader>
					<h3>{ __( 'True or false Q&A' ) }</h3>
				</CardHeader>
				<CardBody size="small">
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<TrueFalseInput handleChange={ handleAnswerChange } answer={ attributes.rightAnswer } />
				</CardBody>
			</Card>				
		</div>
	);
}
