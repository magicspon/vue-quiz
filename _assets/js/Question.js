const template =
	`
	<ol>
		<li>
			<p>Question</p>
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
		}
	},

	data() {
		return {
			user: [],
			output: [],
			feedback: false,
			correct: false
		}
	},

	computed: {
		total() {
			return this.answers.filter((answer) => answer.correct).length
		}
	},

	watch: {
		user(input) {
			if(input.length < 1) return
			let response

			if(typeof input === 'string') {
				response = this.answers.find(({id, correct}) => id === input && correct)
			} else {
				response = input.reduce((acc, curr) => this.answers.find(({id, correct}) => id === curr && correct) || acc, '')
			}

			if(response) {
				this.output.push(response)
			}

			if(this.output.length === this.total) {
				this.correct = true
			}
		}
	},

	methods: {
		clickHandle() {
			const { correct, incorrect } = this.responses
			this.feedback = this.correct ? correct : incorrect
		}
	},

	template

}