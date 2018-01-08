'use strict';
var defaultTransform = input => {
	return input;
}

const steps = {
	phone_number: {
		question: 'What is the phone number?',
		label: 'phone',
		transform: defaultTransform,
		next: 'name'
	},
	name: {
		question: 'What is the patient\'s name?',
		label: 'patient_name',
		transform: defaultTransform,
		next: 'gender'
	},
	gender: {
		question: 'What is the patient\'s gender? Press 1 for female, 2 for male.',
		label: 'gender',
		transform: defaultTransform,
		next: 'drug'
	},
	drug: {
		question: 'What drug did you give the patient?',
		label: 'drug_name',
		transform: defaultTransform,
		next: 'quantity'
	},
	quantity: {
		question: 'How much of the drug did you give?',
		label: 'drug_quantity',
		transform: defaultTransform,
		next: null
	}
}

module.exports = {
	steps: steps,
	start: 'phone_number'
}