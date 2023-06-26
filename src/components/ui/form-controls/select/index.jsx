import React, { useState } from 'react'
import Select from 'react-select'

const dataOpts = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]
const isMulti = true
const XSelect = () => {
	const [currentItems, setCurrentItems] = useState(['vanilla', 'strawberry'])
	const getValue = () => {
		if (currentItems) {
			return isMulti
				? dataOpts.filter(el => currentItems.indexOf(el.value) >= 0)
				: dataOpts.find(el => el.value === currentItems)
		} else {
			return isMulti ? [] : ''
		}
		// return currentItems ? items.find(it => it.value === currentItems) : ''
	}
	const onChange = newElement => {
		setCurrentItems(isMulti ? newElement.map(el => el.value) : newElement.value)
	}
	return (
		<>
			<Select
				onChange={onChange}
				value={getValue()}
				options={dataOpts}
				isMulti={isMulti}
				className='xselect-container'
				classNamePrefix='xselect'
			/>
		</>
	)
}

export default XSelect
