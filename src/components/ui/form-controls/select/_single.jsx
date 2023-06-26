import React, { useState } from 'react'
import Select from 'react-select'

const items = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]

const XSelect = () => {
	const [currentItem, setCurrentItem] = useState('vanilla')
	const getValue = () => {
		return currentItem ? items.find(it => it.value === currentItem) : ''
	}
	const onChange = newValue => {
		setCurrentItem(newValue.value)
	}
	return (
		<>
			<Select
				onChange={onChange}
				value={getValue()}
				options={items}
				className='xselect-container'
				classNamePrefix='xselect'
			/>
		</>
	)
}

export default XSelect
