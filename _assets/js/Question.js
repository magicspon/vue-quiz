/*
	The template... 
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
						log('correct')
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