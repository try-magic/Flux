/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var cx = require('react/lib/cx');

var TodoSubItem = React.createClass({

  propTypes: {
   subTodo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditingSub: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
      console.dir(this.props)
    var subTodo = this.props.todo;

console.log(subTodo);
    var input;
    if (this.state.isEditingSub) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={subTodo.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': subTodo.complete,
          'editing': this.state.isEditingSub
        })}
        key={subTodo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={subTodo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {subTodo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function() {
    this.setState({isEditingSub: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoActions.updateSubText(this.props.todo.id, text);
    this.setState({isEditingSub: false});
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoSubItem;
