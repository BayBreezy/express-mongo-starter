const WelcomeApp = {
	data() {
		return {
			name: "Breezy",
			message: null,
		};
	},
	mounted() {
		const params = new URLSearchParams(location.search);
		if (params.has("q")) {
			this.message = params.get("q");
		}
	},
};
const ResetPasswordApp = {
	data() {
		return {
			password: null,
			loading: false,
			snack: false,
		};
	},
	methods: {
		async Reset() {
			try {
				this.loading = true;
				let res = await axios.post("/api/v1/auth/reset-password", {
					password: this.password,
				});
				console.log(res);
				this.loading = false;
				this.snack = true;
			} catch (error) {
				this.loading = false;
				console.log(error);
			}
		},
	},
};

const theme = {
	dark: true,
	themes: {
		dark: {
			primary: "#17b978",
			secondary: "#424242",
			accent: "#82B1FF",
			error: "#FF5252",
			info: "#2196F3",
			success: "#4CAF50",
			warning: "#FFC107",
		},
	},
};

const app = new Vue({
	el: "#wlcApp",
	...WelcomeApp,
	vuetify: new Vuetify({ theme }),
});

const resetpwdApp = new Vue({
	el: "#rstpwdApp",
	...ResetPasswordApp,
	vuetify: new Vuetify({ theme }),
});
