<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Only render on posts / pages / cpt (lessons)
$post_id = get_the_ID();
if ( ! $post_id || ! $block ) {
	return;
}

$no                        = isset($attributes['negativeLabel']) ? $attributes['negativeLabel'] : __( 'No', 'poe-feedback' );
$yes                       = isset($attributes['positiveLabel']) ? $attributes['positiveLabel'] : __( 'Yes', 'poe-feedback' );
$saveNotice	               = isset($attributes['saveNotice']) ? $attributes['saveNotice'] : __( 'Your anonymous feedback has been saved.', 'poe-feedback' );
$feedbackURL               = isset($attributes['feedbackURL']) ? $attributes['feedbackURL'] : "https://github.com/carolinan/fullsiteediting/issues/new";
$feedbackLinkText          = isset($attributes['feedbackLinkText']) ? $attributes['feedbackLinkText'] : __( 'If you would like to provide more details, please open a GitHub issue.', 'poe-feedback' );
$duplicateSubmissionNotice = isset($attributes['duplicateSubmissionNotice']) ? $attributes['duplicateSubmissionNotice'] : __( 'You have already provided feedback for this lesson.', 'poe-feedback' );
$thankYouMessage           = isset($attributes['thankYouMessage']) ? $attributes['thankYouMessage'] : __( 'Thank you, I appreciate you!', 'poe-feedback' );

echo '<div ' . get_block_wrapper_attributes() . ' id="poe-feedback-wrapper" data-post-id="' . esc_attr( $post_id ) . '">';

if ( ! isset( $_POST['poe_feedback_submitted'] ) ) {
	echo '<form action="" method="post" id="poe-feedback-form">';
	// Print the inner block heading and styles.
	foreach ( $block->inner_blocks as $inner_block ) {
		echo $inner_block->render();
	}
	echo '<p id="poe-feedback-notice">' . esc_html( $duplicateSubmissionNotice ) . '</p>';
	wp_nonce_field( 'poe_feedback_nonce', 'poe_feedback_nonce' );
	echo '<input type="hidden" name="poe_feedback_submitted" value="true" />';
	echo '<button id="poe_feedback_yes" name="poe_feedback_yes" value="true" data-post-id=' . esc_attr( $post_id ).' >' . $yes . '</button>';
	echo '<button id="poe_feedback_no" name="poe_feedback_no" value="true" data-post-id=' . esc_attr( $post_id ). '>' . $no . '</button>';
	echo '</form>';
}

if ( isset( $_POST['poe_feedback_submitted'] ) && 
	wp_verify_nonce( $_POST['poe_feedback_nonce'], 'poe_feedback_nonce' ) &&
	( isset( $_POST['poe_feedback_yes'] ) || isset( $_POST['poe_feedback_no'] ) )
) {
	echo '<h3 class="wp-block-heading poe-feedback-thank-you">' . esc_html( $thankYouMessage ) . '</h3>';
	echo sprintf(
		'<p>%1s<br><a href="%2s">%3s</a></p>',
		esc_html( $saveNotice ),
		esc_url ( $feedbackURL ),
		esc_html( $feedbackLinkText )
	);
	if ( isset( $_POST['poe_feedback_no'] ) ) {
		$current_value = get_post_meta( $post_id, 'poe_feedback_no', true );
		$value = $current_value + '1';
		update_post_meta( $post_id, 'poe_feedback_no', $value );
	}
	if ( isset( $_POST['poe_feedback_yes'] ) ) {
		$current_value = get_post_meta( $post_id, 'poe_feedback_yes', true );
		$value = $current_value + '1';
		update_post_meta( $post_id, 'poe_feedback_yes', $value );
	}
};
echo '</div>';
