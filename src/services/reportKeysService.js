import { getDataType } from '../utils/dataTypes';

export function getReportKeysAndTypes(data) {
	if (!data) {
		return;
	}

	let [dataKeys, dataTypes] = countKeys(data);
	dataKeys = mapKeysToDisplayAndType(dataKeys, data.length);
	return [dataKeys, dataTypes];
}

function countKeys(data) {
	let keysCount = {};
	let keysType = {};

	for (let i = 0; i < data.length; i++) {
		const currentItem = data[i];
		const entries = Object.entries(currentItem);

		for (let [key, value] of entries) {
			if (keysCount[key]) {
				keysCount[key] = keysCount[key] + 1
			} else {
				keysCount[key] = 1;
			}

			if (!keysType[key]) {
				keysType[key] = getDataType(value);
			}
		}
	}

	return [keysCount, keysType];
}

function mapKeysToDisplayAndType(keys, dataLength) {
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
