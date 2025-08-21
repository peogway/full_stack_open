import { CoursePart } from '../Types'

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case 'basic':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>{coursePart.description}</p>
				</div>
			)
		case 'group':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>project exercises {coursePart.groupProjectCount}</p>
				</div>
			)
		case 'background':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>{coursePart.description}</p>
					<p>
						<span>submit to </span>
						<a href={coursePart.backgroundMaterial}>
							{coursePart.backgroundMaterial}
						</a>
					</p>
				</div>
			)
		case 'special':
			return (
				<div>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>{coursePart.description}</p>
					<p>required skills: {coursePart.requirements.join(', ')}</p>
				</div>
			)
	}
}

export default Part

