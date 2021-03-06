
export const Checkbox = {
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
			if(value.filter((id) => this.correctIds.includes(id)).length === this.total && value.length <= this.total) {
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
			this.userInput = []
		}
	},

	template: `
		<div>
			<div v-for="answer in answers">
				<label :for="answer.id">
					<input type="checkbox" :name="answer.id" :id="answer.id" :value="answer.id" v-model="userInput">
					{{ answer.text }}
				</label>
			</div>
		</div>
	`
}