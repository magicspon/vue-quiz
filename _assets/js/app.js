/*
	import the things... 
*/

import debug from 'debug'
import Vue from 'vue'
window.log = debug('app:log')

/*
	The question component... this is where the magic happens
*/
import Question from './Question'

if(process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}

/*
	Main app component 
*/

new Vue({

	/*
		le data... can't remember if it needs to be a function 
		in this instance, but it's how I role
	*/
	data() {
		return {
			questions: [
				{
					id: 'q1',
					title: 'Ensuring you are a suitable assessor',
					text: '<p><b>We need to avoid any conflicts of interest.</b> So if you have any relationship with the company or venue that you would be visiting (for example, if you or a friend work there), we would ask you not to select that visit.<b>Also, you should be a typical customer</b> - so if it\'s the kind of place you wouldn\'t normally visit, this may invalidate your report</p><p>If you\'ve been there before and had a bad time but feel like giving them another chance, that\'s fine.</p>',
					question: 'Which of these scenarios mean there is a potential conflict of interest?',
					type: 'checkbox',
					answers: [
						{
							id: 'a1',
							text: 'I have been there before and normally enjoy it but didn\'t last time'
						},
						{
							id: 'a2',
							text: 'I work there (or have in the past) or I know someone who does',
							correct: true
						},
						{
							id: 'a3',
							text: 'I don\'t really like the style of service for that brand so wouldn\'t choose to go there ordinarily',
							correct: true
						},
						{
							id: 'a4',
							text: 'I don\'t know the location of the visit'
						}
					],
					responses: {
						correct: 'That is correct, well done',
						incorrect: 'Incorrect, try again'
					},
				},
				{
					id: 'q2',
					title: 'Booking and cancelling a visit',
					text: '<p>When you book a visit it will be for a specific date (and probably time). We need to be sure that <b>you will make every effort to complete the visit</b> and report as scheduled. Otherwise it can really mess up the performance reporting schedule for our clients.</p><p>If you come across any difficulties or need to cancel the visit, please let us know as soon as possible so that we can try to make alternative arrangements.</p>',
					question: 'You\'ve booked a visit but something urgent has come up which means you can\'t attend. What should you do?',
					type: 'radio',
					answers: [
						{
							id: 'a1',
							text: 'Just go the following day'
						},
						{
							id: 'a2',
							text: 'Cancel the visit online or contact FOO as soon as possible',
							correct: true
						},
						{
							id: 'a3',
							text: 'Ask a friend to go for you and make notes'
						},
						{
							id: 'a4',
							text: 'Go back online and sign up for antoher visit without cancelling this one'
						}
					],
					responses: {
						correct: 'That is correct, well done',
						incorrect: 'Incorrect, try again'
					},
				},
			]
		}
	},

	/*
		register the component
	*/
	components: {
		'question-template': Question
	},


	/*
		the template, passing some properties to the question component
		each question is a component, which is key
	*/
	template: `
		<div>
			<div v-for='question in questions'>
				<question-template 
					:id="question.id" 
					:answers='question.answers' 
					:type='question.type' 
					:responses='question.responses' 
					:title='question.title' 
					:text='question.text' 
				/>
			</div>
		</div>
	`

}).$mount('#app')