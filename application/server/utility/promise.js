/******************************************************************************
 * Class: CSC 0648-03 Software Engineering Fall 2021
 * Team: 1
 * Name:  Justin Lam
 *        Aviral Puri
 *        Dinesh Thapa
 *        Kurt D Resayo
 *        Wesley J Xu
 *        Chung Hei Fong
 * 
 * File: promise.js
 * 
 * Description: Provides a promise for the user sessions.
 *****************************************************************************/

/**
   * Creates a promise that is passed in the session object such that
   * it returns a promise to fix issue a bug where the the page loads
   * when logged in but the buttons have not switched. 
   * @param session
   * @returns resolve or reject.
   */
const SaveSession = (session) => {
	return new Promise((resolve, reject) => {
		session.save((err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};

module.exports = { SaveSession };
