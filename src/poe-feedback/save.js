/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const { positiveLabel, negativeLabel } = attributes;
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
			<RichText.Content
				tagName="button"
				className="wp-block-button__link wp-element-button"
				value={ positiveLabel ? positiveLabel : 'Yes' }
			/>
			<RichText.Content
				tagName="button"
				className="wp-block-button__link wp-element-button"
				value={ negativeLabel ? negativeLabel : 'No' }
			/>
		</div>
	);
}
