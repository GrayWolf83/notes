export function getDate(date: string): string {
	const noteTime = new Date(Number(date)).toLocaleTimeString()
	const noteDate = new Date(Number(date)).toLocaleDateString()

	if (noteDate === new Date().toLocaleDateString()) {
		return noteTime.slice(0, noteTime.length - 3)
	}

	return noteDate
}
