import { CoursePart } from '../Types'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<div>
			{courseParts.map((course) => (
				<Part key={course.name} coursePart={course} />
			))}
		</div>
	)
}

export default Content

