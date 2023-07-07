window.addEventListener( 'load', () => {
	const poeFeedbackWrapper = document.querySelector( '#poe-feedback-wrapper' );
	const poeFeedbackPostid = poeFeedbackWrapper.getAttribute( 'data-post-id' );

	const poeFeedbackYes = document.querySelector( '#poe-feedback-yes' );
	if ( poeFeedbackYes ) {
		poeFeedbackYes.addEventListener( 'click', storeEvent );
	}

	const poeFeedbackNo = document.querySelector( '#poe-feedback-no' );
	if ( poeFeedbackNo ) {
		poeFeedbackNo.addEventListener( 'click', storeEvent );
	}

	const stored = localStorage.getItem( 'poe-feedback-store' + poeFeedbackPostid );
	if ( stored && stored === poeFeedbackPostid ) {
		if ( poeFeedbackYes || poeFeedbackNo ) {
			poeFeedbackWrapper.setAttribute( 'hidden', true );
		}

		if ( stored && stored === poeFeedbackPostid ) {
			if ( poeFeedbackYes ) {
				poeFeedbackYes.setAttribute( 'hidden', true );
				poeFeedbackYes.setAttribute( 'disabled', true );
			}
			if ( poeFeedbackNo ) {
				poeFeedbackNo.setAttribute( 'hidden', true );
				poeFeedbackNo.setAttribute( 'disabled', true );
			}
			const poeFeedbackNotice = document.querySelector( '#poe-feedback-notice' );
			if ( poeFeedbackNotice ) {
				poeFeedbackNotice.style.display = 'block';
			}
		}
	}

	function storeEvent( event ) {
		localStorage.setItem( 'poe-feedback-store' + poeFeedbackPostid, poeFeedbackPostid );
	}
} );
