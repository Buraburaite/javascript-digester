'use babel';

import Onceover from '../lib/onceover';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Onceover', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('onceover');
  });

  describe('when the onceover:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.onceover')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'onceover:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.onceover')).toExist();

        let onceoverElement = workspaceElement.querySelector('.onceover');
        expect(onceoverElement).toExist();

        let onceoverPanel = atom.workspace.panelForItem(onceoverElement);
        expect(onceoverPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'onceover:toggle');
        expect(onceoverPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.onceover')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'onceover:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let onceoverElement = workspaceElement.querySelector('.onceover');
        expect(onceoverElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'onceover:toggle');
        expect(onceoverElement).not.toBeVisible();
      });
    });
  });
});
