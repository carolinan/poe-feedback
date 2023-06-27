/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/poe-feedback/script.js ***!
  \************************************/
window.addEventListener('load', () => {
  let poe_feedback_postid = document.querySelector('#poe-feedback-wrapper');
  poe_feedback_postid = poe_feedback_postid.getAttribute('data-post-id');
  const poe_feedback_yes = document.querySelector('#poe_feedback_yes');
  if (poe_feedback_yes) {
    poe_feedback_yes.addEventListener('click', storeEvent);
  }
  const poe_feedback_no = document.querySelector('#poe_feedback_no');
  if (poe_feedback_no) {
    poe_feedback_no.addEventListener('click', storeEvent);
  }
  const stored = localStorage.getItem('poe-feedback-store' + poe_feedback_postid);
  if (stored && stored === poe_feedback_postid) {
    if (poe_feedback_yes) {
      poe_feedback_yes.setAttribute("hidden", true);
      poe_feedback_yes.setAttribute("disabled", true);
    }
    if (poe_feedback_no) {
      poe_feedback_no.setAttribute("hidden", true);
      poe_feedback_yes.setAttribute("disabled", true);
    }
    const poe_feedback_notice = document.querySelector('#poe-feedback-notice');
    if (poe_feedback_notice) {
      poe_feedback_notice.style.display = 'block';
    }
  }
  function storeEvent(event) {
    localStorage.setItem('poe-feedback-store' + poe_feedback_postid, poe_feedback_postid);
  }
});
/******/ })()
;
//# sourceMappingURL=script.js.map