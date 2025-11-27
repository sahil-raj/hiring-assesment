export const roundOff = (number: number, decimalPlaces: number) => {
	return Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
};

export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sleep = (seconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getRandomItemFromArray = <T>(array: T[]) => {
	return array[getRandomNumber(0, array.length - 1)];
};

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

export const openLinkInNewTab = (url: string) => {
	window.open(url, '_blank');
};

export const max = (a: number, b: number) => {
	return a > b ? a : b;
};

export const min = (a: number, b: number) => {
	return a < b ? a : b;
};

export const randomId = () => Math.floor(Math.random() * 1000000000);

export const getRandomColor = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const slugify = (text: string) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const parseMessage = (message: string) => {
	if (!message) return '';
	if (!message.includes('_')) {
		return message.charAt(0).toUpperCase() + message.slice(1).toLowerCase();
	}
	const parsedMessage = message
		?.split('_')
		?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		?.join(' ');
	return parsedMessage;
};

export const getInitials = (name: string) => {
	return name
		?.split(' ')
		?.map((word) => word.charAt(0).toUpperCase())
		?.join('');
};

export const deepTrim = (obj: unknown): unknown => {
	if (typeof obj === 'string') {
		return obj.trim();
	} else if (Array.isArray(obj)) {
		return obj.map(deepTrim);
	} else if (typeof obj === 'object' && obj !== null) {
		return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepTrim(value)]));
	}
	return obj;
};

export const linkify = (input: string) => {
	const combinedRegex =
		/(\bhttps?:\/\/[^\s<\]]+|\bwww\.[^\s<\]]+|\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b[a-zA-Z0-9-]+\.(com|net|org|co\.in|in|io|dev|ai|app|me|xyz|info|edu|gov|us|uk)\b)/gi;

	return input.replace(combinedRegex, (match) => {
		if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(match)) {
			return `<a href="mailto:${match}" class="text-blue-500 underline">${match}</a>`;
		}

		if (/^https?:\/\//.test(match)) {
			return `<a href="${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
		}

		if (/^www\./.test(match)) {
			return `<a href="http://${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
		}

		return `<a href="http://${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
	});
};
