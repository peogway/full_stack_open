// import { useState } from 'react'
// import patientService from '../../services/patients'
import { Button } from '@mui/material'
interface propsForm {
	onclose: () => void
}

const EntryForm = ({ onclose }: propsForm) => {
	const handleAddEntry = () => {
		onclose()
	}
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '1rem',
				}}
			>
				<Button variant='contained' color='error' onClick={() => onclose()}>
					CANCEL
				</Button>
				<Button
					variant='contained'
					sx={{
						backgroundColor: 'grey',
						'&:hover': { backgroundColor: 'darkgrey' },
					}}
					onClick={handleAddEntry}
				>
					ADD
				</Button>
			</div>
		</div>
	)
}

export default EntryForm

