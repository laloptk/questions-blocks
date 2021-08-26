/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { 
	TextControl, 
	ToggleControl, 
	Card,
	CardHeader,
	CardBody,
	CardFooter, } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();	

	useEffect(() => {
		attributes.id === '' 
		&& setAttributes( { "id": clientId } )
	}, [])

	function handleQuestionChange( value ) {
		setAttributes( { "question": value } )
	}

	function handleAnswerChange() {
		setAttributes({ "rightAnswer": ! attributes.rightAnswer })
	}

	return (
		<div { ...blockProps }>
			<Card size="small">
				<CardBody size="large">
					<div className="true-false qa__header">
						<TextControl 
							label={ __( 'Question text' ) }
							onChange={ handleQuestionChange }
							value={ attributes.question }
						/>
					</div>
					<div className="true-false qa__body">
						<ToggleControl
							label={__( 'Choose the right answer for this question' ) }
							help={
								attributes.rightAnswer
									? __( 'You chose "True" as the the right answer.' )
									: __( 'You chose "False" as the the right answer.' )
							}
							placeholder="Write your question here..."
							checked={ attributes.rightAnswer }
							onChange={ handleAnswerChange }
						/>		
					</div>
				</CardBody>
			</Card>				
		</div>
	);
}
