'use babel';

import Pane from './pane/pane';
import { CompositeDisposable } from 'atom';

export default {

  pane: null,
  modalPanel: null,
  subscriptions: null,

  activate() {
    this.pane = new Pane();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace',
        {
          'pither:toggle': () => this.toggle()
        }
      ));
    },

    deactivate() {
      this.subscriptions.dispose();
      this.pane.destroy();
    },

    toggle() {
      console.log('Pither was toggled!');
    }
  };
