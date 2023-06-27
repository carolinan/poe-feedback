
( function ( wp ) {
	var registerPlugin = wp.plugins.registerPlugin;
	var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
	var el = wp.element.createElement;
	var useSelect = wp.data.useSelect;
	var Text = wp.components.TextControl;

	var PoeMetaPositive = function () {
		var metaFieldValueYes = useSelect( function ( select ) {
			return select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)[ 'poe_feedback_yes' ];
		}, [] );

		return el( Text, {
			label: 'Positive Feedback',
			value: metaFieldValueYes,
		} );
	};

	var PoeMetaNegative = function () {
		var metaFieldValueNo = useSelect( function ( select ) {
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
		render: function () {
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
