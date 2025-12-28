import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ConfirmarExclusaoModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemLabel?: string;
}

export function ConfirmarExclusaoModal({ open, onClose, onConfirm, itemLabel }: ConfirmarExclusaoModalProps) {
    const [processing, setProcessing] = useState(false);

    const handleConfirm = async () => {
        setProcessing(true);
        await onConfirm();
        setProcessing(false);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>
                    Tem certeza que deseja excluir {itemLabel ? `"${itemLabel}"` : 'este item'}?
                </DialogTitle>
                <DialogDescription>
                    Esta ação não pode ser desfeita. O registro será removido permanentemente.
                </DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={handleConfirm}
                    >
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
