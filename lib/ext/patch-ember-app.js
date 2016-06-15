/**
 * Monkeypatches the EmberApp instance from Ember CLI to contain the hooks we
 * need to filter environment-specific initializers. Hopefully we can upstream
 * similar hooks to Ember CLI and eventually remove these patches.
 */
function patchEmberApp(emberApp) {
  // App was already patched
  if (emberApp.addonPreconcatTree) { return; }

  // Save off original implementation of the `concatFiles` hook
  var originalConcatFiles = emberApp._concatFiles;

  // Install method to invoke `preconcatTree` hook on each addon
  emberApp.addonPreconcatTree = addonPreconcatTree;

  // Install patched `concatFiles` method. This checks options passed to it
  // and, if it detects that it's a concat for the app tree, invokes our
  // preconcat hook. Afterwards, we invoke the original implementation to
  // return a tree concating the files.
  emberApp._concatFiles = function(tree, options) {
    if (options.annotation === 'Concat: App') {
      tree = this.addonPreconcatTree(tree);
    }
    return originalConcatFiles.call(this, tree, options);
  };
}

function addonPreconcatTree(tree) {
  var workingTree = tree;

  this.project.addons.forEach(function(addon) {
    if (addon.preconcatTree) {
      workingTree = addon.preconcatTree(workingTree);
    }
  });

  return workingTree;
}

module.exports = patchEmberApp;
