// components/ui/modal.tsx

import { Dialog, DialogContent, DialogTitle } from './dialog';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	providers: {
		id: number;
		name: string;
		email: string;
		phone: string;
	}[];
}

export const Modal = ({ isOpen, onClose, providers }: ModalProps) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent className="p-6 max-w-lg">
				<DialogTitle className="text-xl font-bold">
					Providers Information
				</DialogTitle>
				{providers.length === 0 ? (
					<p>No providers available</p>
				) : (
					<ul>
						{providers.map((provider) => (
							<li key={provider.id} className="my-2">
								<p>Name: {provider.name}</p>
								<p>Email: {provider.email || 'Not Available'}</p>
								<p>Phone: {provider.phone || 'Not Available'}</p>
							</li>
						))}
					</ul>
				)}
				<button
					onClick={onClose}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
				>
					Close
				</button>
			</DialogContent>
		</Dialog>
	);
};
