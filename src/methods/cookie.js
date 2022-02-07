/**
 * Get data in cookie storage with KEY!
 * @param {string} key
 * @returns {string}  Data on cookie storage of that key
 */
export const getCookie = (key) => {
	const allCookie = document.cookie;

	const cookieValue = allCookie
		.slice(allCookie.indexOf(key + "="))
		.split("=")[1]
		?.split(";")[0];

	return cookieValue;
};

/**
 * Set new cookie data with key
 * @param {string} key
 * @param {string} newCookieData
 * @param {number} expires Rules is miliseconds (ms)
 */
export const setCookie = (
	key,
	newCookieData,
	expires = 365 * 24 * 60 * 60 * 1000
) => {
	const expiresTime = new Date();
	const time = expiresTime.getTime() + expires;
	expiresTime.setTime(time);

	document.cookie = `${key}=${newCookieData}; expires=${expiresTime.toUTCString()}; path=/`;
};

/**
 * Delete data on cookie storage with key
 * @param {string} KEY Key of data to delete
 */
export const deleteCookies = (KEY) => {
	document.cookie = `${KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
