<?php
/**
 * Plugin Name:       Poe Feedback
 * Description:       A basic plugin that asks readers to leave feedback.
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Carolina Nymark
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       poe-feedback
 *
 * @package           poe-feedback
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function poe_feedback_block_init() {
	register_block_type( __DIR__ . '/build/poe-feedback' );
}
add_action( 'init', 'poe_feedback_block_init' );

/**
 * Register the panel in the block editor.
 */
function poe_feedback_panel() {
	wp_enqueue_script(
		'poe-feedback-panel',
		plugins_url( '/src/panel/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-plugins', 'wp-edit-post' ),
		false,
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'poe_feedback_panel' );

/**
 * Registers post meta for the voting.
 * Adds the post meta to the post list interface.
 * to do: register this on plugin activation.
 */
function poe_feedback_register_post_meta() {
	register_post_meta(
		'',
		'poe_feedback_yes',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'integer',
			'default'      => 0,
		)
	);
	register_post_meta(
		'',
		'poe_feedback_no',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'integer',
			'default'      => 0,
		)
	);

	add_filter(
		'manage_posts_columns',
		function( $columns ) {
			$columns['poe_feedback_yes'] = __( 'Positive', 'poe-feedback' );
			$columns['poe_feedback_no']  = __( 'Negative', 'poe-feedback' );
			return $columns;
		}
	);

	add_action(
		'manage_posts_custom_column',
		function( $column_name, $post_id ) {
			if ( 'poe_feedback_yes' === $column_name ) {
				echo get_post_meta( $post_id, 'poe_feedback_yes', true );
			}
			if ( 'poe_feedback_no' === $column_name ) {
				echo get_post_meta( $post_id, 'poe_feedback_no', true );
			}
		},
		10,
		2
	);
}
add_action( 'init', 'poe_feedback_register_post_meta' );
