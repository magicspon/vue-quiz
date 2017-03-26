export function insertAtIndex(item, index, array) {
	return [...array.slice(0, index), item, ...array.slice(index + 1, array.length)]
}