// Mock locale file for development
// You can safely modify or extend this when implementing actual translations

// Export directly with no extra wrapper
export default {
	// Common UI elements
	app: {
		title: 'My Application',
		loading: 'Loading...',
		error: 'An error occurred'
	},
	// Form messages
	form: {
		required: 'This field is required',
		email: 'Please enter a valid email address',
		password: 'Password must be at least 8 characters',
		submit: 'Submit',
		cancel: 'Cancel'
	},
	// Auth related
	auth: {
		signIn: 'Sign In',
		signUp: 'Sign Up',
		forgotPassword: 'Forgot Password?',
		logout: 'Log Out'
	},
	// Status messages
	status: {
		failed: 'Action failed',
		success: 'Action was successful',
		pending: 'Processing...'
	},
	// Navigation
	nav: {
		home: 'Home',
		profile: 'Profile',
		settings: 'Settings',
		help: 'Help & Support'
	}
};
