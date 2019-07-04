import React, { useState } from "react"
import ReactDOM from "react-dom"

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"

function TextEditor() {
	
	const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

	const onSave = (content) => {
		console.log("saving", content)
		sessionStorage.setItem("draftail:content", JSON.stringify(content))
	}

	return (
	  <DraftailEditor
	    rawContentState={initial || null}
	    onSave={onSave}
	    blockTypes={[
			{ type: BLOCK_TYPE.HEADER_ONE },
			{ type: BLOCK_TYPE.HEADER_TWO },
			{ type: BLOCK_TYPE.HEADER_THREE },
			{ type: BLOCK_TYPE.HEADER_FOUR },
			{ type: BLOCK_TYPE.HEADER_FIVE },
			{ type: BLOCK_TYPE.HEADER_SIX },
			{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
			{ type: BLOCK_TYPE.ORDERED_LIST_ITEM },
	    ]}
	    inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
	  />
	)
}

export default TextEditor;
