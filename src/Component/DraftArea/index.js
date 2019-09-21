import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, convertFromRaw, convertToRaw, Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';

class DraftArea extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => { },
  }

  constructor(props) {
    super(props);
    const {
      value,
    } = props;
    let editorState = EditorState.createEmpty();
    if (value) {
      if (typeof (value) === 'string') {
        if (value !== '') {
          try { // check if the value is a POJO
            const parsed = JSON.parse(value);
            editorState = EditorState.createWithContent(convertFromRaw(parsed))
          } catch (error) { // If the value is pure text
            // console.log('error', error);
            editorState = EditorState.createWithContent(ContentState.createFromText(value));
          }
        }
      } else {
        editorState = EditorState.createWithContent(convertFromRaw(value))
      }
    }
    this.state = {
      editorState,
    };
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.readOnly !== prevProps.readOnly) {
      const { value } = this.props;
      let editorState = EditorState.createEmpty();
      if (value) {
        if (typeof (value) === 'string') {
          if (value !== '') {
            try { // check if the value is a POJO
              const parsed = JSON.parse(value);
              editorState = EditorState.createWithContent(convertFromRaw(parsed));
            } catch (error) { // If the value is pure text
              // console.log('error', error);
              editorState = EditorState.createWithContent(ContentState.createFromText(value));
            }
          }
        } else {
          editorState = EditorState.createWithContent(convertFromRaw(value))
        }
      }
      this.setState({
        editorState,
      });
    }
  }

  focus = () => this.editor.focus();

  onChange = (editorState) => {
    this.setState({ editorState }, () => {
      const {
        name
      } = this.props;
      const contentState = editorState.getCurrentContent();
      const value = JSON.stringify(convertToRaw(contentState));
      // console.log(value);
      this.props.onChange(value);
    });
  }
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  render() {
    const {
      readOnly,
    } = this.props;
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className={!readOnly ? 'RichEditor-root' : ''}>
        {!readOnly && (
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        )}
        {!readOnly && (
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        )}
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            ref={ref => this.editor = ref}
            spellCheck={true}
            readOnly={readOnly}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: 'roboto',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.label === 'Blockquote') {
      className += ' blockquotee';
    }
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle} style={{ fontWeight: 700 }}>
        {this.props.label === 'Blockquote' ? '' : <span dangerouslySetInnerHTML={{ __html: `<div>${this.props.label}</div>` }} />}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: '<i class="fa fa-list-ul" aria-hidden="true"></i>', style: 'unordered-list-item' },
  { label: '<i class="fa fa-list-ol" aria-hidden="true"></i>', style: 'ordered-list-item' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  { label: '<strong>B</strong>', style: 'BOLD' },
  { label: '<i>I</i>', style: 'ITALIC' },
  { label: '<u>U</u>', style: 'UNDERLINE' },
  // { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default DraftArea;