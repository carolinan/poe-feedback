import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

const TEMPLATE = [
	[ 'core/heading',
		{
			content: __( 'Was this lesson helpful?', 'poe-feedback' ),
			level: 3,
			lock: {
				move: false,
				remove: false,
			},
		},
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		positiveLabel,
		negativeLabel,
		feedbackURL,
		feedbackLinkText,
		saveNotice,
		duplicateSubmissionNotice,
		thankYouMessage,
	} = attributes;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'core/heading' ],
		template: TEMPLATE,
		templateLock: true,
	} );

	return (
			<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'poe-feedback' ) }>
					<TextControl
						label={ __( 'Thank you message', 'poe-feedback' ) }
						value={ thankYouMessage ? thankYouMessage : __( 'Thank you, I appreciate you!', 'poe-feedback' ) }
						onChange={(value) => setAttributes({ thankYouMessage: value })}
					/>
					<TextControl
						label={ __( 'Save notice', 'poe-feedback' ) }
						value={ saveNotice ? saveNotice : __( 'Your anonymous feedback has been saved.', 'poe-feedback' ) }
						onChange={(value) => setAttributes({ saveNotice: value })}
					/>
					<TextControl
						label={ __( 'Duplicate submission notice', 'poe-feedback' ) }
						value={ duplicateSubmissionNotice ? duplicateSubmissionNotice : __( 'You have already provided feedback for this lesson.', 'poe-feedback' ) }
						onChange={(value) => setAttributes({ duplicateSubmissionNotice: value })}
					/>
					<TextControl
						label={ __( 'Feedback URL', 'poe-feedback' ) }
						placeholder="https://github.com/carolinan/fullsiteediting/issues/new"
						value={ feedbackURL }
						onChange={(value) => setAttributes({ feedbackURL: value })}
					/>
					<TextControl
						label={ __( 'Feedback link text', 'poe-feedback' ) }
						value={ feedbackLinkText ? feedbackLinkText : __( 'If you would like to provide more details, please open a GitHub issue.', 'poe-feedback' )}
						onChange={(value) => setAttributes({ feedbackLinkText: value })}
					/>
					<Button
						variant="secondary"
						// Reset all attributes to default values
						onClick={() => {
							setAttributes({
								positiveLabel: __( 'Yes', 'poe-feedback' ),
								negativeLabel: __( 'No', 'poe-feedback' ),
								feedbackURL: 'https://github.com/carolinan/fullsiteediting/issues/new',
								feedbackLinkText: __( 'If you would like to provide more details, please open a GitHub issue.', 'poe-feedback' ),
								saveNotice: __( 'Your anonymous feedback has been saved.', 'poe-feedback' ),
								duplicateSubmissionNotice: __( 'You have already provided feedback for this lesson.', 'poe-feedback' ),
								thankYouMessage: __( 'Thank you, I appreciate you!', 'poe-feedback' ),
							});
						} }
					>
						{ __( 'Reset', 'poe-feedback' ) }
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{innerBlocksProps.children}
				<RichText
					tagName="button"
					allowedFormats={ ['core/bold', 'core/italic', 'core/image'] }
					value={ positiveLabel ? positiveLabel : __( 'Yes', 'poe-feedback' ) }
					onChange={ (value) => setAttributes({ positiveLabel: value }) } />
				<RichText
					tagName="button"
					allowedFormats={ ['core/bold', 'core/italic', 'core/image'] }
					value={ negativeLabel ? negativeLabel : __(' No', 'poe-feedback' ) }
					onChange={ (value) => setAttributes({ negativeLabel: value }) } />
			</div>
		</>
	);
}
