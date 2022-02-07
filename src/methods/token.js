/**
 *
 * @param {string} urlToUpdate
 * @param {string} oldToken
 * @returns
 */
export const updateToken = async (
	urlToUpdate = "",
	oldToken = "",
	method = "GET"
) => {
	method = method.toLocaleUpperCase();

	if (
		!urlToUpdate ||
		!oldToken ||
		(method !== "GET" && method !== "POST")
	)
		return console.error("Missing parameter!");

	const updateTokenOptions = {
		method: method,
		headers: {
			authorization: "Bearer " + oldToken,
		},
	};

	if (urlToUpdate.at(-1) === "/") {
		urlToUpdate = urlToUpdate.split("").slice(-1, 1).join("");
	}

	if (method === "GET") {
		urlToUpdate += "?refreshToken=";
		urlToUpdate += oldToken;
	}

	return await fetch(
		urlToUpdate,
		method === "GET" ? {} : updateTokenOptions
	).then((res) => res.json());
};
