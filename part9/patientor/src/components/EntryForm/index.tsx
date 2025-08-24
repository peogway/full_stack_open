// import { useState } from 'react'
import patientService from '../../services/patients'
import { useState } from 'react'
import { Diagnosis, NewEntry } from '../../types'

import { Button, Select, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

interface propsForm {
	onClose: () => void
	diagnosis?: Diagnosis[]
	patientId: string
	setAddedEntry: React.Dispatch<React.SetStateAction<any | null>>
}

const EntryForm = ({
	onClose,
	diagnosis,
	patientId,
	setAddedEntry,
}: propsForm) => {
	const [showHealthCheck, setShowHealthCheck] = useState(false)
	const [showHospital, setShowHospital] = useState(false)
	const [showOccupationalHealthcare, setShowOccupationalHealthcare] =
		useState(false)

	const [errorMessage, setErrorMessage] = useState<string>('')

	return (
		<>
			{errorMessage && (
				<div
					style={{
						backgroundColor: '#ffe6e6',
						border: 'solid 1px red',
						borderRadius: '5px',
						padding: '10px',
						marginBottom: '10px',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<ReportGmailerrorredIcon sx={{ color: 'red', marginLeft: '20px' }} />
					<span>{errorMessage}</span>
				</div>
			)}
			<div
				style={
					showHealthCheck || showHospital || showOccupationalHealthcare
						? {
								border: 'solid 1px',
								borderRadius: '20px',
								padding: '20px',
								paddingBottom: '30px',
								marginBottom: '10px',
						  }
						: {}
				}
			>
				{!showHealthCheck && !showHospital && !showOccupationalHealthcare && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '1rem',
						}}
					>
						<Button
							onClick={() => {
								setShowHealthCheck((prev) => !prev)
							}}
							variant='contained'
							color='primary'
						>
							HEALTH CHECK ENTRY
						</Button>

						<Button
							onClick={() => {
								setShowHospital((prev) => !prev)
							}}
							variant='contained'
							color='primary'
						>
							HOSPITAL ENTRY
						</Button>

						<Button
							onClick={() => {
								setShowOccupationalHealthcare((prev) => !prev)
							}}
							variant='contained'
							color='primary'
						>
							OCCUPATIONAL HEALTHCARE ENTRY
						</Button>
					</div>
				)}
				{showHealthCheck && (
					<EntryFormElement
						onClose={onClose}
						diagnosis={diagnosis}
						text='New Health Check Entry'
						state='HealthCheck'
						patientId={patientId}
						setAddedEntry={setAddedEntry}
						setErrorMessage={setErrorMessage}
					/>
				)}
				{showHospital && (
					<EntryFormElement
						onClose={onClose}
						diagnosis={diagnosis}
						text='New Hospital Entry'
						state='Hospital'
						patientId={patientId}
						setAddedEntry={setAddedEntry}
						setErrorMessage={setErrorMessage}
					/>
				)}
				{showOccupationalHealthcare && (
					<EntryFormElement
						onClose={onClose}
						diagnosis={diagnosis}
						text='New Occupational Healthcare Entry'
						state='OccupationalHealthcare'
						patientId={patientId}
						setAddedEntry={setAddedEntry}
						setErrorMessage={setErrorMessage}
					/>
				)}
			</div>
		</>
	)
}

const ControlButton = ({
	onClose,
	handleAddEntry,
}: {
	onClose: () => void
	handleAddEntry: () => void
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				gap: '1rem',
			}}
		>
			<Button variant='contained' color='error' onClick={onClose}>
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
	)
}

