export function calculateDepth(ext: string): number {
	let depth = 0;

	for(let i = 0; i < ext.length; i++) {
		if(ext[i] === '.') {
			depth += 1;
		}
	}

	return depth;
}
