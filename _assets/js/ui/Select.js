
export const Select = {
	/*
		userInput will be our model
	*/
	data() {
		return {
			userInput: []
		}
	},

	/*
		the props we require
	*/
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
			/*
				commit some actions to the $store
				the mutation functions will handle the change
			*/
			if(this.correctIds[0] === value) {
				this.$store.commit('SET_ANSWER', true)
				this.$store.commit('UPDATE_SCORE')
			} else {
				this.$store.commit('SET_ANSWER', false)
			}
		},

		'$route' () {
			/*
				route changed, reset the userInput
			*/
			this.userInput = false
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