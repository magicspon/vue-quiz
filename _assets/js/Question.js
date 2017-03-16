/*
	The template... 
	
	when the answer is bob on.. show a cunting next question
	button, and trigger the function passed a prop... 
	
		<div v-if="correct">
			<button @click.prevent="nextQuestion">Next</button>
		</div>
*/

const template =
	`
	<ol>
		<li>
			<h2>{{ title }}</h2>
			<div v-html="text"></div>
			<form v-on:submit.prevent="onSubmit" ref="form">
				<div v-for="(answer, index) in answers">
					<div v-if="type === 'checkbox'">
						<label :for="id + index">
							<input :value="answer.id" v-model="userInput" :name="id + index" :id="id + index" type="checkbox"/>
							{{ answer.text }}
						</label>
					</div>

					<div v-if="type === 'radio'">
						<label :for="id  + index">
							<input :value="answer.id" v-model="userInput" :name="id" :id="id  + index" type="radio"/>
							{{ answer.text }}
						</label>
					</div>
				</div>

				<button @click.prevent="clickHandle">Answer</button>
			</form>

			<div v-if="asked">
				{{ feedback }}
				<div v-if="correct">
					<button @click.prevent="nextQuestion">Next</button>
				</div>
			</div>
		</li>
	</ol>
`
/*
	this is going to be consumed as a vue component,
	so we only need to export an object... which is nice
*/

export default {

	/*
		the required props
	*/

	props: {
		id: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		answers: {
			type: Array,
			required: true
		},
		responses: {
			type: Object,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},

		/*
			next question method prop jobber
		*/
		nextQuestion: {
			type: Function,
			required: false
		}
	},

	/*
		some local data
	*/
	data() {
		return {
			userInput: [],
			asked: false,
			correct: false,
			prev: null
		}
	},
	
	/*
		create a computed property
		total, which is the total number of correct answers
	*/
	computed: {
		total() {
			return this.answers.filter((answer) => answer.correct).length
		},

		correctedIds() {
			return this.answers.filter((answer) => answer.correct).map((answer) => answer.id)
		},

		feedback() {
			const { correct, incorrect } = this.responses
			return this.correct ? correct : incorrect
		}
	},

	/*
		watch the user property.
		each input is bound to this object, so when the input changes 
		(or the value changes) this function will be trigger
	*/
	watch: {

		/*
			I said oi ID... have you changed... if you've changed 
			you must be a new fucking question... well booya.. boosh
			reset all the shit... waaaa... waaa. do it... i've got a gun
		*/
		id() {
			this.userInput = [],
			this.asked = false,
			this.correct = false,
			this.prev = null
		},
		/*
			input is the :value from the input
		*/
		userInput(input) {

			if(!this.correct) {
				if(this.type === 'checkbox') {
					if(input.filter((id) => this.correctedIds.includes(id)).length === this.total && input.length <= this.total) {
						this.correct = true
					}
				} 

				if(this.type === 'radio') {
					if(this.correctedIds.includes(input)) {
						this.correct = true
					}
				} 

			} else {
				this.correct = false
			}

			if(this.feedback) {
				this.feedback 
			}
			
			if(input.length === 0) {
				this.asked = false
			}
		}
	},


	methods: {
		clickHandle() {
			this.asked = true
		},

		onSubmit() {
			this.asked = true
		},
		
	},

	template

}