const EntryFormElement = ({
	onClose,
	diagnosis,
	text,
	state,
	patientId,
	setAddedEntry,
	setErrorMessage,
}: {
	onClose: () => void
	diagnosis?: Diagnosis[]
	text: string
	state: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'
	patientId: string
	setAddedEntry: React.Dispatch<React.SetStateAction<any | null>>
	setErrorMessage: React.Dispatch<React.SetStateAction<any | null>>
}) => {
	const [description, setDescription] = useState<string>('')
	const [date, setDate] = useState<string>('')
	const [specialist, setSpecialist] = useState<string>('')
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
	const [selectedDiagnosis, setSelectedDiagnosis] = useState('')
	const [diagnosisToShow, setDiagnosisToShow] = useState<
		Diagnosis[] | undefined
	>(diagnosis?.sort((a, b) => a.code.localeCompare(b.code)))

	const [healthCheck, setHealthCheck] = useState<number | 'default'>('default')

	const [employerName, setEmployerName] = useState<string>('')
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('')
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('')

	const [dischargeDate, setDischargeDate] = useState<string>('')
	const [dischargeCriteria, setDischargeCriteria] = useState<string>('')

	const handleAddEntry = async () => {
		setErrorMessage('') // reset error message
		if (!description) {
			setErrorMessage('Description is required')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
			return
		}

		if (!date) {
			setErrorMessage('Date is required')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
			return
		}
		if (!specialist) {
			setErrorMessage('Specialist is required')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
			return
		}

		const baseEntry = {
			description,
			date,
			specialist,
			diagnosisCodes,
		}

		let entryToAdd: NewEntry

		if (state === 'HealthCheck') {
			if (healthCheck === 'default') {
				setErrorMessage('Health Check Rating is required')
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000)
				return
			}
			entryToAdd = {
				...baseEntry,
				type: 'HealthCheck',
				healthCheckRating: healthCheck,
			}
		} else if (state === 'Hospital') {
			if (!dischargeDate || !dischargeCriteria) {
				setErrorMessage('Discharge date and criteria are required')
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000)
				return
			}
			entryToAdd = {
				...baseEntry,
				type: 'Hospital',
				discharge: { date: dischargeDate, criteria: dischargeCriteria },
			}
		} else if (state === 'OccupationalHealthcare') {
			if (!employerName) {
				setErrorMessage('Employer name is required')
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000)
				return
			}
			entryToAdd = {
				...baseEntry,
				type: 'OccupationalHealthcare',
				employerName,
				sickLeave:
					sickLeaveStartDate && sickLeaveEndDate
						? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
						: undefined,
			}
		}

		const addedEntry = await patientService.addEntry(patientId, entryToAdd!)

		if (addedEntry) {
			setAddedEntry(addedEntry)
		}
		onClose()
	}

	return (
		<div>
			<h2>{text}</h2>

			{/* Description */}
			<div style={{ marginBottom: '10px' }}>
				<label
					htmlFor='description'
					style={{ fontWeight: 'bold', opacity: 0.7 }}
				>
					Description
				</label>
				<br />
				<input
					style={{
						outline: 'none',
						boxShadow: 'none',
						border: 'none',
						width: '100%',
						height: '30px',
						borderBottom: '1px solid rgba(0,0,0,0.3)',
						marginLeft: '5px',
					}}
					placeholder='Enter some description'
					type='text'
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			{/* Date */}
			<div style={{ marginBottom: '10px' }}>
				<label htmlFor='date' style={{ fontWeight: 'bold', opacity: 0.7 }}>
					Date
				</label>
				<br />
				<input
					style={{
						outline: 'none',
						boxShadow: 'none',
						border: 'none',
						width: '100%',
						height: '30px',
						borderBottom: '1px solid rgba(0,0,0,0.3)',
						marginLeft: '5px',
					}}
					type='date'
					name='date'
					value={date}
					onChange={(e) => {
						const val = e.target.value
						if (val === '' || /^\d{4}-\d{2}-\d{2}$/.test(val)) {
							setDate(val)
						}
					}}
				/>
			</div>

			{/* Specialist */}
			<div style={{ marginBottom: '10px' }}>
				<label
					htmlFor='specialist'
					style={{ fontWeight: 'bold', opacity: 0.7 }}
				>
					Specialist
				</label>
				<br />
				<input
					style={{
						outline: 'none',
						boxShadow: 'none',
						border: 'none',
						width: '100%',
						height: '30px',
						borderBottom: '1px solid rgba(0,0,0,0.3)',
						marginLeft: '5px',
					}}
					type='text'
					placeholder='Enter the specialist name'
					name='specialist'
					value={specialist}
					onChange={(e) => setSpecialist(e.target.value)}
				/>
			</div>

			{/* Diagnosis Codes */}
			<div style={{ marginBottom: '10px' }}>
				<label
					htmlFor='diagnosisCodes'
					style={{ fontWeight: 'bold', opacity: 0.7 }}
				>
					Diagnosis Codes
				</label>

				<div style={{ display: 'flex', gap: '10px', marginLeft: '5px' }}>
					{diagnosisCodes.map((code) => (
						<span
							key={code}
							style={{
								backgroundColor: 'lightgrey',
								borderRadius: '5px',
								padding: '2px 5px',
								border: '1px solid darkgrey',
							}}
						>
							{code}{' '}
							<CloseIcon
								style={{
									fontSize: '16px',
									verticalAlign: 'middle',
									cursor: 'pointer',
									marginLeft: '5px',
									transform: 'translateY(-2px)',
								}}
								onClick={() => {
									const newCodes = diagnosisCodes.filter((c) => c !== code)
									setDiagnosisCodes(newCodes)

									setDiagnosisToShow(
										diagnosis
											?.filter((d) => !newCodes.includes(d.code))
											.sort((a, b) => a.code.localeCompare(b.code))
									)
								}}
							/>
						</span>
					))}
				</div>

				<select
					style={{
						marginLeft: '5px',
						outline: 'none',
						boxShadow: 'none',
						border: 'none',
						width: '100%',
						height: '30px',
						borderBottom: '1px solid rgba(0,0,0,0.3)',
						fontFamily: 'monospace',
					}}
					name='diagnosisCodes'
					onChange={(e) => {
						const code = e.target.value
						if (code) {
							setDiagnosisCodes([...diagnosisCodes, code])
							setDiagnosisToShow(
								diagnosisToShow?.filter((diag) => diag.code !== code)
							)

							setSelectedDiagnosis('') // reset select
						}
					}}
					value={selectedDiagnosis}
				>
					<option value='' disabled>
						Select a diagnosis
					</option>
					{diagnosisToShow?.map((diag) => (
						<option key={diag.code} value={diag.code}>
							{diag.code} {'\u00A0'.repeat(8 - diag.code.length)} {diag.name}
						</option>
					))}
				</select>
				<br />
			</div>

			{/* Health Check Rating */}
			{state === 'HealthCheck' && (
				<div style={{ marginBottom: '10px' }}>
					<label
						htmlFor='healthCheck'
						style={{ fontWeight: 'bold', opacity: 0.7 }}
					>
						Health Check Rating (0-3)
					</label>
					<br />
					<Select
						labelId='healthCheck-label'
						value={healthCheck}
						onChange={(e) => setHealthCheck(Number(e.target.value))}
						sx={{
							height: '30px',
							borderBottom: '1px solid rgba(0,0,0,0.3)',
							marginLeft: '5px',
						}}
					>
						<MenuItem value='default' disabled>
							Select a rating
						</MenuItem>
						<MenuItem value={0}>
							0
							<FavoriteIcon
								fontSize='small'
								sx={{ mx: 1, verticalAlign: 'middle', color: 'green' }}
							/>
							Healthy
						</MenuItem>
						<MenuItem value={1}>
							1
							<FavoriteIcon
								fontSize='small'
								sx={{ mx: 1, verticalAlign: 'middle', color: 'yellow' }}
							/>
							Low Risk
						</MenuItem>
						<MenuItem value={2}>
							2
							<FavoriteIcon
								fontSize='small'
								sx={{ mx: 1, verticalAlign: 'middle', color: 'red' }}
							/>
							High Risk
						</MenuItem>
						<MenuItem value={3}>
							3
							<FavoriteIcon
								fontSize='small'
								sx={{ mx: 1, verticalAlign: 'middle' }}
							/>
							Critical Risk
						</MenuItem>
					</Select>
				</div>
			)}

			{/* Hospital */}
			{state == 'Hospital' && (
				<>
					{/* Discharge Date */}
					<div style={{ marginBottom: '10px' }}>
						<label
							htmlFor='dischargeDate'
							style={{ fontWeight: 'bold', opacity: 0.7 }}
						>
							Discharge Date
						</label>
						<br />
						<input
							style={{
								outline: 'none',
								boxShadow: 'none',
								border: 'none',
								width: '100%',
								height: '30px',
								borderBottom: '1px solid rgba(0,0,0,0.3)',
								marginLeft: '5px',
							}}
							type='date'
							name='dischargeDate'
							value={dischargeDate}
							onChange={(e) => setDischargeDate(e.target.value)}
						/>
					</div>

					{/* Discharge Criteria */}
					<div style={{ marginBottom: '10px' }}>
						<label
							htmlFor='dischargeCriteria'
							style={{ fontWeight: 'bold', opacity: 0.7 }}
						>
							Discharge Criteria
						</label>
						<br />
						<input
							style={{
								outline: 'none',
								boxShadow: 'none',
								border: 'none',
								width: '100%',
								height: '30px',
								borderBottom: '1px solid rgba(0,0,0,0.3)',
								marginLeft: '5px',
							}}
							placeholder='Enter discharge criteria'
							type='text'
							name='dischargeCriteria'
							value={dischargeCriteria}
							onChange={(e) => setDischargeCriteria(e.target.value)}
						/>
					</div>
				</>
			)}

			{/* Employer name and sick leave dates */}
			{state == 'OccupationalHealthcare' && (
				<>
					{/* Employer Name */}
					<div style={{ marginBottom: '10px' }}>
						<label
							htmlFor='employerName'
							style={{ fontWeight: 'bold', opacity: 0.7 }}
						>
							Employer Name
						</label>
						<br />
						<input
							style={{
								outline: 'none',
								boxShadow: 'none',
								border: 'none',
								width: '100%',
								height: '30px',
								borderBottom: '1px solid rgba(0,0,0,0.3)',
								marginLeft: '5px',
							}}
							placeholder='Enter employer name'
							type='text'
							name='employerName'
							value={employerName}
							onChange={(e) => setEmployerName(e.target.value)}
						/>
					</div>

					{/* Sick Leave */}
					<h3>Sick Leave</h3>

					{/* Start Date */}
					<div style={{ marginBottom: '10px' }}>
						<label
							htmlFor='sickLeaveStartDate'
							style={{ fontWeight: 'bold', opacity: 0.7 }}
						>
							Start Date
						</label>
						<input
							style={{
								outline: 'none',
								boxShadow: 'none',
								border: 'none',
								width: '100%',
								height: '30px',
								borderBottom: '1px solid rgba(0,0,0,0.3)',
								marginLeft: '5px',
							}}
							type='date'
							name='sickLeaveStartDate'
							value={sickLeaveStartDate}
							onChange={(e) => {
								setSickLeaveStartDate(e.target.value)
								if (
									sickLeaveEndDate !== '' &&
									e.target.value > sickLeaveEndDate
								) {
									setSickLeaveStartDate('')
								}
							}}
							max={sickLeaveEndDate}
						/>
					</div>

					{/* End Date */}
					<div style={{ marginBottom: '10px' }}>
						<label
							htmlFor='sickLeaveEndDate'
							style={{ fontWeight: 'bold', opacity: 0.7 }}
						>
							End Date
						</label>
						<input
							style={{
								outline: 'none',
								boxShadow: 'none',
								border: 'none',
								width: '100%',
								height: '30px',
								borderBottom: '1px solid rgba(0,0,0,0.3)',
								marginLeft: '5px',
							}}
							type='date'
							name='sickLeaveEndDate'
							value={sickLeaveEndDate}
							onChange={(e) => {
								setSickLeaveEndDate(e.target.value)
								if (
									sickLeaveStartDate !== '' &&
									e.target.value < sickLeaveStartDate &&
									e.target.value.split('-')[0] >= '1000'
								) {
									setSickLeaveEndDate('')
								}
							}}
							min={sickLeaveStartDate}
						/>
					</div>
				</>
			)}

			<br />

			<ControlButton
				onClose={() => onClose()}
				handleAddEntry={handleAddEntry}
			/>
		</div>
	)
}

export default EntryForm

