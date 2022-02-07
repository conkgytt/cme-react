/**
 *
 * @param {object} payloadObj
 * @returns {{googleId: string, name: string, position: string,
 * school: string, classes: array, email: string, googleName: string,
 * avatar: string, group: string, isSignedIn: boolean, isSignedUp: boolean}}
 */
export const tokenPayload = (payloadObj) => ({
	googleId: payloadObj.googleId || payloadObj.id,
	name:
		payloadObj.name ||
		`${payloadObj.name.givenName || ""} ${
			payloadObj.name.familyName || ""
		}`,
	position: payloadObj.position,
	school: payloadObj.school || "",
	classes: payloadObj.classes || [],
	email: payloadObj.email,
	googleName: payloadObj.googleName || payloadObj.displayName,
	avatar: payloadObj.avatar || payloadObj.picture,
	group: payloadObj.group || null,
	isSignedIn: payloadObj.isSignedIn || false,
	isSignedUp: payloadObj.isSignedUp || false,
});
