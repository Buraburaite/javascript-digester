'use babel';

import OnceoverView from './onceover-view';
import { CompositeDisposable } from 'atom';

export default {

  onceoverView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.onceoverView = new OnceoverView(state.onceoverViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.onceoverView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'onceover:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.onceoverView.destroy();
  },

  serialize() {
    return {
      onceoverViewState: this.onceoverView.serialize()
    };
  },

  toggle() {
    console.log('Onceover was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
