import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface AdicionarRegistroModalProps {
  open: boolean;
  onClose: () => void;
  headers: string[];
  onSave?: (data: Record<string, any>) => void;
}

export function AdicionarRegistroModal({ open, onClose, headers, onSave }: AdicionarRegistroModalProps) {
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    if (headers) {
      const initial: Record<string, any> = {};
      headers.forEach((h) => {
        initial[h] = '';
      });
      setForm(initial);
    }
  }, [headers, open]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Registro</DialogTitle>
          <DialogDescription>Preencha os campos para adicionar um novo registro.</DialogDescription>
        </DialogHeader>
        {headers && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {headers.map((header) => (
              <div key={header} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">{header}</label>
                <Input
                  value={form[header] ?? ''}
                  onChange={e => handleChange(header, e.target.value)}
                  className=""
                  type="text"
                  name={header}
                  placeholder={`Digite ${header.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="default">Adicionar</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
