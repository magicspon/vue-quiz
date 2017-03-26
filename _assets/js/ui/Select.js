
export const Select = {
	data() {
		return {
			userInput: []
		}
	},

	props: {
		answers: {
			type: Array,
			require: true
		},
		id: {
			type: String,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		correctIds: {
			type: Array,
			required: true
		}
	},

	watch: {
		userInput(value) {
			if(this.correctIds[0] === value) {
				this.$store.commit('SET_ANSWER', true)
				this.$store.commit('UPDATE_SCORE')
			} else {
				this.$store.commit('SET_ANSWER', false)
			}
		}
	},

	template: `
		<div>
			<select v-model="userInput">
				<option v-for="answer in answers" :value="answer.id" :id="answer.id">
					{{ answer.text }}
				</option>
			</select>
		</div>
	`
}