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

export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();	

	useEffect( () => {
		attributes.id === '' 
		&& setAttributes( { "id": clientId } )
	}, [])

	const handleQuestionChange = ( value ) => {
		setAttributes( { "question": value } )
	}              

	const handleChoicesChange = ( choices ) => {
		setAttributes( { choices } );
	}

	return (
		<div { ...blockProps }>
			<Card size="large">
				<CardHeader>
					<h3>{ __( 'Multiple Choice Q&A' ) }</h3>
				</CardHeader>
				<CardBody size="large">
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<h4>{ __( 'Place the answer multiple choices:' ) }</h4>					
					<ChoiceRepeater 
						onChange={ handleChoicesChange } 
						choices={ attributes.choices } 
					/>									
				</CardBody>
			</Card>				
		</div>
	);
}
