/*
	The template... 
*/

const template =
	`
	<ol>
		<li>
			<h2>{{ title }}</h2>
			<div v-html="text"></div>
			<div v-for="(answer, index) in answers">
				<div v-if="type === 'checkbox'">
					<label :for="id + index">
						<input :value="answer.id" v-model="user" :name="id + index" :id="id + index" type="checkbox"/>
						{{ answer.text }}
					</label>
				</div>

				<div v-if="type === 'radio'">
					<label :for="id  + index">
						<input :value="answer.id" v-model="user" :name="id" :id="id  + index" type="radio"/>
						{{ answer.text }}
					</label>
				</div>
			</div>

			<button @click.prevent="clickHandle">Answer</button>

			<div v-if="feedback">
				{{ feedback }}
			</div>
		</li>
	</ol>
`

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
			user: [],
			output: [],
			feedback: false,
			correct: false
		}
	},

	/*
		create a computed property
		total, which is the total number of correct answers
	*/
	computed: {
		total() {
			return this.answers.filter((answer) => answer.correct).length
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
		user(input) {
			// run away if there ain't any shiz
			if(input.length < 1) return
			let response

			// if its a string... we want to find the answer with a matching string and a correct property
			if(typeof input === 'string') {
				// using destructuring here to get the id/correct values from the array item
				// find returns a value (not an array)
				response = this.answers.find(({id, correct}) => id === input && correct)
			} else {
				// if it's not a string, i've presumed it's gonna be an array
				// reducing over the array, returning true once a match is found 
				// reduce is super funking awesome
				response = input.reduce((acc, curr) => this.answers.find(({id, correct}) => id === curr && correct) || acc, '')
			}

			// once we have a trufy response, punch it into the output array
			if(response) {
				this.output.push(response)
			}

			// once the output array is the same length as the total number of correct answers
			if(this.output.length === this.total) {
				this.correct = true
			}
		}
	},

	methods: {
		clickHandle() {
			// is it correct... update the feedback value
			const { correct, incorrect } = this.responses
			this.feedback = this.correct ? correct : incorrect
		}
	},

	template

}