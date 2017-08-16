'use babel';

import PitherView from './pither-view';
import { CompositeDisposable } from 'atom';

export default {

  pitherView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pitherView = new OnceoverView(state.pitherViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.pitherView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pither:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pitherView.destroy();
  },

  serialize() {
    return {
      pitherViewState: this.pitherView.serialize()
    };
  },

  toggle() {
    console.log('Pither was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
