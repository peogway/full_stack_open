interface ExerciseProp {
	name: string
	exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: ExerciseProp[] }) => {
	return (
		<div>
			{courseParts.map((course) => (
				<p key={course.name}>
					{course.name} {course.exerciseCount}
				</p>
			))}
		</div>
	)
}

export default Content

