import { FileExtension, FileContentType } from '@/types/files';

export const fileExtensions = new Map<FileExtension, FileContentType>([
	['txt', 'text/plain'],
	['md', 'text/markdown'],
	['json', 'application/json'],
	['csv', 'text/csv'],
	['png', 'image/png'],
	['jpg', 'image/jpeg'],
	['jpeg', 'image/jpeg'],
	['webp', 'image/webp'],
	['gif', 'image/gif'],
	['svg', 'image/svg+xml'],
	['pdf', 'application/pdf'],
	['doc', 'application/msword'],
	['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
	['xls', 'application/vnd.ms-excel'],
	['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
	['ppt', 'application/vnd.ms-powerpoint'],
	['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
	['mp3', 'audio/mpeg'],
	['mp4', 'video/mp4'],
	['mov', 'video/quicktime'],
	['avi', 'video/x-msvideo'],
	['mkv', 'video/x-matroska'],
	['zip', 'application/zip'],
	['rar', 'application/vnd.rar'],
	['tar', 'application/x-tar'],
	['gz', 'application/gzip'],
]);

export const getContentType = (extension: FileExtension) => {
	return fileExtensions.get(extension) || 'text/plain';
};

export const getExtension = (contentType: FileContentType) => {
	return Array.from(fileExtensions.entries()).find(([, value]) => value === contentType)?.[0] || 'txt';
};

export const readFile = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(reader.error);
		};
		reader.readAsDataURL(file);
	});
};
