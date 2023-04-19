import { useState } from 'react'

export function useDisableEditNote() {
	const [isDisabled, setIsDisabled] = useState(true)

	function editNote(val?: boolean) {
		setIsDisabled((prev) => (typeof val === 'boolean' ? val : !prev))
	}

	return { isDisabled, editNote }
}
