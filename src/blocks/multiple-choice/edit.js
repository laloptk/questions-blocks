import { __ } from '@wordpress/i18n';
import { 
	Card,
	CardHeader,
	CardBody,
	TextControl,
	Button
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import QuestionInput from '../../components/QuestionInput';
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

	const handleChoicesChange = (value, index) => {
		setAttributes({ choices: { ...attributes.choices, [`choice-${index}`]: { value: value } } })
	}

	const handleRepetition = () => {
		setAttributes( { 
			repetitionCounter: attributes.repetitionCounter + 1, 
			choices: {...attributes.choices, [`choice-${attributes.repetitionCounter}`]: { value: '' } } } 
		)
	}

	const removeItem = (choiceName) => {
		const choices = attributes.choices;
		delete choices[choiceName];
		setAttributes( { choices } );
	}

	return (
		<div { ...blockProps }>
			<Card size="large">
				<CardHeader>
					<h3>{ __('Multiple Choice Q&A') }</h3>
				</CardHeader>
				<CardBody size="large">
					<QuestionInput handleChange={ handleQuestionChange } text={ attributes.question }/>
					<h4>{ __( 'Place the answer options') }</h4>
					{						
						Object.keys(attributes.choices).map((choiceName, index) => {
							return (
								<div className="qa-repeated__item">
									<div className="qa-repeated__item--input">
										<TextControl 
											onChange={ (value) => handleChoicesChange(value, index) } 
											value={ attributes.choices[choiceName].value } 
										/>
									</div>
									<div className="qa-repeated__item--close">
										<Button 
											onClick={ () => removeItem(choiceName) } 
										>
											<span className="dashicons dashicons-dismiss"></span>
										</Button>
									</div>
								</div>
							)
						})						
					}		
					<Button onClick={handleRepetition} variant="primary">Add Choice</Button>		
				</CardBody>
			</Card>				
		</div>
	);
}
