import React, { useState, useEffect } from "react"
import Button from '@/components/Button';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML  } from 'draft-convert';
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { InputText, Label, FormGroup, ErrorMessage } from '@/components/forms';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

function TextEditor(props) {

	const init = {
		judul: ''
	}

	const { clickHandler } = props;
	const [ form, setForm ] = useState(init);
	const [ errors, setErrors ] = useState({});
	const [ content, setContent ] = useState(JSON.parse(sessionStorage.getItem("draftail:content")));
	
	const exporterConfig = {
	  blockToHTML: (block) => {
	    if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
	      return <blockquote />
	    }

	    // Discard atomic blocks, as they get converted based on their entity.
	    if (block.type === BLOCK_TYPE.ATOMIC) {
	      return {
	        start: "",
	        end: "",
	      }
	    }

	    return null
	  },

	  entityToHTML: (entity, originalText) => {
	    if (entity.type === ENTITY_TYPE.LINK) {
	      return <a href={entity.data.url}>{originalText}</a>
	    }

	    if (entity.type === ENTITY_TYPE.IMAGE) {
	      return <img src={entity.data.src} alt={entity.data.alt} />
	    }

	    if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
	      return <hr />
	    }

	    return originalText
	  },
	}


	const toHTML = (raw) => raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : ""

	function changeHandler(e) {
		e.persist();
		setForm(f => ({ ...f, [e.target.name]: e.target.value }) );
	}

	const onSave = (c) => {
		setContent(c);
		sessionStorage.setItem("draftail:content", JSON.stringify(c))
	}

	function submitHandler(e) {
		e.preventDefault();
		const isi = toHTML(content);
		const f = { ...form, isi };
		axios.post(generateUrl('berita'), f)
			.then(res => {
				Swal.fire(
				  'Berhasil!',
				  'Data berhasil diinput!',
				  'success'
				);
				sessionStorage.setItem("draftail:content", null);
				props.history.push('/a/berita');
			}).catch(err => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	}

	return (
		<form onSubmit={ submitHandler }>
		  <FormGroup>
		  	<Label>Judul</Label>
		  	<InputText value={ form.judul } name='judul' onChange={ changeHandler } />
		  	<ErrorMessage>{ errors.judul && errors.judul[0]  }</ErrorMessage>
		  </FormGroup>
		  <FormGroup>
		  	<Label>Isi</Label>
			  <DraftailEditor
			    rawContentState={content || null}
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
			  <ErrorMessage>{ errors.isi && errors.isi[0]  }</ErrorMessage>
		  </FormGroup>
		  <FormGroup align='right'>
			  <Button text='Submit' type='submit' />
		  </FormGroup>
		</form>
	)
}

export default withRouter(TextEditor);
