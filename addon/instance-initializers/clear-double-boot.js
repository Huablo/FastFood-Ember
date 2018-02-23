// When using `ember serve` when fastboot addon is installed the application
// output will already be rendered to the DOM when the actual JavaScript
// loads. Ember does not automatically clear its `rootElement` so this
// leads to the "double" applications being visible at once (only the
// "bottom" one is running via JS and is interactive).
//
// This removes any pre-rendered ember-view elements, so that the booting
// application will replace the pre-rendered output
//
const START = 'fastboot-body-start';
const END = 'fastboot-body-end';
export function clearHtml() {
  let current = document.getElementById(START);
  if (current) {
    let endMarker = document.getElementById(END);
    let parent = current.parentElement;
    let nextNode;
    do {
      nextNode = current.nextElementSibling;
      if (
        current.classList.contains('ember-view')
        || current.id === START
        || current.id === END
      ) {
        parent.removeChild(current);
      }
      current = nextNode;
    } while (nextNode && nextNode !== endMarker);
    parent.removeChild(endMarker);
  }
}
export default {
  name: "clear-double-boot",

  initialize(instance) {
    if (typeof FastBoot === 'undefined') {
      var originalDidCreateRootView = instance.didCreateRootView;

      instance.didCreateRootView = function() {
        clearHtml();
        originalDidCreateRootView.apply(instance, arguments);
      };
    }
  }
}
