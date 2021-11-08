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
 * File: photo_model.js
 * 
 * Description: Deals with uploading photos and thumbnails
 *              to the client.
 *****************************************************************************/

 var express = require('express');
 var router = express.Router();
 var sharp = require('sharp');
 var PhotoModel = {};

/**
 * To upload the photo and create a thumbnail, given the profile
 * picture and username, the function uploads a photo to the
 * client and returns the new name of the two files.
 * @param username 
 * @param profile_picture the acutal image
 * @returns image name
 */
 PhotoModel.UploadPhoto =(username, profile_picture) => {

    try {
		var allowed_image = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if (!allowed_image.exec(profile_picture.name)) {
			return "Error";
		}
	} catch (err) {
		console.log('Error Not a photo');
		return "Error";
	}

	try {
		image_name = username + '_' + Date.now() + '_' + profile_picture.name;
		profile_picture.mv('../client/public/images/uploads/' + image_name, (err) => {
			if (err) {
				console.log('Error can not copy file.')
				return "Error";
			} else {
				console.log('Img was uploaded');
			}
		});
		sharp(profile_picture.data)
			.resize(200)
			.toFile('../client/public/images/thumbnails/' + image_name)
			.then(function(new_file_info) {
				console.log('Image Resized');
			})
			.catch(function(err) {
				console.log("Cannot resize image.")
				return "Error";
			});
	} catch (err) {
		console.log('Error cannot handle image');
		return "Error";
	}

    return image_name;
};

module.exports = PhotoModel;