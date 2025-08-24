import {
	HospitalEntry,
	HealthCheckEntry,
	OccupationalHealthcareEntry,
	Entry,
	HealthCheckRating,
} from '../../types'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import WorkIcon from '@mui/icons-material/Work'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'

// interface EntryProps {
// 	entry: Entry
// 	// diagnosis: Diagnosis[] | null
// }
// const findDiagnoseName = (diagnosis: Diagnosis[] | null, code: string) => {
// 	return diagnosis?.find((diag) => diag.code === code)?.name || null
// }
const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
	return (
		<div
			style={{
				border: 'solid 1px',
				borderRadius: '5px',
				padding: '1px',
				marginBottom: '10px',
				paddingLeft: '20px',
				paddingRight: '20px',
			}}
		>
			<h4>Hospital Entry</h4>
			<p>
				{entry.date}{' '}
				<MedicationLiquidIcon style={{ transform: 'translateY(5px)' }} />
			</p>
			<p>{entry.description}</p>
			{entry.discharge.criteria && (
				<p>
					<SubdirectoryArrowRightIcon
						style={{ transform: 'translateY(5px)' }}
					/>
					{entry.discharge.criteria}
				</p>
			)}
			<p>diagnose by {entry.specialist}</p>
		</div>
	)
}

const OccupationalHealthcareEntryDetails = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry
}) => {
	return (
		<div
			style={{
				border: 'solid 1px',
				borderRadius: '5px',
				padding: '1px',
				marginBottom: '10px',
				paddingLeft: '20px',
				paddingRight: '20px',
			}}
		>
			<h4>Occupational Healthcare Entry</h4>
			<p>
				{entry.date} <WorkIcon style={{ transform: 'translateY(5px)' }} />{' '}
				{entry.employerName}
			</p>
			<p>{entry.description}</p>
			<p>diagnose by {entry.specialist}</p>
		</div>
	)
}

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<div
			style={{
				border: 'solid 1px',
				borderRadius: '5px',
				padding: '1px',
				marginBottom: '10px',
				paddingLeft: '20px',
				paddingRight: '20px',
			}}
		>
			<h4>Health Check Entry</h4>
			<p>
				{entry.date}{' '}
				<MedicalServicesIcon style={{ transform: 'translateY(5px)' }} />
			</p>
			<p>{entry.description}</p>
			<FavoriteIcon
				style={{
					color:
						entry.healthCheckRating === 0
							? 'green'
							: entry.healthCheckRating === 1
							? 'yellow'
							: entry.healthCheckRating === 2
							? 'red'
							: 'black',
					transform: 'translateY(5px)',
				}}
			/>{' '}
			{HealthCheckRating[entry.healthCheckRating]}
			<p>diagnose by {entry.specialist}</p>
		</div>
	)
}

const EntryDetail = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case 'HealthCheck':
			return <HealthCheckEntryDetails entry={entry} />
		case 'Hospital':
			return <HospitalEntryDetails entry={entry} />
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntryDetails entry={entry} />
		default:
			return null
	}
}

export default EntryDetail

