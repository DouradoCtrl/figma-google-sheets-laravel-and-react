import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface EditarRegistroModalProps {
  open: boolean;
  onClose: () => void;
  row: any[] | null;
  headers: string[];
  onSave?: (data: Record<string, any>) => void;
}

export function EditarRegistroModal({ open, onClose, row, headers, onSave }: EditarRegistroModalProps) {
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    if (row && headers) {
      const initial: Record<string, any> = {};
      headers.forEach((h, i) => {
        initial[h] = row[i] ?? '';
      });
      setForm(initial);
    }
  }, [row, headers]);

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
          <DialogTitle>Editar Registro</DialogTitle>
          <DialogDescription>Altere os campos desejados e salve as mudanças.</DialogDescription>
        </DialogHeader>
        {row && headers && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {headers.map((header, idx) => (
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
              <Button type="submit" variant="default">Salvar</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
