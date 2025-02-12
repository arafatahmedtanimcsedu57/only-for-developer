'use client';

import { useState, useEffect } from 'react';
import { CheckIcon, LockIcon, MailIcon, RotateCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { loginUser } from '@/services/auth';

import { ROUTES, LOCAL_STORAGE_KEY, FORM_STRUCT } from '@/constant';

const { DASHBOARD } = ROUTES;
const { TOKEN } = LOCAL_STORAGE_KEY;
const { LOGIN } = FORM_STRUCT;

export default function LoginPage() {
	const router = useRouter();
	const [credentials, setCredentials] = useState<{
		login: string;
		password: string;
	}>({ login: '', password: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [typing, setTyping] = useState<{ login: boolean; password: boolean }>({
		login: false,
		password: false,
	});

	useEffect(() => {
		if (localStorage.getItem(TOKEN)) router.push(`/${DASHBOARD}`);
	}, [router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const { success, token, message } = await loginUser({ ...credentials });
		if (success) {
			localStorage.setItem(TOKEN, token);
			router.push(`/${DASHBOARD}`);
		} else setError(message);

		setLoading(false);
	};

	const renderIcon = (field: 'login' | 'password') => {
		return typing[field] ? (
			<div className="absolute right-2.5 top-3.5 h-4 w-4 text-muted-foreground">
				<span className="relative flex size-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-700 opacity-75"></span>
					<span className="relative inline-flex size-2 rounded-full bg-slate-500"></span>
				</span>
			</div>
		) : (
			credentials[field] && (
				<CheckIcon
					className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
					size={16}
				/>
			)
		);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-slate-200">
			<div className="p-6 bg-white rounded-lg shadow-lg flex flex-col gap-8 sm:min-w-[500px]">
				<Image src="/logo.png" alt="logo" width={'60'} height={'80'} />
				<div>
					<h2 className="text-lg text-slate-600 font-bold">Sign In</h2>
					<p className="text-xs text-slate-500">
						Hey developer, enter your email
					</p>
				</div>
				<form onSubmit={handleLogin} className="flex flex-col gap-4">
					{Object.keys(LOGIN).map((field: string) => (
						<div key={field} className="relative">
							<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
								{LOGIN[field].NAME === 'login' ? (
									<MailIcon className="h-4 w-4" />
								) : (
									<LockIcon className="h-4 w-4" />
								)}
							</div>
							<Input
								type={LOGIN[field].TYPE}
								placeholder={LOGIN[field].PLACEHOLDER}
								name={LOGIN[field].NAME}
								onChange={handleChange}
								required
								onFocus={() =>
									setTyping((prev) => ({ ...prev, [field]: true }))
								}
								onBlur={() =>
									setTyping((prev) => ({ ...prev, [field]: false }))
								}
								className="w-full rounded-lg bg-background pl-8"
							/>
							{renderIcon(field as 'login' | 'password')}
						</div>
					))}
					<div className="flex justify-between items-center">
						<div>
							{error ? (
								<p className="text-xs text-red-500 mb-2">{error}</p>
							) : (
								<></>
							)}
						</div>

						<Button type="submit" disabled={loading}>
							{loading ? (
								<>
									<RotateCcwIcon className="animate-spin" /> Login ...
								</>
							) : (
								'Login'
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
