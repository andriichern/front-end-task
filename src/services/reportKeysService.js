export function getReportKeysForHeader(data) {
	if (!data) {
		return;
	}

	let dataKeys = countKeys(data);

	return mapKeysToDisplay(dataKeys, data.length);
}

function countKeys(data) {
	let result = {};

	for (let i = 0; i < data.length; i++) {
		const currentItem = data[i];
		const entries = Object.entries(currentItem);

		for (let [key] of entries) {
			if (result[key]) {
				result[key] = result[key] + 1
			} else {
				result[key] = 1;
			}
		}
	}

	return result;
}

function mapKeysToDisplay(keys, dataLength) {
	const minUsageLimit = 20;
	let keyEntries = Object.entries(keys);

	for (let [key, value] of keyEntries) {
		const usage = (value / dataLength) * 100;

		if (usage < minUsageLimit) {
			keys[key] = false;
		} else {
			keys[key] = true;
		}
	}

	return keys;
}