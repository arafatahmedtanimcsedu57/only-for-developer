export const FORM_STRUCT: Record<
	string,
	Record<string, Record<string, string>>
> = {
	LOGIN: {
		EMAIL: { TYPE: 'email', PLACEHOLDER: 'Enter Your Email', NAME: 'login' },
		PASSWORD: {
			TYPE: 'password',
			PLACEHOLDER: 'Enter Your Password',
			NAME: 'password',
		},
	} as const,
} as const;
