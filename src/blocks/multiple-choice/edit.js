import { __ } from '@wordpress/i18n';
import { Card, CardHeader, CardBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
import ChoiceRepeater from '../../components/ChoiceRepeater';
import { getRightAnswers, getRawOptions } from '../../utils/helpers';
import './editor.scss';

export default function Edit({ name, clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { id, question, choices } = attributes;	

	useEffect( () => {
		setAttributes( { block_name: name } );
		id === '' && setAttributes( { id: clientId } );
	}, [])

	const handleQuestionChange = ( value ) => {
		setAttributes( { question: value } )
	}              

	const handleChoicesChange = ( choices ) => {

		const rightAnswer = getRightAnswers( choices );
		const options = getRawOptions( choices );

		setAttributes( { rightAnswer } );
		setAttributes( { choices } );
		setAttributes( { options } );
	}

	console.log(attributes.rightAnswer)

	return (
		<div { ...blockProps }>
			<Card size="small">
				<CardHeader>
					<h3>{ __( 'Multiple Choice Q&A' ) }</h3>
				</CardHeader>
				<CardBody size="small">
					<QuestionInput handleChange={ handleQuestionChange } text={ question }/>
					<div className="qa-multiple-choices">
						<h3><strong>{ __( 'Place the answer multiple choices:' ) }</strong></h3>					
						<ChoiceRepeater 
							onChange={ handleChoicesChange } 
							choices={ choices } 
						/>
					</div>									
				</CardBody>
			</Card>				
		</div>
	);
}
