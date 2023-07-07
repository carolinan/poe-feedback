
( function( wp ) {
	const registerPlugin = wp.plugins.registerPlugin;
	const PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
	const el = wp.element.createElement;
	const useSelect = wp.data.useSelect;
	const Text = wp.components.TextControl;

	const PoeMetaPositive = function() {
		const metaFieldValueYes = useSelect( function( select ) {
			return select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)[ 'poe_feedback_yes' ];
		}, [] );

		return el( Text, {
			label: 'Positive Feedback',
			value: metaFieldValueYes,
		} );
	};

	const PoeMetaNegative = function() {
		const metaFieldValueNo = useSelect( function( select ) {
			return select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)[ 'poe_feedback_no' ];
		}, [] );

		return el( Text, {
			label: 'Negative Feedback',
			value: metaFieldValueNo,
		} );
	};

	registerPlugin( 'poe-feedback-panel', {
		render: function() {
			return el(
				PluginDocumentSettingPanel,
				{
					name: 'poe-feedback-panel',
					title: 'Poe Feedback',
				},
				el(
					'div',
					{ className: 'poe-feedback-panel-positive' },
					el( PoeMetaPositive )
				),
				el(
					'div',
					{ className: 'poe-feedback-panel-negative' },
					el( PoeMetaNegative )
				)
			);
		},
	} );
} )( window.wp );
