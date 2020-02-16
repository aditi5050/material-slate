import React, { useState } from 'react'
import { initialValue } from 'comp/data'
import UEditor from '@unicef/material-ui-texteditor'
import { Box } from '@material-ui/core'

function App() {
  const [value, setValue] = useState(initialValue)

  const [footnotes, setFootnotes] = useState([])
  const [comments, setComments] = useState([])

  // Toolbar Buttons
  const toolbarButtons = [
    { type: 'Mark', format: 'bold' },
    { type: 'Mark', format: 'italic' },
    { type: 'Comment', format: 'comment' },
    { type: 'Footnote', format: 'footnote' },
  ]

  //On change of value
  function handleChangeValue(value) {
    setValue(value)
  }

  //On change of comments
  function handleChangeComment(value) {
    const comment = value.comment
    if (value.type === 'add') {
      setComments([...comments, comment])
    } else if (value.type === 'update') {
      let updatedComments = comments.map(element => {
        if (element.id === comment.id) {
          element.commentText = value.commentText
        }
        return element
      })
      setComments(updatedComments)
    } else {
      let updatedComments = comments.filter(element => {
        return element.id === comment.id
      })
      setComments(updatedComments)
    }
  }

  // On change of footnotes
  function handleChangeFootnote(value) {
    let updatedList = []

    // update footnote
    if (value.type === 'update') {
      let footnote = value.footnote
      updatedList = footnotes.map(element => {
        if (element.id === footnote.id) {
          element.footnoteText = value.footnoteText
        }
        return element
      })
    } else {
      // add and remove with order
      const list = value.footnoteList
      updatedList = list.map((footnote, index) => {
        const footnoteWithNumber = {
          ...footnote[0],
          number: index + 1,
        }
        return footnoteWithNumber
      })
    }

    setFootnotes(updatedList)
  }

  return (
    <Box mt={5}>
      <UEditor
        editorId={1}
        value={value}
        toolbar
        // hoveringToolbar={false}
        comments={comments}
        footnotes={footnotes}
        onChangeValue={handleChangeValue}
        toolbarButtons={toolbarButtons}
        onChangeComment={handleChangeComment}
        onChangeFootnote={handleChangeFootnote}
        parentRenderElement={props => Element(props)}
        parentRenderLeaf={props => Leaf(props)}
      />
    </Box>
  )
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-blue':
      return (
        <p {...attributes} style={{ backgroundColor: 'blue' }}>
          {children}
        </p>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  switch (leaf.type) {
    case 'blue':
      return (
        <span {...attributes} style={{ backgroundColor: 'blue' }}>
          {children}
        </span>
      )
    default:
      return <span {...attributes}>{children}</span>
  }
}

export default App
