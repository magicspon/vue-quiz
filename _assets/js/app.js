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

		added an index prop... just for shits and giggles really
	*/
	data() {
		return {
			index: 0,
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

	computed: {
		current() {
			return this.questions[this.index]
		}
	},

	/*
		not quite sure if i need to use watch here, 
		i thought computed would updated from the current value on change
		method.. it didn't so, i watched the index value, 
		which is updated from the nextQuestion method
	*/
	watch: {
		index() {
			/*
				update the change prop to the next question
				hello... re render... boooooya
			*/
			this.current = this.questions[this.index]
		}
	},
	
	/*
		this method is passed down as a prop
		and called from within the question component
		props down, events up... nice
	*/
	methods: {
		nextQuestion() {
			this.index += 1
		}
	},


	/*
		the template, passing some properties to the question component
		each question is a component, which is key
	*/
	template: `
		<div>
			<question-template 
				:id="current.id" 
				:answers='current.answers' 
				:type='current.type' 
				:responses='current.responses' 
				:title='current.title' 
				:text='current.text' 
				:nextQuestion='nextQuestion'
			/>
		</div>
	`

}).$mount('#app')