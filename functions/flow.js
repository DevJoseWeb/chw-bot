'use strict';

const steps = {
	name: {
		question: 'What is the patient\'s name?',
		type: 'string',
		transform: input => {
			return input + 'transformed';
		},
		next: 'phone_number'
	},
	phone_number: {
		question: 'What is the phone number?',
		type: 'number',
		next: null
	}
}

module.exports = {
	steps: steps,
	start: 'name'
}