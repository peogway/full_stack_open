interface CoursePartBase {
	name: string
	exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
	description: string
}

interface CoursePartBasic extends CoursePartWithDescription {
	kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number
	kind: 'group'
}

interface CoursePartBackground extends CoursePartWithDescription {
	backgroundMaterial: string
	kind: 'background'
}

interface CoursePartSpecial extends CoursePartWithDescription {
	kind: 'special'
	requirements: string[]
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial

