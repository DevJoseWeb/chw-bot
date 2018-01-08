'use strict';
var defaultTransform = input => {
	return input;
}

const steps = {
	name: {
		question: 'What is the patient\'s name?',
		type: 'string',
		label: 'patient_name',
		transform: defaultTransform,
		next: 'phone_number'
	},
	phone_number: {
		question: 'What is the phone number?',
		type: 'number',
		label: 'phone',
		next: null
	}
}

module.exports = {
	steps: steps,
	start: 'name'
}